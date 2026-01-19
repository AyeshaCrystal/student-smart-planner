'use client';

import { Card } from '@/components/ui/card';

interface DayData {
  day: string;
  tasksCompleted: number;
  maxTasks: number;
}

interface WeeklyProgressChartProps {
  data: DayData[];
}

export function WeeklyProgressChart({ data }: WeeklyProgressChartProps) {
  const maxValue = Math.max(...data.map((d) => d.maxTasks));

  const getBarColor = (completed: number, max: number) => {
    const percentage = (completed / max) * 100;
    if (percentage >= 80) return 'from-accent to-success';
    if (percentage >= 50) return 'from-primary to-primary/70';
    if (percentage >= 25) return 'from-warning to-warning/70';
    return 'from-destructive/50 to-destructive/30';
  };

  return (
    <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-background to-background/80">
      <h3 className="text-lg font-bold text-foreground mb-6">Weekly Progress</h3>

      <div className="space-y-6">
        {/* Chart */}
        <div className="flex items-end justify-around h-48 gap-2 px-2">
          {data.map((dayData) => {
            const percentage = (dayData.tasksCompleted / dayData.maxTasks) * 100;
            const barHeight = (percentage / 100) * 100;

            return (
              <div
                key={dayData.day}
                className="flex-1 flex flex-col items-center gap-2"
              >
                {/* Bar */}
                <div className="w-full flex items-end justify-center h-40">
                  <div className="w-full max-w-12 relative group">
                    {/* Background bar */}
                    <div className="w-full h-full bg-muted/30 rounded-t-lg"></div>

                    {/* Progress bar */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 rounded-t-lg bg-gradient-to-t ${getBarColor(
                        dayData.tasksCompleted,
                        dayData.maxTasks
                      )} transition-all duration-300 hover:shadow-lg`}
                      style={{ height: `${barHeight}%` }}
                    >
                      {/* Tooltip on hover */}
                      <div className="hidden group-hover:flex absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-foreground text-white text-xs font-semibold px-2 py-1 rounded-lg">
                        {dayData.tasksCompleted}/{dayData.maxTasks}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day label */}
                <p className="text-xs font-semibold text-muted-foreground">{dayData.day}</p>

                {/* Count */}
                <p className="text-xs text-foreground font-bold">
                  {dayData.tasksCompleted}/{dayData.maxTasks}
                </p>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground font-medium mb-3">Performance Legend</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-accent to-success"></div>
              <span className="text-xs text-muted-foreground">80%+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-primary to-primary/70"></div>
              <span className="text-xs text-muted-foreground">50-79%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-warning to-warning/70"></div>
              <span className="text-xs text-muted-foreground">25-49%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-destructive/50 to-destructive/30"></div>
              <span className="text-xs text-muted-foreground">&lt; 25%</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1">This Week</p>
            <p className="text-lg font-bold text-foreground">
              {data.reduce((acc, d) => acc + d.tasksCompleted, 0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Completion Rate</p>
            <p className="text-lg font-bold text-primary">
              {Math.round(
                (data.reduce((acc, d) => acc + d.tasksCompleted, 0) /
                  data.reduce((acc, d) => acc + d.maxTasks, 0)) *
                  100
              )}
              %
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Avg Daily</p>
            <p className="text-lg font-bold text-secondary">
              {Math.round(data.reduce((acc, d) => acc + d.tasksCompleted, 0) / data.length)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
