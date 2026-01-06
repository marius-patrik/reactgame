import type React from "react";
import { cn } from "@/lib/cn";
import { AnimatedBackground } from "./AnimatedBackground";

interface ViewportProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Viewport - Fixed viewport wrapper with gradient background, animated blobs, and content slot
 */
export function Viewport({ children, className, contentClassName }: ViewportProps) {
  return (
    <div className={cn(
      "h-screen w-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center",
      className
    )}>
      <AnimatedBackground />
      <div className={cn("relative z-10 h-full w-full", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
