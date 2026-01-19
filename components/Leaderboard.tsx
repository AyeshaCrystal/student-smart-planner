'use client';

import { Card } from '@/components/ui/card';

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  avatar: string;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  timeframe?: 'week' | 'month' | 'all';
}

export function Leaderboard({ entries, timeframe = 'week' }: LeaderboardProps) {
  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '⭐';
    }
  };

  const getTimeframeLabel = () => {
    switch (timeframe) {
      case 'month':
        return 'This Month';
      case 'all':
        return 'All Time';
      default:
        return 'This Week';
    }
  };

  return (
    <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-background to-background/80">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">🏆 Leaderboard</h3>
        <span className="text-sm font-semibold text-muted-foreground">{getTimeframeLabel()}</span>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className={`p-4 rounded-xl transition-all ${
              entry.isCurrentUser
                ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/50'
                : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Rank and Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Rank Medal */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30">
                  <span className="text-lg">{getMedalEmoji(entry.rank)}</span>
                </div>

                {/* Avatar and Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg flex-shrink-0">
                    {entry.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold truncate ${entry.isCurrentUser ? 'text-foreground' : 'text-foreground'}`}>
                      {entry.name}
                      {entry.isCurrentUser && (
                        <span className="ml-2 text-xs font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          (You)
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <span>🔥 {entry.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* XP Score */}
              <div className="text-right ml-4 flex-shrink-0">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {entry.xp.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
        <p className="text-sm text-muted-foreground text-center">
          Complete tasks and maintain your streak to climb the leaderboard! 🚀
        </p>
      </div>
    </Card>
  );
}
