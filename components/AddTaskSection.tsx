'use client';

import React from "react"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface AddTaskSectionProps {
  onAddTask: (task: {
    title: string;
    subject: string;
    dueDate: string;
    priority: string;
  }) => void;
}

export function AddTaskSection({ onAddTask }: AddTaskSectionProps) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('DBMS');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && dueDate) {
      onAddTask({
        title: title.trim(),
        subject,
        dueDate,
        priority,
      });
      setTitle('');
      setDueDate('');
      setPriority('Medium');
    }
  };

  const subjects = ['DBMS', 'OS', 'AI', 'ML', 'TOC', 'Others'];
  const priorities = ['High', 'Medium', 'Low'];

  return (
    <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-background to-background/80">
      <h3 className="text-lg font-bold text-foreground mb-4">Add Study Task</h3>
      <form onSubmit={handleAddTask} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Task Title */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground block mb-2">Task Title</label>
            <Input
              type="text"
              placeholder="e.g., Study Chapter 5 Normalization"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 bg-white border-border rounded-xl"
              required
            />
          </div>

          {/* Subject Dropdown */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="h-11 bg-white border-border rounded-xl"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold rounded-xl transition-all duration-300"
        >
          Add Task
        </Button>
      </form>
    </Card>
  );
}
