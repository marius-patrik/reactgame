-- Migration 002: Add Admin, Wallet, and Game Stats tables
-- Extends the user schema with administrative permissions, currency, and game statistics

-- Create admins table (extends accounts for admin-specific data)
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
  admin_level INT NOT NULL DEFAULT 1 CHECK (admin_level BETWEEN 1 AND 5),
  permissions JSONB DEFAULT '{}',
  can_ban_users BOOLEAN DEFAULT FALSE,
  can_edit_content BOOLEAN DEFAULT FALSE,
  can_manage_admins BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create wallets table (user currency and resources)
CREATE TABLE IF NOT EXISTS wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
  coins INT NOT NULL DEFAULT 0 CHECK (coins >= 0),
  gems INT NOT NULL DEFAULT 0 CHECK (gems >= 0),
  stars INT NOT NULL DEFAULT 0 CHECK (stars >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create game_stats table (character stats and progression)
CREATE TABLE IF NOT EXISTS game_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
  eggs INT NOT NULL DEFAULT 0 CHECK (eggs >= 0),
  hp INT NOT NULL DEFAULT 100 CHECK (hp >= 0),
  max_hp INT NOT NULL DEFAULT 100 CHECK (max_hp >= 0),
  mp INT NOT NULL DEFAULT 50 CHECK (mp >= 0),
  max_mp INT NOT NULL DEFAULT 50 CHECK (max_mp >= 0),
  xp INT NOT NULL DEFAULT 0 CHECK (xp >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_admins_account_id ON admins(account_id);
CREATE INDEX IF NOT EXISTS idx_admins_admin_level ON admins(admin_level);
CREATE INDEX IF NOT EXISTS idx_wallets_account_id ON wallets(account_id);
CREATE INDEX IF NOT EXISTS idx_game_stats_account_id ON game_stats(account_id);

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_stats ENABLE ROW LEVEL SECURITY;

-- Admins RLS policies
-- Admins can read admin records (but only their own for non-super admins)
CREATE POLICY "Admins can read own admin record" ON admins
  FOR SELECT USING (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );

-- Only super admins (level 5) can read all admin records
CREATE POLICY "Super admins can read all admins" ON admins
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admins a
      JOIN accounts acc ON a.account_id = acc.id
      WHERE acc.auth_id = auth.uid() AND a.admin_level = 5
    )
  );

-- Wallets RLS policies
CREATE POLICY "Users can read own wallet" ON wallets
  FOR SELECT USING (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own wallet" ON wallets
  FOR UPDATE USING (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );

-- Game stats RLS policies
CREATE POLICY "Users can read own game stats" ON game_stats
  FOR SELECT USING (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own game stats" ON game_stats
  FOR UPDATE USING (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );

-- Function to auto-create wallet and game_stats on account creation
CREATE OR REPLACE FUNCTION create_user_resources()
RETURNS TRIGGER AS $$
BEGIN
  -- Create wallet for new account
  INSERT INTO wallets (account_id) VALUES (NEW.id);
  
  -- Create game_stats for new account
  INSERT INTO game_stats (account_id) VALUES (NEW.id);
  
  -- Create admin record if role is admin
  IF NEW.role = 'admin' THEN
    INSERT INTO admins (account_id) VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create resources
DROP TRIGGER IF EXISTS on_account_created ON accounts;
CREATE TRIGGER on_account_created
  AFTER INSERT ON accounts
  FOR EACH ROW EXECUTE FUNCTION create_user_resources();
