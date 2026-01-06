import { Router, Route, useLocation, Redirect, Switch } from "wouter";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoadingScreen } from "@/components/LoadingScreen";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import NotFound from "@/pages/NotFound";

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();

  const isAuthPage = location === "/login" || location === "/signup";

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      {/* Redirect root to login if not authenticated */}
      {location === "/" && !isAuthenticated && !isAuthPage && (
        <Redirect to="/login" />
      )}

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
