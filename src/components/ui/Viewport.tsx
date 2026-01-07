import type React from "react";
import { cn } from "@/lib/cn";
import { AnimatedBackground } from "./AnimatedBackground";
import { Header } from "./Header";
import { Hotbar } from "./Hotbar";

interface ViewportProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Viewport - Fixed viewport wrapper with gradient background, animated blobs, and content slot
 * Now acts as the main application layout including Header, Footer (Stats), and Hotbar
 */
export function Viewport({ children, className, contentClassName }: ViewportProps) {
  return (
    <div className={cn(
      "h-screen w-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 flex flex-col",
      className
    )}>
      <AnimatedBackground />
      
      {/* Header (Top) */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 overflow-hidden flex items-center justify-center">
        <div className={cn("h-full w-full", contentClassName)}>
          {children}
        </div>
      </div>

      {/* Hotbar (Footer with Stats) */}
      <Hotbar />
    </div>
  );
}
