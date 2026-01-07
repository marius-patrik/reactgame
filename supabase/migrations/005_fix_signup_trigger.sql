-- Migration 005: Fix signup triggers and functions
-- Addresses potential 500 errors by explicit schema usage and search_path setting

-- 1. Fix handle_new_user (Triggered by auth.users INSERT)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.accounts (auth_id, email, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.email, 'unknown-' || NEW.id), -- Handle potential null email
    'player'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Dropping and recreating trigger to ensure it uses the updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Fix create_user_resources (Triggered by accounts INSERT)
CREATE OR REPLACE FUNCTION public.create_user_resources()
RETURNS TRIGGER AS $$
BEGIN
  -- Create wallet for new account
  INSERT INTO public.wallets (account_id) VALUES (NEW.id);
  
  -- Create game_stats for new account
  INSERT INTO public.game_stats (account_id) VALUES (NEW.id);
  
  -- Create admin record if role is admin
  IF NEW.role = 'admin' THEN
    INSERT INTO public.admins (account_id) VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_account_created ON public.accounts;
CREATE TRIGGER on_account_created
  AFTER INSERT ON public.accounts
  FOR EACH ROW EXECUTE FUNCTION public.create_user_resources();
