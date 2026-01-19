'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Goal {
  id: string;
  title: string;
  progress: number;
  deadline: string;
  category: string;
}

interface GoalsSectionProps {
  goals: Goal[];
  onAddGoal?: (goal: Goal) => void;
  onUpdateProgress?: (id: string, progress: number) => void;
}

export function GoalsSection({ goals, onAddGoal, onUpdateProgress }: GoalsSectionProps) {
  const [newGoal, setNewGoal] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal,
        progress: 0,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        category: 'Personal',
      };
      onAddGoal?.(goal);
      setNewGoal('');
      setShowForm(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Academic: 'bg-blue-100 text-blue-700',
      Personal: 'bg-purple-100 text-purple-700',
      Health: 'bg-green-100 text-green-700',
      Other: 'bg-gray-100 text-gray-700',
    };
    return colors[category] || colors['Other'];
  };

  return (
    <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-background to-background/80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">Goals</h3>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold rounded-xl text-sm px-3 py-1"
        >
          {showForm ? '✕' : '+ Add Goal'}
        </Button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-accent/5 rounded-xl border border-accent/20 space-y-3">
          <Input
            type="text"
            placeholder="Enter your goal (e.g., Complete Data Structures course)"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            className="h-11 bg-white border-border rounded-xl"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleAddGoal}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold rounded-xl"
            >
              Create Goal
            </Button>
            <Button
              onClick={() => setShowForm(false)}
              variant="outline"
              className="border-border hover:bg-muted/50 rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-3">
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-2xl mb-2">🎯</p>
            <p className="text-muted-foreground">No goals yet. Create one to get started!</p>
          </div>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{goal.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${getCategoryColor(goal.category)}`}>
                      {goal.category}
                    </span>
                    <span className="text-xs text-muted-foreground">📅 {goal.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Progress</span>
                  <span className="text-sm font-bold text-foreground">{goal.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gradient-to-r from-muted to-muted/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              {/* Update Progress */}
              <div className="mt-3 flex gap-2">
                {[25, 50, 75, 100].map((value) => (
                  <button
                    key={value}
                    onClick={() => onUpdateProgress?.(goal.id, value)}
                    className={`flex-1 text-xs font-semibold py-1 px-2 rounded-lg transition-all ${
                      goal.progress === value
                        ? 'bg-primary text-white'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
