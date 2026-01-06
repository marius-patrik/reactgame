import { cn } from "@/lib/cn";

interface HotbarProps {
  className?: string;
}

/**
 * Hotbar - Frosted glass container anchored to bottom center of screen
 */
export function Hotbar({ className }: HotbarProps) {
  return (
    <div className={cn(
      "absolute bottom-6 left-1/2 -translate-x-1/2",
      "backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl",
      "px-6 py-3 min-w-[300px] h-16",
      className
    )}>
      {/* Hotbar content goes here */}
    </div>
  );
}
