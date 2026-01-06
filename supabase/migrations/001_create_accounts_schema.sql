-- Create accounts table with user roles (player and admin)
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  username TEXT UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('player', 'admin')) DEFAULT 'player',
  level INT DEFAULT 1,
  experience INT DEFAULT 0,
  health INT DEFAULT 100,
  max_health INT DEFAULT 100,
  mana INT DEFAULT 50,
  max_mana INT DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- Create profiles table (extends player with additional profile data)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create player_stats table (detailed player statistics)
CREATE TABLE IF NOT EXISTS player_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL UNIQUE REFERENCES accounts(id) ON DELETE CASCADE,
  total_kills INT DEFAULT 0,
  total_deaths INT DEFAULT 0,
  total_wins INT DEFAULT 0,
  total_losses INT DEFAULT 0,
  playtime_hours INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_accounts_auth_id ON accounts(auth_id);
CREATE INDEX IF NOT EXISTS idx_accounts_email ON accounts(email);
CREATE INDEX IF NOT EXISTS idx_accounts_username ON accounts(username);
CREATE INDEX IF NOT EXISTS idx_accounts_role ON accounts(role);
CREATE INDEX IF NOT EXISTS idx_profiles_account_id ON profiles(account_id);
CREATE INDEX IF NOT EXISTS idx_player_stats_account_id ON player_stats(account_id);

-- Create RLS policies for security
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own account
CREATE POLICY "Users can read own account" ON accounts
  FOR SELECT USING (auth_id = auth.uid());

-- Allow users to update their own account
CREATE POLICY "Users can update own account" ON accounts
  FOR UPDATE USING (auth_id = auth.uid());

-- Allow users to read all profiles (public)
CREATE POLICY "Profiles are public" ON profiles
  FOR SELECT USING (true);

-- Allow users to update own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );

-- Allow users to read their own stats
CREATE POLICY "Users can read own stats" ON player_stats
  FOR SELECT USING (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );

-- Allow users to update own stats
CREATE POLICY "Users can update own stats" ON player_stats
  FOR UPDATE USING (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );
