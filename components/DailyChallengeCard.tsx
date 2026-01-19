'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DailyChallengeCardProps {
  challenge: string;
  currentProgress: number;
  targetProgress: number;
  rewardPoints: number;
  completed?: boolean;
}

export function DailyChallengeCard({
  challenge,
  currentProgress,
  targetProgress,
  rewardPoints,
  completed = false,
}: DailyChallengeCardProps) {
  const progressPercent = (currentProgress / targetProgress) * 100;

  return (
    <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-accent/10 to-secondary/10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">Daily Challenge</h3>
          <p className="text-sm text-muted-foreground">{challenge}</p>
        </div>
        <div className="text-3xl">🎯</div>
      </div>

      <div className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
            <span className="text-sm font-bold text-foreground">
              {currentProgress}/{targetProgress}
            </span>
          </div>
          <div className="w-full h-3 bg-gradient-to-r from-muted to-muted/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Reward and Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-xs text-muted-foreground">Reward</p>
              <p className="text-lg font-bold text-primary">{rewardPoints} XP</p>
            </div>
          </div>

          {completed ? (
            <div className="px-4 py-2 bg-success/10 rounded-lg border border-success/20">
              <p className="text-sm font-semibold text-success">Completed!</p>
            </div>
          ) : progressPercent === 100 ? (
            <Button className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-semibold rounded-xl">
              Claim Reward
            </Button>
          ) : (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Almost there!</p>
              <p className="text-sm font-semibold text-foreground">{100 - Math.round(progressPercent)}% left</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
