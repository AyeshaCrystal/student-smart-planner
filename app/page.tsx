'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  const features = [
    {
      icon: '📚',
      title: 'Smart Task Management',
      description: 'Organize study tasks by subject, priority, and due date with an intuitive interface.',
    },
    {
      icon: '⏱️',
      title: 'Pomodoro Timer',
      description: 'Focus sessions with proven time management technique. Track your study hours effectively.',
    },
    {
      icon: '⭐',
      title: 'Gamified Learning',
      description: 'Earn XP, maintain streaks, and unlock achievements to stay motivated.',
    },
    {
      icon: '🏆',
      title: 'Leaderboards',
      description: 'Compete with peers and see where you stand on the global leaderboard.',
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Visualize your weekly progress with detailed charts and insights.',
    },
    {
      icon: '🎯',
      title: 'Goal Tracking',
      description: 'Set academic and personal goals, monitor progress, and celebrate milestones.',
    },
  ];

  const testimonials = [
    {
      name: 'Ayesha Sharma',
      role: 'Computer Science Student',
      avatar: '👩‍💻',
      text: 'Smart Planner changed how I study! The gamification keeps me motivated and the analytics help me see my real progress.',
    },
    {
      name: 'Ram Kumar',
      role: 'Engineering Student',
      avatar: '👨‍💻',
      text: 'The Pomodoro timer is perfect for my study sessions. I love competing on the leaderboard with my classmates!',
    },
    {
      name: 'Priya Singh',
      role: 'Data Science Student',
      avatar: '👩‍🎓',
      text: 'Finally a study app that makes learning fun. My grades improved and I developed better study habits.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              📚 Smart Planner
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className="rounded-xl font-medium border-border hover:bg-muted/50 bg-transparent">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold rounded-xl">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-32 text-center space-y-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Master Your Studies with{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Gamified Learning
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your study routine with Smart Planner. Track progress, earn achievements, and compete with peers
            while building better study habits.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button className="h-12 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold rounded-xl text-lg">
              Get Started Free
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="h-12 px-8 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-xl text-lg bg-transparent"
            >
              Already Have Account?
            </Button>
          </Link>
        </div>

        {/* Hero Image/Graphic */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-16 border border-border/50">
            <div className="text-center space-y-4">
              <div className="text-6xl md:text-7xl mb-4">🎮</div>
              <p className="text-xl font-semibold text-foreground mb-6">
                Study Like You're Playing a Game
              </p>
              <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-border/50">
                <div>
                  <p className="text-3xl font-bold text-primary">⭐</p>
                  <p className="text-sm text-muted-foreground mt-2">Earn XP Points</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">🔥</p>
                  <p className="text-sm text-muted-foreground mt-2">Build Streaks</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">🏆</p>
                  <p className="text-sm text-muted-foreground mt-2">Unlock Badges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 space-y-12">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-foreground">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to become a more effective student
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 border-0 shadow-md hover:shadow-lg transition-all hover:translate-y-1 bg-gradient-to-br from-background to-background/80"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 space-y-12">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-foreground">Loved by Students</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what students are saying about their Smart Planner experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 border-0 shadow-md bg-gradient-to-br from-primary/5 to-secondary/5"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">{testimonial.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-12 md:p-16 text-center text-white space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Transform Your Study Habits?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of students who are already using Smart Planner to achieve their academic goals.
          </p>
          <Link href="/register">
            <Button className="h-12 px-8 bg-white text-primary hover:bg-white/90 font-semibold rounded-xl text-lg">
              Start Your Free Journey Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-muted-foreground">
          <p>© 2025 Smart Planner. All rights reserved.</p>
          <p className="mt-2 text-sm">Making learning fun, one task at a time.</p>
        </div>
      </footer>
    </div>
  );
}
