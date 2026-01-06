/**
 * Database types for Supabase tables
 */

export interface Account {
  id: string;
  auth_id: string;
  email: string;
  username: string | null;
  role: 'player' | 'admin';
  level: number;
  experience: number;
  health: number;
  max_health: number;
  mana: number;
  max_mana: number;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

export interface Admin {
  id: string;
  account_id: string;
  admin_level: 1 | 2 | 3 | 4 | 5;
  permissions: Record<string, boolean>;
  can_ban_users: boolean;
  can_edit_content: boolean;
  can_manage_admins: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  account_id: string;
  coins: number;
  gems: number;
  stars: number;
  created_at: string;
  updated_at: string;
}

export interface GameStats {
  id: string;
  account_id: string;
  eggs: number;
  hp: number;
  max_hp: number;
  mp: number;
  max_mp: number;
  xp: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  account_id: string;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlayerStats {
  id: string;
  account_id: string;
  total_kills: number;
  total_deaths: number;
  total_wins: number;
  total_losses: number;
  playtime_hours: number;
  created_at: string;
  updated_at: string;
}

/**
 * Combined user data with all relations
 */
export interface UserWithRelations extends Account {
  admin?: Admin;
  wallet?: Wallet;
  game_stats?: GameStats;
  profile?: Profile;
  player_stats?: PlayerStats;
}
