import { 
  IconHeart,
  IconDroplet,
  IconStar
} from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStats } from "@/hooks/useUserStats";
import type React from "react";

/**
 * Stat bar component for HP/MP/XP display
 */
function StatBar({ 
  value, 
  max, 
  color, 
  icon: Icon,
  label 
}: { 
  value: number; 
  max: number; 
  color: string; 
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="flex items-center gap-2" title={`${label}: ${value}/${max}`}>
      <Icon className={`w-5 h-5 ${color}`} />
      <div className="w-32 h-3 bg-white/10 dark:bg-black/20 rounded-full overflow-hidden border border-white/5">
        <div 
          className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-muted-foreground w-12">{value}</span>
    </div>
  );
}

export function Footer() {
  const { isAuthenticated } = useAuth();
  const { gameStats, isLoading } = useUserStats();

  if (!isAuthenticated || isLoading || !gameStats) {
    return null;
  }

  return (
    <footer className="pointer-events-auto absolute bottom-0 left-0 right-0 z-40">
      <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border-t border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-8 items-center justify-center">
          <StatBar 
            value={gameStats.hp} 
            max={gameStats.max_hp} 
            color="text-red-500" 
            icon={IconHeart}
            label="HP"
          />
          <StatBar 
            value={gameStats.mp} 
            max={gameStats.max_mp} 
            color="text-blue-500" 
            icon={IconDroplet}
            label="MP"
          />
          <div className="flex items-center gap-2" title={`XP: ${gameStats.xp}`}>
            <IconStar className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-muted-foreground">{gameStats.xp} XP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
