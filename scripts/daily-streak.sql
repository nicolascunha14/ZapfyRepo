-- Daily Streak System Migration
-- Run this in the Supabase SQL Editor

-- 1. Create daily_logins table
CREATE TABLE IF NOT EXISTS public.daily_logins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  login_date DATE NOT NULL DEFAULT CURRENT_DATE,
  streak_count INTEGER NOT NULL DEFAULT 1,
  bonus_points INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(child_id, login_date)
);

-- 2. RLS policies
ALTER TABLE public.daily_logins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own daily logins" ON public.daily_logins
  FOR SELECT USING (
    child_id IN (
      SELECT id FROM public.children WHERE parent_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own daily logins" ON public.daily_logins
  FOR INSERT WITH CHECK (
    child_id IN (
      SELECT id FROM public.children WHERE parent_id = auth.uid()
    )
  );

-- 3. Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_daily_logins_child_date
  ON public.daily_logins (child_id, login_date DESC);
