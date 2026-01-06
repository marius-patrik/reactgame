import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 animate-fade-in-up">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-xl text-muted-foreground">Page not found</p>
        <p className="text-sm text-muted-foreground max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-6 py-2.5 backdrop-blur-md bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:from-primary/90 hover:to-primary/70 transition font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
