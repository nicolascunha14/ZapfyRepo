-- Referral System Migration
-- Run this in the Supabase SQL Editor

-- 1. Add referral_code column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- 2. Create referrals tracking table
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id),
  referred_id UUID NOT NULL REFERENCES auth.users(id),
  points_awarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(referred_id)
);

-- 3. RLS policies for referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own referrals" ON public.referrals
  FOR SELECT USING (auth.uid() = referrer_id);

CREATE POLICY "Authenticated users can insert referrals" ON public.referrals
  FOR INSERT WITH CHECK (auth.uid() = referred_id);

CREATE POLICY "System can update referrals" ON public.referrals
  FOR UPDATE USING (true);

-- 4. Generate referral_code for existing users who don't have one
UPDATE public.users
SET referral_code = UPPER(SUBSTR(REPLACE(gen_random_uuid()::text, '-', ''), 1, 8))
WHERE referral_code IS NULL;

-- 5. Function to auto-generate referral_code on new user insert
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := UPPER(SUBSTR(REPLACE(gen_random_uuid()::text, '-', ''), 1, 8));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Trigger to auto-generate referral_code
DROP TRIGGER IF EXISTS trigger_generate_referral_code ON public.users;
CREATE TRIGGER trigger_generate_referral_code
  BEFORE INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();
