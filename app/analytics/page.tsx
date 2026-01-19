"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

import { WeeklyProgressChart } from "@/components/WeeklyProgressChart"
import { Leaderboard } from "@/components/Leaderboard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AnalyticsPage() {
  const router = useRouter()

  const [timeframe, setTimeframe] = useState<"week" | "month" | "all">("week")

  const [weeklyData, setWeeklyData] = useState<any[]>([])
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])

  const [stats, setStats] = useState([
    { label: "Total XP Earned", value: "0", icon: "⭐", color: "from-primary to-primary/50" },
    { label: "Current Streak", value: "0", icon: "🔥", color: "from-orange-500 to-orange-600" },
    { label: "Tasks Completed", value: "0", icon: "✓", color: "from-success to-success/50" },
    { label: "Achievements", value: "0", icon: "🏆", color: "from-secondary to-secondary/50" },
  ])

  // 🔐 AUTH PROTECTION
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login")
    })
    return () => unsub()
  }, [router])

  // 📊 USER STATS
  useEffect(() => {
    const fetchStats = async () => {
      const user = auth.currentUser
      if (!user) return

      const q = query(collection(db, "tasks"), where("uid", "==", user.uid))
      const snap = await getDocs(q)

      let completed = 0

      snap.forEach((doc) => {
        if (doc.data().completed) completed++
      })

      const totalXP = completed * 10

      setStats([
        { label: "Total XP Earned", value: totalXP.toString(), icon: "⭐", color: "from-primary to-primary/50" },
        { label: "Current Streak", value: "Auto", icon: "🔥", color: "from-orange-500 to-orange-600" },
        { label: "Tasks Completed", value: completed.toString(), icon: "✓", color: "from-success to-success/50" },
        { label: "Achievements", value: completed >= 10 ? "1" : "0", icon: "🏆", color: "from-secondary to-secondary/50" },
      ])
    }

    fetchStats()
  }, [])

  // 📈 WEEKLY CHART DATA
  useEffect(() => {
    const loadWeekly = async () => {
      const user = auth.currentUser
      if (!user) return

      const q = query(collection(db, "tasks"), where("uid", "==", user.uid))
      const snap = await getDocs(q)

      const map: any = {}

      snap.forEach((d) => {
        const date = d.data().dueDate
        if (!map[date]) map[date] = 0
        if (d.data().completed) map[date]++
      })

      const data = Object.keys(map).slice(0, 7).map((d) => ({
        day: d,
        tasksCompleted: map[d],
        maxTasks: 5,
      }))

      setWeeklyData(data)
    }

    loadWeekly()
  }, [])

  // 🏆 LEADERBOARD
  useEffect(() => {
    const loadLeaderboard = async () => {
      const snap = await getDocs(collection(db, "users"))
      const data: any[] = []

      snap.forEach((d) => data.push(d.data()))

      data.sort((a, b) => (b.xp || 0) - (a.xp || 0))

      setLeaderboardData(data.slice(0, 5))
    }

    loadLeaderboard()
  }, [])

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
              <Button variant="outline" className="rounded-xl font-medium border-border hover:bg-muted/50 bg-transparent">
                ← Back to Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              className="rounded-xl font-medium border-border hover:bg-muted/50 bg-transparent"
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

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Analytics</h1>
          <p className="text-muted-foreground">Track your progress and compare with others</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className={`p-6 border-0 shadow-md bg-gradient-to-br ${stat.color}`}>
              <div className="text-white">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium opacity-90">{stat.label}</p>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* CHART */}
        <WeeklyProgressChart data={weeklyData} />

        {/* FILTER + LEADERBOARD */}
        <div className="space-y-4">
          <div className="flex gap-2">
            {(["week", "month", "all"] as const).map((tf) => (
              <Button
                key={tf}
                onClick={() => setTimeframe(tf)}
                variant={timeframe === tf ? "default" : "outline"}
                className={`rounded-xl font-medium transition-all ${
                  timeframe === tf
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                {tf === "week" ? "This Week" : tf === "month" ? "This Month" : "All Time"}
              </Button>
            ))}
          </div>

          <Leaderboard entries={leaderboardData} timeframe={timeframe} />
        </div>

        {/* INSIGHTS */}
        <Card className="p-6 border-0 shadow-md bg-gradient-to-br from-primary/10 to-secondary/10">
          <h3 className="text-lg font-bold text-foreground mb-4">📊 Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Best Day</p>
              <p className="text-xl font-bold text-foreground">Friday</p>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Average Completion</p>
              <p className="text-xl font-bold text-foreground">80%</p>
            </div>
            <div className="p-4 bg-white/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Rank Improvement</p>
              <p className="text-xl font-bold text-foreground">↑ 2 places</p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Keep pushing to reach the top!</p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl px-8 py-3">
              Continue Learning
            </Button>
          </Link>
        </div>

      </main>
    </div>
  )
}
