'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: string;
  completed: boolean;
  isOverdue: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

export function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onFilterChange,
  activeFilter,
}: TaskListProps) {
  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      DBMS: 'bg-blue-100 text-blue-700',
      OS: 'bg-purple-100 text-purple-700',
      AI: 'bg-green-100 text-green-700',
      ML: 'bg-orange-100 text-orange-700',
      TOC: 'bg-pink-100 text-pink-700',
      Others: 'bg-gray-100 text-gray-700',
    };
    return colors[subject] || colors['Others'];
  };

  const getPriorityColor = (priority: string, isOverdue: boolean) => {
    if (isOverdue) return 'text-destructive font-bold';
    if (priority === 'High') return 'text-destructive';
    if (priority === 'Medium') return 'text-warning';
    return 'text-success';
  };

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'High Priority', value: 'high' },
    { label: 'Completed', value: 'completed' },
  ];

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'high') return task.priority === 'High' && !task.completed;
    if (activeFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return task.dueDate === today && !task.completed;
    }
    return !task.completed;
  });

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            variant={activeFilter === filter.value ? 'default' : 'outline'}
            className={`rounded-xl font-medium transition-all ${
              activeFilter === filter.value
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'border-border hover:bg-muted/50'
            }`}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card className="p-8 text-center border-0 shadow-md bg-gradient-to-br from-background to-background/80">
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-lg font-semibold text-foreground">
              {activeFilter === 'completed' ? 'No completed tasks yet' : 'All tasks completed!'}
            </p>
            <p className="text-muted-foreground mt-1">Keep up the great work!</p>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              className={`p-4 border-0 shadow-sm hover:shadow-md transition-all ${
                task.completed ? 'bg-muted/30 opacity-70' : 'bg-white'
              } ${task.isOverdue && !task.completed ? 'ring-2 ring-destructive/50' : ''}`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="w-6 h-6 mt-1 rounded-lg border-2 border-border cursor-pointer accent-primary"
                />

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p
                        className={`font-semibold transition-all ${
                          task.completed
                            ? 'text-muted-foreground line-through'
                            : 'text-foreground'
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${getSubjectColor(task.subject)}`}>
                          {task.subject}
                        </span>
                        <span className={`text-xs font-semibold ${getPriorityColor(task.priority, task.isOverdue)}`}>
                          {task.isOverdue && !task.completed ? '⚠️ Overdue' : task.priority}
                        </span>
                        <span className="text-xs text-muted-foreground">📅 {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  aria-label="Delete task"
                >
                  ✕
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
