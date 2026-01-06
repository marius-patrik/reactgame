import { IconCheck, IconLock, IconRocket, IconStar } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-8">
        {/* Header card */}
        <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/10 p-8 shadow-2xl animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-2">Welcome to React Game Project</h1>
          <p className="text-lg text-muted-foreground">
            Built with React, TypeScript, Rsbuild, shadcn/ui, Tailwind CSS, and Wouter routing.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/10 flex items-start gap-4 hover:bg-white/15 dark:hover:bg-black/30 transition shadow-xl">
            <IconCheck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">✓ Game Ready</h2>
              <p className="text-muted-foreground">
                Set up with all the tools you need to build interactive game experiences.
              </p>
            </div>
          </div>

          <div className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/10 flex items-start gap-4 hover:bg-white/15 dark:hover:bg-black/30 transition shadow-xl">
            <IconLock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">🔒 Database Ready</h2>
              <p className="text-muted-foreground">
                Supabase PostgreSQL integration for storing and managing your game data.
              </p>
            </div>
          </div>

          <div className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/10 flex items-start gap-4 hover:bg-white/15 dark:hover:bg-black/30 transition shadow-xl">
            <IconRocket className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold mb-2">🚀 Deploy Ready</h2>
              <p className="text-muted-foreground">
                Vercel configuration included for seamless deployment.
              </p>
            </div>
          </div>

          <div className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/10 flex items-start gap-4 hover:bg-white/15 dark:hover:bg-black/30 transition shadow-xl">
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
    </div>
  );
}

