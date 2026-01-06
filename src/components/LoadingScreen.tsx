import { AnimatedBackground } from "./AnimatedBackground";

/**
 * Loading Screen - Displays a skeleton structure of the app while authenticating
 * Mimics the Viewport layout to prevent layout shift and white flash
 */
export function LoadingScreen() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 flex flex-col relative">
      <AnimatedBackground />
      
      {/* Skeleton Header */}
      <div className="absolute top-0 left-0 right-0 z-50 border-b border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-6 items-center justify-between h-[60px]">
          {/* Nav Skeleton */}
          <div className="flex gap-6">
            <div className="h-5 w-16 bg-white/20 rounded animate-pulse" />
            <div className="h-5 w-16 bg-white/20 rounded animate-pulse" />
          </div>

          {/* Right Side Skeleton */}
          <div className="flex items-center gap-4">
            {/* Wallet Skeleton */}
            <div className="hidden md:flex h-9 w-64 bg-white/10 rounded-xl border border-white/10 animate-pulse" />
            
            {/* Controls Skeleton */}
            <div className="h-9 w-9 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-9 w-9 bg-white/10 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          <p className="text-muted-foreground font-medium animate-pulse">Loading Realm...</p>
        </div>
      </div>

      {/* Skeleton Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-40 border-t border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur-md">
         <div className="max-w-7xl mx-auto px-6 py-3 flex gap-8 items-center justify-center h-[60px]">
            {/* Stat Bars Skeleton */}
            <div className="h-5 w-48 bg-white/10 rounded-full animate-pulse" />
            <div className="h-5 w-48 bg-white/10 rounded-full animate-pulse" />
            <div className="h-5 w-20 bg-white/10 rounded-full animate-pulse" />
         </div>
      </div>
    </div>
  );
}
