-- =============================================
-- Guest Account Restrictions Migration
-- Run this in the Supabase SQL Editor
-- =============================================

-- 1. Add is_guest flag to children
ALTER TABLE public.children
  ADD COLUMN IF NOT EXISTS is_guest BOOLEAN DEFAULT false;

-- 2. Mark existing guest children (those with parent that is anonymous)
-- You can run this manually if needed:
-- UPDATE public.children SET is_guest = true WHERE name = 'Explorador' AND ...

-- 3. Function to clean up guest data (called on logout/exit)
CREATE OR REPLACE FUNCTION public.cleanup_guest_data(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_child_id UUID;
BEGIN
  -- Find guest child
  SELECT id INTO v_child_id FROM public.children
  WHERE parent_id = p_user_id AND is_guest = true;

  IF v_child_id IS NULL THEN RETURN; END IF;

  -- Delete all related data
  DELETE FROM public.mission_attempts WHERE child_id = v_child_id;
  DELETE FROM public.exam_attempts WHERE child_id = v_child_id;
  DELETE FROM public.user_progress WHERE child_id = v_child_id;
  DELETE FROM public.daily_logins WHERE child_id = v_child_id;
  DELETE FROM public.children WHERE id = v_child_id;
  DELETE FROM public.users WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
