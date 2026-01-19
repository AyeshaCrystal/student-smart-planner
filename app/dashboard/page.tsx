"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { onAuthStateChanged, signOut } from "firebase/auth"
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  increment,
  getDoc,
  setDoc,
} from "firebase/firestore"

import { auth, db } from "@/lib/firebase"

import { StudentStatsPanel } from "@/components/StudentStatsPanel"
import { AddTaskSection } from "@/components/AddTaskSection"
import { DailyChallengeCard } from "@/components/DailyChallengeCard"
import { TaskList } from "@/components/TaskList"
import { RewardsSection } from "@/components/RewardsSection"
import { Button } from "@/components/ui/button"

interface Task {
  id: string
  title: string
  subject: string
  dueDate: string
  priority: string
  completed: boolean
  isOverdue: boolean
}

export default function DashboardPage() {
  const router = useRouter()

  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState("all")

  const [studentStats, setStudentStats] = useState({
    name: "Student",
    level: "Beginner",
    points: 0,
    streak: 0,
    progressToNextLevel: 0,
  })

  const dailyChallengeTarget = 3

  // 🔐 AUTH PROTECTION
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login")
        return
      }

      // create user doc if not exists
      const ref = doc(db, "users", user.uid)
      const snap = await getDoc(ref)
      if (!snap.exists()) {
        await setDoc(ref, {
          name: user.email?.split("@")[0],
          xp: 0,
          streak: 0,
          lastActive: new Date().toISOString().split("T")[0],
        })
      }
    })

    return () => unsub()
  }, [router])

  // 📥 LOAD TASKS
  useEffect(() => {
    if (!auth.currentUser) return

    const q = query(
      collection(db, "tasks"),
      where("uid", "==", auth.currentUser.uid)
    )

    const unsub = onSnapshot(q, (snap) => {
      const list: Task[] = snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          title: data.title,
          subject: data.subject,
          dueDate: data.dueDate,
          priority: data.priority,
          completed: data.completed,
          isOverdue:
            !data.completed && new Date(data.dueDate) < new Date(),
        }
      })
      setTasks(list)
    })

    return () => unsub()
  }, [])

  // 📊 LOAD USER STATS
  useEffect(() => {
    const loadStats = async () => {
      if (!auth.currentUser) return

      const ref = doc(db, "users", auth.currentUser.uid)
      const snap = await getDoc(ref)
      if (!snap.exists()) return

      const data = snap.data()
      const level =
        data.xp >= 500 ? "Achiever" : data.xp >= 150 ? "Focused" : "Beginner"

      setStudentStats({
        name: data.name,
        level,
        points: data.xp,
        streak: data.streak,
        progressToNextLevel:
          level === "Beginner"
            ? (data.xp / 150) * 100
            : level === "Focused"
            ? ((data.xp - 150) / 350) * 100
            : 100,
      })
    }

    loadStats()
  }, [tasks])

  // ➕ ADD TASK
  const handleAddTask = async (newTask: {
    title: string
    subject: string
    dueDate: string
    priority: string
  }) => {
    if (!auth.currentUser) return

    await addDoc(collection(db, "tasks"), {
      ...newTask,
      completed: false,
      uid: auth.currentUser.uid,
    })
  }

  // ✅ COMPLETE TASK → XP + STREAK
  const handleToggleTask = async (id: string, completed: boolean) => {
    const ref = doc(db, "tasks", id)

    await updateDoc(ref, { completed: !completed })

    if (!completed && auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid)

      const today = new Date().toISOString().split("T")[0]
      const userSnap = await getDoc(userRef)
      if (!userSnap.exists()) return

      const data = userSnap.data()

      const streak =
        data.lastActive === today
          ? data.streak
          : data.lastActive ===
            new Date(Date.now() - 86400000).toISOString().split("T")[0]
          ? data.streak + 1
          : 1

      await updateDoc(userRef, {
        xp: increment(10),
        streak,
        lastActive: today,
      })
    }
  }

  // ❌ DELETE TASK
  const handleDeleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id))
  }

  const completedTasksCount = tasks.filter((t) => t.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            📚 Smart Planner
          </span>

          <div className="flex items-center gap-3">
            <Link href="/analytics">
              <Button variant="outline">📊 Analytics</Button>
            </Link>
            <Link href="/timer">
              <Button variant="outline">⏱️ Study Timer</Button>
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

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* STATS */}
        <StudentStatsPanel {...studentStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">

            <AddTaskSection onAddTask={handleAddTask} />

            <DailyChallengeCard
              challenge="Complete 3 study tasks today"
              currentProgress={completedTasksCount}
              targetProgress={dailyChallengeTarget}
              rewardPoints={50}
              completed={completedTasksCount >= dailyChallengeTarget}
            />
          </div>

          <div className="lg:col-span-1 space-y-4">

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 border">
              <h4 className="font-bold mb-3">Quick Stats</h4>
              <p>Total: {tasks.length}</p>
              <p>Completed: {completedTasksCount}</p>
              <p>Pending: {tasks.length - completedTasksCount}</p>
            </div>
          </div>
        </div>

        <TaskList
          tasks={tasks}
          onToggleTask={(id) => {
            const t = tasks.find((x) => x.id === id)
            if (t) handleToggleTask(id, t.completed)
          }}
          onDeleteTask={handleDeleteTask}
          onFilterChange={setFilter}
          activeFilter={filter}
        />

        <RewardsSection badges={[]} />

        <div className="text-center py-8">
          <Link href="/timer">
            <Button className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3">
              Start Study Session
            </Button>
          </Link>
        </div>

      </main>
    </div>
  )
}
