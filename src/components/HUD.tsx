import type React from "react";
import { Link } from "wouter";
import { IconLogout, IconMoon, IconSun } from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { signOut } from "@/lib/auth";
import { Hotbar } from "./Hotbar";

interface HUDProps {
  children?: React.ReactNode;
}

/**
 * HUD - Heads-up display overlay with header and hotbar
 */
export function HUD({ children }: HUDProps) {
  const { isAuthenticated, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Header */}
      <header className="pointer-events-auto absolute top-0 left-0 right-0">
        <nav className="backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex gap-6 items-center justify-between">
            <div className="flex gap-6">
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

            <div className="flex items-center gap-4">
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
                  <span className="text-sm text-muted-foreground">{user?.email}</span>
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

      {/* Optional children content */}
      {children && (
        <div className="pointer-events-auto">
          {children}
        </div>
      )}

      {/* Hotbar */}
      <div className="pointer-events-auto">
        <Hotbar />
      </div>
    </div>
  );
}
