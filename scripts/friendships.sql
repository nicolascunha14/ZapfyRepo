-- Friendships system for Zapfy
-- Allows children to add friends and see friend-only rankings

CREATE TABLE IF NOT EXISTS public.friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  addressee_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(requester_id, addressee_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_friendships_requester ON public.friendships(requester_id, status);
CREATE INDEX IF NOT EXISTS idx_friendships_addressee ON public.friendships(addressee_id, status);

-- RLS
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Children can view own friendships" ON public.friendships
  FOR SELECT USING (
    requester_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
    OR addressee_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );

CREATE POLICY "Children can send friend requests" ON public.friendships
  FOR INSERT WITH CHECK (
    requester_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );

CREATE POLICY "Children can update requests sent to them" ON public.friendships
  FOR UPDATE USING (
    addressee_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );

CREATE POLICY "Children can delete own friendships" ON public.friendships
  FOR DELETE USING (
    requester_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
    OR addressee_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid())
  );
