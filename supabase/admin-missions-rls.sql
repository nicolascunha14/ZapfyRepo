-- =============================================
-- RLS policies for admin mission management
-- Run this in the Supabase SQL Editor
-- =============================================

-- Helper function: check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND role = 'admin'
  );
$$;

-- Allow admins to insert missions
CREATE POLICY "Admins can insert missions"
  ON public.missions FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Allow admins to update missions
CREATE POLICY "Admins can update missions"
  ON public.missions FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Allow admins to delete missions
CREATE POLICY "Admins can delete missions"
  ON public.missions FOR DELETE
  TO authenticated
  USING (public.is_admin());
