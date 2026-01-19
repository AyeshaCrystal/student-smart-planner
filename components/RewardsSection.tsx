'use client';

import { Card } from '@/components/ui/card';

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  locked: boolean;
  requirement: string;
}

interface RewardsSectionProps {
  badges: Badge[];
}

export function RewardsSection({ badges }: RewardsSectionProps) {
  return (
    <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-background to-background/80">
      <h3 className="text-lg font-bold text-foreground mb-4">Achievements</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative p-4 rounded-xl border-2 border-dashed transition-all ${
              badge.locked
                ? 'bg-muted/30 border-muted/50'
                : 'bg-gradient-to-br from-accent/10 to-primary/10 border-accent/50'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-2">
              {/* Badge Icon */}
              <div
                className={`text-4xl transition-opacity ${badge.locked ? 'opacity-40' : 'opacity-100'}`}
              >
                {badge.icon}
              </div>

              {/* Badge Info */}
              <div className="flex-1">
                <p className={`font-bold text-sm ${badge.locked ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {badge.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
              </div>

              {/* Status Badge */}
              {badge.locked ? (
                <div className="w-full mt-2 px-2 py-1 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground font-medium">{badge.requirement}</p>
                </div>
              ) : (
                <div className="w-full mt-2 px-2 py-1 bg-success/20 rounded-lg border border-success/30">
                  <p className="text-xs font-semibold text-success">Unlocked</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
