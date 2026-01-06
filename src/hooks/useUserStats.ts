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
 * Auto-creates account/wallet/game_stats for existing users without them
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

      // First get or create the account for the current user
      let accountId: string;
      
      const { data: account, error: accountError } = await supabase
        .from("accounts")
        .select("id")
        .eq("auth_id", user.id)
        .single();

      if (accountError) {
        if (accountError.code === "PGRST116") {
          // Account doesn't exist - create it
          console.log("[useUserStats] Creating account for user:", user.id);
          const { data: newAccount, error: createError } = await supabase
            .from("accounts")
            .insert({
              auth_id: user.id,
              email: user.email || "",
              role: "player",
            })
            .select("id")
            .single();

          if (createError) {
            console.error("[useUserStats] Failed to create account:", createError);
            throw createError;
          }
          accountId = newAccount.id;
          console.log("[useUserStats] Account created:", accountId);
        } else {
          throw accountError;
        }
      } else {
        accountId = account.id;
      }

      // Fetch or create game stats
      let statsData: GameStats | null = null;
      const { data: stats, error: statsError } = await supabase
        .from("game_stats")
        .select("*")
        .eq("account_id", accountId)
        .single();

      if (statsError && statsError.code === "PGRST116") {
        // Create default game stats
        console.log("[useUserStats] Creating game_stats for account:", accountId);
        const { data: newStats, error: createStatsError } = await supabase
          .from("game_stats")
          .insert({
            account_id: accountId,
            eggs: 0,
            hp: 100,
            max_hp: 100,
            mp: 50,
            max_mp: 50,
            xp: 0,
          })
          .select("*")
          .single();

        if (createStatsError) {
          console.error("[useUserStats] Failed to create game_stats:", createStatsError);
        } else {
          statsData = newStats;
        }
      } else if (!statsError) {
        statsData = stats;
      }
      setGameStats(statsData);

      // Fetch or create wallet
      let walletData: Wallet | null = null;
      const { data: walletResult, error: walletError } = await supabase
        .from("wallets")
        .select("*")
        .eq("account_id", accountId)
        .single();

      if (walletError && walletError.code === "PGRST116") {
        // Create default wallet
        console.log("[useUserStats] Creating wallet for account:", accountId);
        const { data: newWallet, error: createWalletError } = await supabase
          .from("wallets")
          .insert({
            account_id: accountId,
            coins: 0,
            gems: 0,
            stars: 0,
          })
          .select("*")
          .single();

        if (createWalletError) {
          console.error("[useUserStats] Failed to create wallet:", createWalletError);
        } else {
          walletData = newWallet;
        }
      } else if (!walletError) {
        walletData = walletResult;
      }
      setWallet(walletData);

    } catch (err) {
      console.error("[useUserStats] Error:", err);
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
