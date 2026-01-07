import { Link } from "wouter";
import { Viewport } from "@/components/ui/Viewport";

export default function NotFound() {
  return (
    <Viewport>
      <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/10 p-12 shadow-2xl text-center space-y-6 animate-fade-in-up">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-xl text-muted-foreground">Page not found</p>
        <p className="text-sm text-muted-foreground max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:from-primary/90 hover:to-primary/70 transition font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </Viewport>
  );
}

