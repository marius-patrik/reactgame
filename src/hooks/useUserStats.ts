import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { GameStats, Wallet } from "@/types/database";

interface UserStats {
  gameStats: GameStats | null;
  wallet: Wallet | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch and manage user game stats and wallet data
 */
export function useUserStats(): UserStats {
  const { user } = useAuth();
  const [gameStats, setGameStats] = useState<GameStats | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!supabase || !user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // First get the account ID for the current user
      const { data: account, error: accountError } = await supabase
        .from("accounts")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (accountError) {
        // Account doesn't exist yet - that's OK for new users
        if (accountError.code === "PGRST116") {
          setIsLoading(false);
          return;
        }
        throw accountError;
      }

      // Fetch game stats
      const { data: stats, error: statsError } = await supabase
        .from("game_stats")
        .select("*")
        .eq("account_id", account.id)
        .single();

      if (statsError && statsError.code !== "PGRST116") {
        throw statsError;
      }
      setGameStats(stats);

      // Fetch wallet
      const { data: walletData, error: walletError } = await supabase
        .from("wallets")
        .select("*")
        .eq("account_id", account.id)
        .single();

      if (walletError && walletError.code !== "PGRST116") {
        throw walletError;
      }
      setWallet(walletData);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stats");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    gameStats,
    wallet,
    isLoading,
    error,
    refetch: fetchStats,
  };
}

