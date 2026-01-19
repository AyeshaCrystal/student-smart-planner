'use client';

import { Card } from '@/components/ui/card';

interface StudentStatsPanelProps {
  name: string;
  level: string;
  points: number;
  streak: number;
  progressToNextLevel: number;
  avatar?: string;
}

export function StudentStatsPanel({
  name,
  level,
  points,
  streak,
  progressToNextLevel,
  avatar = '👨‍🎓',
}: StudentStatsPanelProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-700';
      case 'Focused':
        return 'bg-purple-100 text-purple-700';
      case 'Achiever':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-0 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Avatar and Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            {avatar}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{name}</h2>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(level)}`}>
              {level}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {/* Points */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Points</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">⭐</span>
              <span className="text-2xl font-bold text-foreground">{points}</span>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Streak</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-orange-500">🔥</span>
              <span className="text-2xl font-bold text-foreground">{streak}</span>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Progress</div>
            <div className="text-2xl font-bold text-success">{progressToNextLevel}%</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">Progress to Next Level</span>
          <span className="text-sm font-semibold text-foreground">{progressToNextLevel}%</span>
        </div>
        <div className="w-full h-3 bg-gradient-to-r from-muted to-muted/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${progressToNextLevel}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
