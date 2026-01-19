"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc, updateDoc, increment } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

import { StudyTimer } from "@/components/StudyTimer"
import { GoalsSection } from "@/components/GoalsSection"
import { Button } from "@/components/ui/button"

interface Goal {
  id: string
  title: string
  progress: number
  deadline: string
  category: string
}

export default function TimerPage() {
  const router = useRouter()

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Finish DBMS syllabus by Jan 30",
      progress: 65,
      deadline: "2025-01-30",
      category: "Academic",
    },
    {
      id: "2",
      title: "Score above 85% in IA",
      progress: 72,
      deadline: "2025-01-25",
      category: "Academic",
    },
  ])

  const [xpNotification, setXpNotification] = useState<string | null>(null)

  // 🔐 AUTH PROTECTION
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login")
    })
    return () => unsub()
  }, [router])

  // 🎮 SESSION COMPLETE → GIVE XP + STREAK
  const handleSessionComplete = async (xpGained: number) => {
    setXpNotification(`+${xpGained} XP!`)
    setTimeout(() => setXpNotification(null), 3000)

    if (!auth.currentUser) return

    const userRef = doc(db, "users", auth.currentUser.uid)
    const snap = await getDoc(userRef)
    if (!snap.exists()) return

    const data = snap.data()

    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

    const newStreak =
      data.lastActive === today
        ? data.streak
        : data.lastActive === yesterday
        ? data.streak + 1
        : 1

    await updateDoc(userRef, {
      xp: increment(xpGained),
      streak: newStreak,
      lastActive: today,
    })
  }

  const handleAddGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal])
  }

  const handleUpdateProgress = (id: string, progress: number) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, progress } : g)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              📚 Smart Planner
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline">← Back</Button>
            </Link>
            <Button
              variant="outline"
              onClick={async () => {
                await signOut(auth)
                router.push("/login")
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* XP POPUP */}
        {xpNotification && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full px-6 py-3 shadow-lg">
              {xpNotification}
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Study Session</h1>
          <p className="text-muted-foreground">
            Focus with Pomodoro technique and earn XP
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* TIMER */}
          <div className="lg:col-span-2">
            <StudyTimer onSessionComplete={() => handleSessionComplete(20)} />
          </div>

          {/* TIPS */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-6 border">
              <h4 className="font-bold mb-4">💡 Pomodoro Tips</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ No phone during session</li>
                <li>✓ Take small breaks</li>
                <li>✓ Drink water</li>
                <li>✓ Repeat 4 cycles</li>
              </ul>
            </div>
          </div>
        </div>

        {/* GOALS */}
        <GoalsSection
          goals={goals}
          onAddGoal={handleAddGoal}
          onUpdateProgress={handleUpdateProgress}
        />

        {/* FOOTER */}
        <div className="text-center py-8">
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3">
              Return to Dashboard
            </Button>
          </Link>
        </div>

      </main>
    </div>
  )
}
