import { IconCheck, IconLock, IconRocket, IconStar } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome to React Game Project</h1>
        <p className="text-lg text-muted-foreground">
          Built with React, TypeScript, Rsbuild, shadcn/ui, Tailwind CSS, and Wouter routing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card flex items-start gap-4">
          <IconCheck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2">✓ Game Ready</h2>
            <p className="text-muted-foreground">
              Set up with all the tools you need to build interactive game experiences.
            </p>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card flex items-start gap-4">
          <IconLock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2">🔒 Database Ready</h2>
            <p className="text-muted-foreground">
              Supabase PostgreSQL integration for storing and managing your game data.
            </p>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card flex items-start gap-4">
          <IconRocket className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2">🚀 Deploy Ready</h2>
            <p className="text-muted-foreground">
              Vercel configuration included for seamless deployment.
            </p>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card flex items-start gap-4">
          <IconStar className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold mb-2">⭐ Styled</h2>
            <p className="text-muted-foreground">
              shadcn/ui components with Tailwind CSS for beautiful UIs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
