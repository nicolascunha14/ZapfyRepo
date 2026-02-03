-- =============================================
-- Add role column to public.users for admin access
-- Run this in the Supabase SQL Editor
-- =============================================

-- Add role column (default 'user')
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user'
CHECK (role IN ('user', 'admin'));

-- To make yourself admin, run:
-- UPDATE public.users SET role = 'admin' WHERE email = 'your-email@example.com';
