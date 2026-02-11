-- =============================================
-- Chapter-based Mission System Migration
-- Run this in the Supabase SQL Editor
-- =============================================

-- 1. Drop old missions table (backup first if needed)
-- The old missions table has different schema (age_group, theme, display_order, etc.)
-- We drop it and create a new one with chapter-based schema
DROP TABLE IF EXISTS public.completed_missions CASCADE;
DROP TABLE IF EXISTS public.missions CASCADE;

-- 2. Create chapters table
CREATE TABLE public.chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  age_group TEXT NOT NULL CHECK (age_group IN ('7-9', '10-12', '13-15')),
  chapter_number INTEGER NOT NULL CHECK (chapter_number BETWEEN 1 AND 9),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(age_group, chapter_number)
);

-- 3. Create new missions table
CREATE TABLE public.missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  mission_number INTEGER NOT NULL CHECK (mission_number BETWEEN 1 AND 10),
  title TEXT NOT NULL,
  mission_type TEXT NOT NULL CHECK (mission_type IN ('quiz', 'drag_drop', 'numeric_input', 'text_input', 'true_false', 'matching')),
  content JSONB NOT NULL,
  correct_answer JSONB NOT NULL,
  explanation TEXT,
  points_reward INTEGER DEFAULT 10,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(chapter_id, mission_number)
);

-- 4. Create final_exams table
CREATE TABLE public.final_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  age_group TEXT NOT NULL CHECK (age_group IN ('7-9', '10-12', '13-15')),
  question_number INTEGER NOT NULL CHECK (question_number BETWEEN 1 AND 10),
  title TEXT NOT NULL,
  mission_type TEXT NOT NULL CHECK (mission_type IN ('quiz', 'drag_drop', 'numeric_input', 'text_input', 'true_false', 'matching')),
  content JSONB NOT NULL,
  correct_answer JSONB NOT NULL,
  explanation TEXT,
  points_reward INTEGER DEFAULT 50,
  chapters_covered INTEGER[],
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(age_group, question_number)
);

-- 5. Create user_progress table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed')),
  missions_completed INTEGER DEFAULT 0 CHECK (missions_completed BETWEEN 0 AND 10),
  total_score INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(child_id, chapter_id)
);

-- 6. Create mission_attempts table
CREATE TABLE public.mission_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
  user_answer JSONB NOT NULL,
  is_correct BOOLEAN NOT NULL,
  points_earned INTEGER NOT NULL DEFAULT 0,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  time_spent_seconds INTEGER,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Create exam_attempts table
CREATE TABLE public.exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  age_group TEXT NOT NULL CHECK (age_group IN ('7-9', '10-12', '13-15')),
  questions_correct INTEGER DEFAULT 0 CHECK (questions_correct BETWEEN 0 AND 10),
  total_points INTEGER DEFAULT 0,
  passed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_chapters_age_group ON public.chapters(age_group, order_position);
CREATE INDEX idx_missions_chapter ON public.missions(chapter_id, order_position);
CREATE INDEX idx_user_progress_child ON public.user_progress(child_id, chapter_id);
CREATE INDEX idx_mission_attempts_child ON public.mission_attempts(child_id, mission_id);
CREATE INDEX idx_exam_attempts_child ON public.exam_attempts(child_id, age_group);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Chapters: readable by all authenticated users
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view chapters"
  ON public.chapters FOR SELECT TO authenticated USING (true);

-- Missions: readable by all authenticated users
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view missions"
  ON public.missions FOR SELECT TO authenticated USING (true);

-- Final exams: readable by all authenticated users
ALTER TABLE public.final_exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view final exams"
  ON public.final_exams FOR SELECT TO authenticated USING (true);

-- User progress: users can view/manage their children's progress
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own children progress"
  ON public.user_progress FOR SELECT TO authenticated
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Users can insert own children progress"
  ON public.user_progress FOR INSERT TO authenticated
  WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Users can update own children progress"
  ON public.user_progress FOR UPDATE TO authenticated
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- Mission attempts: users can view/create for their children
ALTER TABLE public.mission_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own children attempts"
  ON public.mission_attempts FOR SELECT TO authenticated
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Users can insert own children attempts"
  ON public.mission_attempts FOR INSERT TO authenticated
  WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- Exam attempts: users can view/create for their children
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own children exam attempts"
  ON public.exam_attempts FOR SELECT TO authenticated
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Users can insert own children exam attempts"
  ON public.exam_attempts FOR INSERT TO authenticated
  WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- =============================================
-- TRIGGER: Auto-unlock next chapter
-- =============================================

CREATE OR REPLACE FUNCTION public.unlock_next_chapter()
RETURNS TRIGGER AS $$
BEGIN
  -- When all 10 missions in a chapter are completed
  IF NEW.missions_completed = 10 AND OLD.missions_completed < 10 THEN
    -- Mark current chapter as completed
    NEW.status := 'completed';
    NEW.completed_at := now();

    -- Unlock next chapter for this child
    UPDATE public.user_progress up
    SET status = 'unlocked'
    FROM public.chapters c_current, public.chapters c_next
    WHERE c_current.id = NEW.chapter_id
      AND c_next.age_group = c_current.age_group
      AND c_next.chapter_number = c_current.chapter_number + 1
      AND up.chapter_id = c_next.id
      AND up.child_id = NEW.child_id
      AND up.status = 'locked';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_unlock_next_chapter
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.unlock_next_chapter();

-- =============================================
-- FUNCTION: Initialize progress for a child
-- Call this when a child is created or when migrating
-- =============================================

CREATE OR REPLACE FUNCTION public.initialize_child_progress(p_child_id UUID, p_age_group TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO public.user_progress (child_id, chapter_id, status)
  SELECT
    p_child_id,
    c.id,
    CASE WHEN c.chapter_number = 1 THEN 'unlocked' ELSE 'locked' END
  FROM public.chapters c
  WHERE c.age_group = p_age_group
  ON CONFLICT (child_id, chapter_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- TRIGGER: Auto-initialize progress on child creation
-- =============================================

CREATE OR REPLACE FUNCTION public.on_child_created_init_progress()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.initialize_child_progress(NEW.id, NEW.age_group);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_child_created_init_progress
  AFTER INSERT ON public.children
  FOR EACH ROW
  EXECUTE FUNCTION public.on_child_created_init_progress();
