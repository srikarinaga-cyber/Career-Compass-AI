import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Circle, Lock, ChevronDown, ChevronUp, BookOpen, Code2, MessageSquare, Briefcase, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks/use-profile";

type TaskStatus = "done" | "current" | "locked";
type Task = { title: string; status: TaskStatus };
type Week = { week: number; title: string; icon: React.ReactNode; color: string; border: string; bg: string; tasks: Task[]; phase: string };

const WEEKS: Week[] = [
  {
    week: 1, title: "Foundation & Assessment", phase: "Phase 1: Foundations",
    icon: <BookOpen className="w-5 h-5" />, color: "text-blue-600", border: "border-blue-200", bg: "bg-blue-50",
    tasks: [
      { title: "Complete skill assessment (DSA + Communication + Aptitude)", status: "done" },
      { title: "Set up development environment (VS Code, Git, Node)", status: "done" },
      { title: "Solve 10 easy LeetCode array problems", status: "done" },
      { title: "Read: How Tech Hiring Works", status: "done" },
    ],
  },
  {
    week: 2, title: "Data Structures Basics", phase: "Phase 1: Foundations",
    icon: <Code2 className="w-5 h-5" />, color: "text-indigo-600", border: "border-indigo-200", bg: "bg-indigo-50",
    tasks: [
      { title: "Arrays & Strings — 15 medium problems", status: "done" },
      { title: "Linked Lists — reverse, detect cycle, merge", status: "done" },
      { title: "Stacks & Queues — implementation + 10 problems", status: "current" },
      { title: "Watch: Neetcode 150 playlist (Arrays section)", status: "current" },
    ],
  },
  {
    week: 3, title: "Trees & Recursion", phase: "Phase 1: Foundations",
    icon: <Code2 className="w-5 h-5" />, color: "text-violet-600", border: "border-violet-200", bg: "bg-violet-50",
    tasks: [
      { title: "Binary Trees — traversals, height, diameter", status: "current" },
      { title: "BST — insert, delete, search, validate", status: "locked" },
      { title: "Recursion patterns — 10 problems", status: "locked" },
      { title: "First mock interview: DSA Round 1", status: "locked" },
    ],
  },
  {
    week: 4, title: "Graphs & Hashing", phase: "Phase 1: Foundations",
    icon: <Code2 className="w-5 h-5" />, color: "text-purple-600", border: "border-purple-200", bg: "bg-purple-50",
    tasks: [
      { title: "Graphs — BFS, DFS, cycle detection", status: "locked" },
      { title: "Hash Maps & Sets — 15 problems", status: "locked" },
      { title: "Two pointers & Sliding Window — 10 problems", status: "locked" },
      { title: "Aptitude practice — Percentages & Ratios", status: "locked" },
    ],
  },
  {
    week: 5, title: "Dynamic Programming Intro", phase: "Phase 2: Advanced DSA",
    icon: <Zap className="w-5 h-5" />, color: "text-fuchsia-600", border: "border-fuchsia-200", bg: "bg-fuchsia-50",
    tasks: [
      { title: "DP Fundamentals — memoization vs tabulation", status: "locked" },
      { title: "Classic DP: Fibonacci, Knapsack, LCS", status: "locked" },
      { title: "DP on strings — 10 problems", status: "locked" },
      { title: "Mock interview: DSA Round 2 (Trees + DP)", status: "locked" },
    ],
  },
  {
    week: 6, title: "Resume & Projects", phase: "Phase 2: Advanced DSA",
    icon: <Briefcase className="w-5 h-5" />, color: "text-rose-600", border: "border-rose-200", bg: "bg-rose-50",
    tasks: [
      { title: "Build Project 1: Real-time Chat App", status: "locked" },
      { title: "Write resume (AI-reviewed draft)", status: "locked" },
      { title: "Create LinkedIn profile", status: "locked" },
      { title: "Aptitude: Time & Work, Speed & Distance", status: "locked" },
    ],
  },
  {
    week: 7, title: "System Design Basics", phase: "Phase 2: Advanced DSA",
    icon: <Code2 className="w-5 h-5" />, color: "text-orange-600", border: "border-orange-200", bg: "bg-orange-50",
    tasks: [
      { title: "How to design scalable systems (URL shortener)", status: "locked" },
      { title: "Databases: SQL vs NoSQL, indexing", status: "locked" },
      { title: "Caching, Load Balancing, CDN basics", status: "locked" },
      { title: "Design: Twitter feed / Instagram stories", status: "locked" },
    ],
  },
  {
    week: 8, title: "Communication & Soft Skills", phase: "Phase 3: Interview Ready",
    icon: <MessageSquare className="w-5 h-5" />, color: "text-teal-600", border: "border-teal-200", bg: "bg-teal-50",
    tasks: [
      { title: "STAR method for behavioural answers", status: "locked" },
      { title: "Practise: Tell me about yourself (5 takes)", status: "locked" },
      { title: "Email writing & professional communication", status: "locked" },
      { title: "Mock HR interview — full round", status: "locked" },
    ],
  },
  {
    week: 9, title: "Project 2 & Portfolio", phase: "Phase 3: Interview Ready",
    icon: <Briefcase className="w-5 h-5" />, color: "text-cyan-600", border: "border-cyan-200", bg: "bg-cyan-50",
    tasks: [
      { title: "Build Project 2: E-commerce Dashboard", status: "locked" },
      { title: "Deploy both projects to Vercel/Railway", status: "locked" },
      { title: "Write project descriptions for resume", status: "locked" },
      { title: "Peer code review + refactoring", status: "locked" },
    ],
  },
  {
    week: 10, title: "Company-Specific Prep", phase: "Phase 3: Interview Ready",
    icon: <Briefcase className="w-5 h-5" />, color: "text-green-600", border: "border-green-200", bg: "bg-green-50",
    tasks: [
      { title: "Research target companies (TCS, Infosys, Amazon)", status: "locked" },
      { title: "Solve company-specific LeetCode tagged problems", status: "locked" },
      { title: "Full mock interview: Technical + HR", status: "locked" },
      { title: "Apply to 10 companies on Naukri/LinkedIn", status: "locked" },
    ],
  },
  {
    week: 11, title: "Mock Interview Sprint", phase: "Phase 3: Interview Ready",
    icon: <MessageSquare className="w-5 h-5" />, color: "text-blue-600", border: "border-blue-200", bg: "bg-blue-50",
    tasks: [
      { title: "3 full mock interviews (DSA + System Design + HR)", status: "locked" },
      { title: "Review weak areas from mock interviews", status: "locked" },
      { title: "Aptitude final revision", status: "locked" },
      { title: "Update resume based on feedback", status: "locked" },
    ],
  },
  {
    week: 12, title: "Final Prep & Placements", phase: "Phase 3: Interview Ready",
    icon: <Zap className="w-5 h-5" />, color: "text-purple-600", border: "border-purple-200", bg: "bg-purple-50",
    tasks: [
      { title: "Revise all DSA patterns (cheat sheet)", status: "locked" },
      { title: "Final HR prep — salary negotiation tips", status: "locked" },
      { title: "Submit applications to remaining target companies", status: "locked" },
      { title: "You are PLACEMENT READY! 🎉", status: "locked" },
    ],
  },
];

const PHASES = ["Phase 1: Foundations", "Phase 2: Advanced DSA", "Phase 3: Interview Ready"];

const totalTasks = WEEKS.flatMap(w => w.tasks).length;
const doneTasks = WEEKS.flatMap(w => w.tasks).filter(t => t.status === "done").length;
const overallProgress = Math.round((doneTasks / totalTasks) * 100);
const currentWeek = WEEKS.find(w => w.tasks.some(t => t.status === "current"))?.week ?? 1;

export default function Roadmap() {
  const { profile, firstName } = useProfile();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(currentWeek);
  const [activePhase, setActivePhase] = useState(0);

  const phaseWeeks = WEEKS.filter(w => w.phase === PHASES[activePhase]);

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      <header className="h-16 border-b bg-white/80 backdrop-blur-md dark:bg-zinc-900 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
        <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium text-sm transition-colors" data-testid="link-back-dashboard">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">My Roadmap</span>
        </div>
        <div className="w-24" />
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full">
        {/* Overall Progress */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-xl font-bold">{firstName ? `${firstName}'s` : "Your"} 90-Day Roadmap</h1>
                <p className="text-blue-100 text-sm">Week {currentWeek} of 12 · {overallProgress}% complete</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center text-2xl font-extrabold">
                {overallProgress}%
              </div>
            </div>
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div className="bg-white h-full rounded-full transition-all" style={{ width: `${overallProgress}%` }} />
            </div>
            {profile?.college && (
              <p className="text-blue-100 text-xs mt-2">{profile.college} · {profile.targetRole || "Software Engineer"}</p>
            )}
          </CardContent>
        </Card>

        {/* Phase Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {PHASES.map((phase, i) => (
            <button
              key={i}
              onClick={() => setActivePhase(i)}
              data-testid={`button-phase-${i}`}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap border-2 transition-all ${activePhase === i ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-md" : "bg-white/80 text-muted-foreground border-gray-200 hover:border-blue-300"}`}
            >
              {phase}
            </button>
          ))}
        </div>

        {/* Week Cards */}
        <div className="space-y-3">
          {phaseWeeks.map((week) => {
            const weekDone = week.tasks.filter(t => t.status === "done").length;
            const isExpanded = expandedWeek === week.week;
            const isCurrent = week.tasks.some(t => t.status === "current");
            const isLocked = week.tasks.every(t => t.status === "locked");

            return (
              <motion.div key={week.week} layout>
                <Card className={`border-2 transition-all ${isCurrent ? `${week.border} shadow-md` : isLocked ? "border-gray-100 opacity-75" : "border-green-200"} bg-white/90`}>
                  <button
                    className="w-full text-left"
                    onClick={() => setExpandedWeek(isExpanded ? null : week.week)}
                    data-testid={`button-week-${week.week}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isCurrent ? week.bg : isLocked ? "bg-gray-100" : "bg-green-100"} ${isCurrent ? week.color : isLocked ? "text-gray-400" : "text-green-600"}`}>
                          {isLocked ? <Lock className="w-4 h-4" /> : week.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-semibold text-muted-foreground">Week {week.week}</span>
                            {isCurrent && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Current</span>}
                            {!isLocked && !isCurrent && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Completed</span>}
                          </div>
                          <h3 className="font-bold text-sm">{week.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={(weekDone / week.tasks.length) * 100} className="h-1 flex-1" />
                            <span className="text-xs text-muted-foreground shrink-0">{weekDone}/{week.tasks.length}</span>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                      </div>
                    </CardContent>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t pt-3 space-y-2">
                          {week.tasks.map((task, i) => (
                            <div key={i} className={`flex items-start gap-3 p-2.5 rounded-lg ${task.status === "current" ? `${week.bg}` : task.status === "done" ? "bg-green-50" : "bg-gray-50"}`}>
                              {task.status === "done" ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                              ) : task.status === "current" ? (
                                <div className={`w-4 h-4 rounded-full border-2 ${week.border} shrink-0 mt-0.5 flex items-center justify-center`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${week.color.replace("text-", "bg-")}`} />
                                </div>
                              ) : (
                                <Circle className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                              )}
                              <span className={`text-sm ${task.status === "done" ? "line-through text-muted-foreground" : task.status === "locked" ? "text-gray-400" : "font-medium"}`}>
                                {task.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
