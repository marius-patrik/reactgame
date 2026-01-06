import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="space-y-6 text-center py-12">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <Link href="/" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition">
        Go Home
      </Link>
    </div>
  );
}
