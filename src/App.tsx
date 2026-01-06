import { Router, Route, Link } from "wouter";
import Home from "@/pages/Home";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 py-4 flex gap-6">
            <Link href="/" className="font-semibold hover:text-primary transition">
              Home
            </Link>
            <Link href="/about" className="font-semibold hover:text-primary transition">
              About
            </Link>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </main>
      </div>
    </Router>
  );
}

export default App;
