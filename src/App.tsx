import { Router, Route, Link, useLocation, Redirect, Switch } from "wouter";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { signOut } from "@/lib/auth";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import NotFound from "@/pages/NotFound";
import { IconLogout, IconMoon, IconSun } from "@tabler/icons-react";

function AppContent() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [location] = useLocation();

  const isAuthPage = location === "/login" || location === "/signup";

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {/* Redirect root to login if not authenticated */}
      {location === "/" && !isAuthenticated && !isAuthPage && (
        <Redirect to="/login" />
      )}

      {!isAuthPage && (
        <nav className="backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10 sticky top-0 z-40">
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
      )}

      <main>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </Route>
          <Route path="/about">
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
