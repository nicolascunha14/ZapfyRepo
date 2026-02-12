-- =============================================
-- Age Group Progression Migration
-- Run this in the Supabase SQL Editor
-- =============================================

-- 1. Add completed_age_groups column to track finished levels
ALTER TABLE public.children
  ADD COLUMN IF NOT EXISTS completed_age_groups TEXT[] DEFAULT '{}';

-- 2. Function to promote a child to the next age group
-- Called after passing the final exam
CREATE OR REPLACE FUNCTION public.promote_child_age_group(p_child_id UUID)
RETURNS TEXT AS $$
DECLARE
  v_current TEXT;
  v_next TEXT;
BEGIN
  SELECT age_group INTO v_current FROM public.children WHERE id = p_child_id;

  IF v_current = '7-9' THEN v_next := '10-12';
  ELSIF v_current = '10-12' THEN v_next := '13-15';
  ELSE RETURN NULL; -- already at max level
  END IF;

  -- Add current age group to completed list
  UPDATE public.children
  SET completed_age_groups = array_append(completed_age_groups, v_current),
      age_group = v_next
  WHERE id = p_child_id;

  -- Initialize progress for the new age group
  PERFORM public.initialize_child_progress(p_child_id, v_next);

  RETURN v_next;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
