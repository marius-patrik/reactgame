import { cn } from "@/lib/cn";
import { 
  IconHeart,
  IconDroplet
} from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStats } from "@/hooks/useUserStats";
import type React from "react";

interface HotbarProps {
  className?: string;
}

/**
 * Stat bar component for use in Hotbar
 */
function StatBar({ 
  value, 
  max, 
  color, 
  icon: Icon,
  label,
  hideText = false
}: { 
  value: number; 
  max: number; 
  color: string; 
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hideText?: boolean;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="flex flex-col gap-1 w-24 md:w-32" title={`${label}: ${value}/${max}`}>
      <div className="flex items-center justify-between px-1">
        <Icon className={`w-3 h-3 md:w-4 md:h-4 ${color}`} />
        {!hideText && <span className="text-[10px] md:text-xs font-bold text-white/50">{value}</span>}
      </div>
      <div className="w-full h-1.5 md:h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
        <div 
          className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Hotbar - Main HUD/Footer component containing Stats and Action Slots
 * Anchored to bottom center of screen
 */
export function Hotbar({ className }: HotbarProps) {
  const { isAuthenticated } = useAuth();
  const { gameStats, isLoading } = useUserStats();

  if (!isAuthenticated || isLoading || !gameStats) {
    return null;
  }

  return (
    <div className={cn(
      "absolute bottom-6 left-1/2 -translate-x-1/2 z-50",
      "flex flex-col gap-2 items-center",
      className
    )}>
      {/* Main Bar Container */}
      <div className={cn(
        "backdrop-blur-xl bg-black/40 dark:bg-black/60 rounded-2xl border border-white/10 shadow-2xl",
        "px-4 py-2 flex items-center gap-4 md:gap-6"
      )}>
        {/* Left Stats: HP */}
        <StatBar 
          value={gameStats.hp} 
          max={gameStats.max_hp} 
          color="text-red-500" 
          icon={IconHeart}
          label="HP"
        />

        {/* Center: Hotbar Slots */}
        <div className="flex items-center gap-1 md:gap-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 border border-white/10",
                "flex items-center justify-center hover:bg-white/10 transition cursor-pointer",
                "text-xs font-bold text-white/20"
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Right Stats: MP */}
        <StatBar 
          value={gameStats.mp} 
          max={gameStats.max_mp} 
          color="text-blue-500" 
          icon={IconDroplet}
          label="MP"
        />
      </div>

      {/* XP Bar (Bottom thin line) */}
      <div className="w-full px-4">
        <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden border border-white/5">
           <div 
             className="h-full bg-yellow-500 transition-all duration-300"
             style={{ width: `${Math.min(gameStats.xp % 100, 100)}%` }} // Simplified XP progress
           />
        </div>
        <div className="text-[10px] text-center text-white/30 mt-0.5">
           LVL {Math.floor(gameStats.xp / 100) + 1}
        </div>
      </div>
    </div>
  );
}
