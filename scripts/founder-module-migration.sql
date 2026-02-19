-- =============================================
-- Módulo Fundador — Jornada Prática em Família
-- Migration: run BEFORE founder-module-seed.sql
-- =============================================

-- 1. Expand chapter_number constraint to allow chapter 10
ALTER TABLE public.chapters
  DROP CONSTRAINT IF EXISTS chapters_chapter_number_check;
ALTER TABLE public.chapters
  ADD CONSTRAINT chapters_chapter_number_check CHECK (chapter_number > 0);

-- 2. Add family_mission to mission_type CHECK
ALTER TABLE public.missions
  DROP CONSTRAINT IF EXISTS missions_mission_type_check;
ALTER TABLE public.missions
  ADD CONSTRAINT missions_mission_type_check CHECK (
    mission_type IN ('quiz', 'drag_drop', 'numeric_input', 'text_input', 'true_false', 'matching', 'family_mission')
  );

-- 3. Create family_confirmations table (parental confirmation log)
CREATE TABLE IF NOT EXISTS public.family_confirmations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
  mission_id UUID REFERENCES public.missions(id) ON DELETE CASCADE,
  child_response JSONB,
  parent_confirmed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(child_id, mission_id)
);

-- Enable RLS on family_confirmations
ALTER TABLE public.family_confirmations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can view confirmations for their children"
  ON public.family_confirmations FOR SELECT
  TO authenticated
  USING (
    child_id IN (
      SELECT id FROM public.children WHERE parent_id = auth.uid()
    )
  );

CREATE POLICY "Parents can insert confirmations for their children"
  ON public.family_confirmations FOR INSERT
  TO authenticated
  WITH CHECK (
    child_id IN (
      SELECT id FROM public.children WHERE parent_id = auth.uid()
    )
  );

-- 4. Insert the Módulo Fundador chapter (7-9, chapter_number 10)
INSERT INTO public.chapters (age_group, chapter_number, title, description, icon, order_position)
VALUES (
  '7-9',
  10,
  'Módulo Fundador — Jornada Prática em Família',
  'Missões práticas para realizar em família e consolidar o que você aprendeu',
  '👨‍👩‍👧',
  10
)
ON CONFLICT (age_group, chapter_number) DO NOTHING;

-- 5. Initialize user_progress (locked) for existing 7-9 children
INSERT INTO public.user_progress (child_id, chapter_id, status)
SELECT c.id, ch.id, 'locked'
FROM public.children c
CROSS JOIN public.chapters ch
WHERE c.age_group = '7-9'
  AND ch.age_group = '7-9'
  AND ch.chapter_number = 10
ON CONFLICT (child_id, chapter_id) DO NOTHING;

-- 6. Add founder_seal badge
-- Note: adjust xp_reward / zapcoin_reward columns to match your badges table schema
INSERT INTO public.badges (slug, name, description, icon, xp_reward, zapcoin_reward)
VALUES (
  'founder_seal',
  'Fundador Zapfy',
  'Completou a Jornada Prática em Família',
  '🏅',
  500,
  100
)
ON CONFLICT (slug) DO NOTHING;
