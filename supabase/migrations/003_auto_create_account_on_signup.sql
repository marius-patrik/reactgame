-- Migration 003: Auto-create account on user signup
-- Creates account record when a new user registers via Supabase Auth

-- Function to create account and related records on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create account for the new auth user
  INSERT INTO public.accounts (auth_id, email, role)
  VALUES (NEW.id, NEW.email, 'player');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users to auto-create account
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Note: The existing trigger on accounts (from migration 002) will then
-- auto-create wallet and game_stats when the account is created.
