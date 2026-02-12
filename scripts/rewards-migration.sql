-- =============================================
-- REWARDS SYSTEM MIGRATION
-- Run this in the Supabase SQL Editor
-- =============================================

-- 1. Shop Items table (themes, powerups, premium packages)
CREATE TABLE IF NOT EXISTS public.shop_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('theme', 'powerup', 'premium')),
  name TEXT NOT NULL,
  description TEXT,
  price_zapcoins INTEGER NOT NULL DEFAULT 0,
  icon TEXT,
  preview_colors JSONB, -- for themes: { primary, secondary, accent }
  metadata JSONB DEFAULT '{}', -- extra data per category
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Child purchased items (themes & one-time purchases)
CREATE TABLE IF NOT EXISTS public.child_shop_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  item_id UUID REFERENCES public.shop_items(id) ON DELETE CASCADE NOT NULL,
  purchased_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (child_id, item_id)
);

-- 3. Power-up inventory (consumable items with quantity)
CREATE TABLE IF NOT EXISTS public.powerup_inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  item_id UUID REFERENCES public.shop_items(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER DEFAULT 0 CHECK (quantity >= 0),
  UNIQUE (child_id, item_id)
);

-- 4. Premium subscriptions (purchased with zapcoins)
CREATE TABLE IF NOT EXISTS public.premium_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT true,
  UNIQUE (child_id)
);

-- 5. Add active_theme to children
ALTER TABLE public.children
  ADD COLUMN IF NOT EXISTS active_theme TEXT DEFAULT 'default';

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_shop_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.powerup_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_subscriptions ENABLE ROW LEVEL SECURITY;

-- Shop items: everyone can read
CREATE POLICY "Anyone can read shop items"
  ON public.shop_items FOR SELECT
  USING (true);

-- Child purchases: parent can read/insert for their children
CREATE POLICY "Parent can read child purchases"
  ON public.child_shop_purchases FOR SELECT
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Parent can insert child purchases"
  ON public.child_shop_purchases FOR INSERT
  WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- Powerup inventory: parent can read/insert/update for their children
CREATE POLICY "Parent can read powerup inventory"
  ON public.powerup_inventory FOR SELECT
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Parent can insert powerup inventory"
  ON public.powerup_inventory FOR INSERT
  WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Parent can update powerup inventory"
  ON public.powerup_inventory FOR UPDATE
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- Premium subscriptions: parent can read/insert/update for their children
CREATE POLICY "Parent can read premium subscriptions"
  ON public.premium_subscriptions FOR SELECT
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Parent can insert premium subscriptions"
  ON public.premium_subscriptions FOR INSERT
  WITH CHECK (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

CREATE POLICY "Parent can update premium subscriptions"
  ON public.premium_subscriptions FOR UPDATE
  USING (child_id IN (SELECT id FROM public.children WHERE parent_id = auth.uid()));

-- =============================================
-- RPC: Increment powerup quantity (upsert)
-- =============================================

CREATE OR REPLACE FUNCTION public.increment_powerup(
  p_child_id UUID,
  p_item_id UUID,
  p_amount INTEGER DEFAULT 1
)
RETURNS INTEGER AS $$
DECLARE
  v_new_qty INTEGER;
BEGIN
  INSERT INTO public.powerup_inventory (child_id, item_id, quantity)
  VALUES (p_child_id, p_item_id, p_amount)
  ON CONFLICT (child_id, item_id)
  DO UPDATE SET quantity = powerup_inventory.quantity + p_amount
  RETURNING quantity INTO v_new_qty;

  RETURN v_new_qty;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- RPC: Use powerup (decrement quantity)
-- =============================================

CREATE OR REPLACE FUNCTION public.use_powerup(
  p_child_id UUID,
  p_item_id UUID
)
RETURNS INTEGER AS $$
DECLARE
  v_new_qty INTEGER;
BEGIN
  UPDATE public.powerup_inventory
  SET quantity = quantity - 1
  WHERE child_id = p_child_id AND item_id = p_item_id AND quantity > 0
  RETURNING quantity INTO v_new_qty;

  IF v_new_qty IS NULL THEN
    RAISE EXCEPTION 'No powerup available';
  END IF;

  RETURN v_new_qty;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- SEED DATA: Themes
-- =============================================

INSERT INTO public.shop_items (slug, category, name, description, price_zapcoins, icon, preview_colors, sort_order) VALUES
  ('default', 'theme', 'Zapfy Clássico', 'O tema padrão do Zapfy', 0, '⚡', '{"primary": "#6C5CE7", "secondary": "#00D2D3", "accent": "#FECA57"}', 1),
  ('ocean', 'theme', 'Oceano Profundo', 'Mergulhe nas profundezas do conhecimento', 200, '🌊', '{"primary": "#0984E3", "secondary": "#00CEC9", "accent": "#74B9FF"}', 2),
  ('forest', 'theme', 'Floresta Encantada', 'Natureza e sabedoria se encontram', 200, '🌿', '{"primary": "#00B894", "secondary": "#55EFC4", "accent": "#BADC58"}', 3),
  ('sunset', 'theme', 'Pôr do Sol', 'Cores quentes para aprender com estilo', 300, '🌅', '{"primary": "#E17055", "secondary": "#FDCB6E", "accent": "#FAB1A0"}', 4),
  ('space', 'theme', 'Espaço Sideral', 'Explore o universo financeiro', 400, '🚀', '{"primary": "#6C5CE7", "secondary": "#A29BFE", "accent": "#FD79A8"}', 5),
  ('candy', 'theme', 'Doce Diversão', 'Um mundo de cores doces', 300, '🍭', '{"primary": "#E84393", "secondary": "#FD79A8", "accent": "#FDCB6E"}', 6),
  ('ninja', 'theme', 'Ninja Financeiro', 'Sigilo e precisão nos investimentos', 500, '🥷', '{"primary": "#2D3436", "secondary": "#636E72", "accent": "#00CEC9"}', 7),
  ('golden', 'theme', 'Ouro Puro', 'Para verdadeiros mestres financeiros', 1000, '👑', '{"primary": "#D4A017", "secondary": "#F9CA24", "accent": "#FFF3BF"}', 8)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- SEED DATA: Power-ups
-- =============================================

INSERT INTO public.shop_items (slug, category, name, description, price_zapcoins, icon, metadata, sort_order) VALUES
  ('streak_freeze', 'powerup', 'Escudo de Streak', 'Protege sua sequência por 1 dia se esquecer de jogar', 50, '🛡️', '{"effect": "streak_freeze", "duration_days": 1}', 1),
  ('double_xp', 'powerup', 'XP Duplo', 'Ganhe o dobro de XP por 1 hora', 100, '⚡', '{"effect": "double_xp", "duration_minutes": 60}', 2),
  ('extra_heart', 'powerup', 'Coração Extra', 'Recupera 1 coração instantaneamente', 30, '❤️‍🔥', '{"effect": "extra_heart", "amount": 1}', 3),
  ('hint_token', 'powerup', 'Dica Mágica', 'Revela uma dica na missão atual', 40, '💡', '{"effect": "hint", "uses": 1}', 4),
  ('skip_mission', 'powerup', 'Pular Missão', 'Pule uma missão difícil (não ganha XP)', 80, '⏭️', '{"effect": "skip_mission", "uses": 1}', 5)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- SEED DATA: Premium packages (bought with zapcoins)
-- =============================================

INSERT INTO public.shop_items (slug, category, name, description, price_zapcoins, icon, metadata, sort_order) VALUES
  ('premium_7d', 'premium', 'Premium 7 Dias', '1 semana de benefícios premium', 500, '⭐', '{"duration_days": 7}', 1),
  ('premium_30d', 'premium', 'Premium 30 Dias', '1 mês de benefícios premium com desconto', 1500, '💎', '{"duration_days": 30}', 2),
  ('premium_90d', 'premium', 'Premium 90 Dias', '3 meses de benefícios premium - melhor valor!', 3500, '🏆', '{"duration_days": 90}', 3)
ON CONFLICT (slug) DO NOTHING;
