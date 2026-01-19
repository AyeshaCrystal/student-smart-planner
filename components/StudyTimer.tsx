'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StudyTimerProps {
  onSessionComplete?: (xpGained: number) => void;
}

export function StudyTimer({ onSessionComplete }: StudyTimerProps) {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const FOCUS_TIME = 25 * 60; // 25 minutes
  const BREAK_TIME = 5 * 60; // 5 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Timer finished
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);

    if (mode === 'focus') {
      const xpGained = 10;
      setTotalXP((prev) => prev + xpGained);
      setSessionsCompleted((prev) => prev + 1);
      
      // Play notification sound
      playNotification();

      // Switch to break
      setMode('break');
      setTimeLeft(BREAK_TIME);

      if (onSessionComplete) {
        onSessionComplete(xpGained);
      }
    } else {
      // Break finished, switch back to focus
      setMode('focus');
      setTimeLeft(FOCUS_TIME);
    }
  };

  const playNotification = () => {
    // Simple beep notification
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMode('focus');
    setTimeLeft(FOCUS_TIME);
  };

  const progressPercent =
    mode === 'focus'
      ? ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100
      : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100;

  return (
    <Card className="p-8 border-0 shadow-md bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
      <h3 className="text-xl font-bold text-foreground mb-2">Pomodoro Timer</h3>
      <p className="text-muted-foreground mb-6">
        {mode === 'focus' ? 'Focus Session' : 'Break Time'}
      </p>

      {/* Timer Display */}
      <div className="mb-8">
        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercent / 100)}`}
              className={mode === 'focus' ? 'text-primary' : 'text-accent'}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <div className="text-5xl font-bold text-foreground">{formatTime(timeLeft)}</div>
              <div
                className={`text-sm font-semibold mt-1 ${
                  mode === 'focus' ? 'text-primary' : 'text-accent'
                }`}
              >
                {mode === 'focus' ? '🎯 Focus' : '☕ Break'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 justify-center mb-6">
        <Button
          onClick={toggleTimer}
          className={`px-6 h-11 font-semibold rounded-xl transition-all ${
            isRunning
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'
          } text-white`}
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </Button>
        <Button
          onClick={resetTimer}
          variant="outline"
          className="px-6 h-11 font-semibold rounded-xl border-border hover:bg-muted/50 bg-transparent"
        >
          ↻ Reset
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total XP</p>
          <p className="text-3xl font-bold text-primary">{totalXP}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Sessions</p>
          <p className="text-3xl font-bold text-secondary">{sessionsCompleted}</p>
        </div>
      </div>
    </Card>
  );
}
