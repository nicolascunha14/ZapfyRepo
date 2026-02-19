-- Migration: presale_leads table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS presale_leads (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  email       text        NOT NULL UNIQUE,
  source      text        NOT NULL DEFAULT 'pre-venda',
  created_at  timestamptz DEFAULT now()
);

-- No RLS needed — inserts happen via service role key from the API route.
-- Enable RLS just to prevent direct anon access from the client.
ALTER TABLE presale_leads ENABLE ROW LEVEL SECURITY;

-- (No policies = only service role can read/write, anon gets nothing)
