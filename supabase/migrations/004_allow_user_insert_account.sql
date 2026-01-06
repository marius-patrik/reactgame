-- Migration 004: Allow users to create their own account
-- For existing auth users who don't have accounts yet

-- Allow users to create their own account (one-time on first login)
CREATE POLICY "Users can create own account" ON accounts
  FOR INSERT WITH CHECK (auth_id = auth.uid());

-- Also need to allow insert on wallets and game_stats
CREATE POLICY "Users can create own wallet" ON wallets
  FOR INSERT WITH CHECK (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own game stats" ON game_stats
  FOR INSERT WITH CHECK (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );
