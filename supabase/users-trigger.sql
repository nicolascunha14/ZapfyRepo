-- =============================================
-- Auto-create public.users row on signup
-- Run this in the Supabase SQL Editor
-- =============================================

-- Trigger function: copies auth.users data into public.users
-- Uses SECURITY DEFINER to bypass RLS
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'display_name',
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name'
    )
  )
  on conflict (id) do update set
    email = excluded.email,
    display_name = coalesce(excluded.display_name, public.users.display_name),
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if any (idempotent)
drop trigger if exists on_auth_user_created on auth.users;

-- Create trigger: fires after every new signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================
-- RLS policies for public.users
-- (needed for the app-level upsert safety net)
-- =============================================

-- Allow users to read their own profile
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'users' and policyname = 'Users can view own profile'
  ) then
    create policy "Users can view own profile"
      on public.users for select
      using (auth.uid() = id);
  end if;
end $$;

-- Allow users to insert their own profile
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'users' and policyname = 'Users can insert own profile'
  ) then
    create policy "Users can insert own profile"
      on public.users for insert
      with check (auth.uid() = id);
  end if;
end $$;

-- Allow users to update their own profile
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'users' and policyname = 'Users can update own profile'
  ) then
    create policy "Users can update own profile"
      on public.users for update
      using (auth.uid() = id);
  end if;
end $$;

-- =============================================
-- Backfill: create public.users rows for any
-- existing auth.users that are missing them
-- =============================================
insert into public.users (id, email, display_name)
select
  au.id,
  au.email,
  coalesce(
    au.raw_user_meta_data->>'display_name',
    au.raw_user_meta_data->>'full_name',
    au.raw_user_meta_data->>'name'
  )
from auth.users au
where not exists (
  select 1 from public.users pu where pu.id = au.id
)
on conflict (id) do nothing;
