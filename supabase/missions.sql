-- =============================================
-- Missions table + seed data for Zapfy
-- Run this in the Supabase SQL Editor
-- =============================================

-- Create missions table
create table if not exists public.missions (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  tips text not null,
  age_group text not null check (age_group in ('7-9', '10-12', '13-15')),
  theme text not null check (theme in ('lanche', 'troco', 'economizar', 'conceitos_basicos', 'ganhar', 'gastar', 'investir')),
  points_reward integer not null check (points_reward > 0),
  display_order integer not null default 0,
  content_key text not null default '',
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.missions enable row level security;

-- All authenticated users can read missions (global content)
create policy "Authenticated users can view missions"
  on public.missions for select
  to authenticated
  using (true);

-- Admin CRUD policies (requires is_admin() function from admin-missions-rls.sql)
create policy "Admins can insert missions"
  on public.missions for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update missions"
  on public.missions for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete missions"
  on public.missions for delete
  to authenticated
  using (public.is_admin());

-- Create index for filtering by age group
create index if not exists idx_missions_age_group on public.missions (age_group, display_order);
