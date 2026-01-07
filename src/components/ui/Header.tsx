import { Link } from "wouter";
import { 
  IconLogout, 
  IconMoon, 
  IconSun,
  IconCoin,
  IconDiamond,
  IconStar
} from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { signOut } from "@/lib/auth";
import { useUserStats } from "@/hooks/useUserStats";
import type React from "react";

/**
 * Currency display component
 */
function CurrencyDisplay({ 
  value, 
  icon: Icon, 
  color,
  label 
}: { 
  value: number; 
  icon: React.ComponentType<{ className?: string }>; 
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1" title={label}>
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-sm font-medium">{value.toLocaleString()}</span>
    </div>
  );
}

export function Header() {
  const { isAuthenticated, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { wallet, isLoading } = useUserStats();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <header className="pointer-events-auto absolute top-0 left-0 right-0 z-50">
      <nav className="backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-6 items-center justify-between">
          {/* Left: Navigation */}
          <div className="flex gap-6 items-center">
            <Link
              href="/"
              className="font-semibold hover:text-primary transition"
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link
                href="/about"
                className="font-semibold hover:text-primary transition"
              >
                About
              </Link>
            )}
          </div>

          {/* Right: Wallet & User */}
          <div className="flex items-center gap-4">
            {/* Wallet */}
            {isAuthenticated && !isLoading && wallet && (
              <div className="flex items-center gap-3 px-3 py-1.5 backdrop-blur-md bg-white/5 dark:bg-black/10 rounded-xl border border-white/10">
                <CurrencyDisplay value={wallet.coins} icon={IconCoin} color="text-yellow-400" label="Coins" />
                <CurrencyDisplay value={wallet.gems} icon={IconDiamond} color="text-purple-400" label="Gems" />
                <CurrencyDisplay value={wallet.stars} icon={IconStar} color="text-cyan-400" label="Stars" />
              </div>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <IconSun className="w-5 h-5" />
              ) : (
                <IconMoon className="w-5 h-5" />
              )}
            </button>

            {isAuthenticated && (
              <>
                <span className="text-sm text-muted-foreground hidden md:inline">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition flex items-center gap-2"
                  title="Sign out"
                >
                  <IconLogout className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
