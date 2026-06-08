import { Link } from "wouter";
import { motion } from "framer-motion";
import { Trophy, Flame, ArrowLeft, Medal, Crown, Star, TrendingUp, Target } from "lucide-react";
import { useProfile } from "@/hooks/use-profile";

const MOCK_LEADERS = [
  { rank: 1,  name: "Arjun Reddy",       college: "JNTU Hyderabad",      xp: 4820, streak: 34, interviews: 22, badge: "🏆", role: "DSA Track" },
  { rank: 2,  name: "Sneha Iyer",        college: "PSG Tech Coimbatore", xp: 4510, streak: 28, interviews: 19, badge: "🥈", role: "Frontend Track" },
  { rank: 3,  name: "Rohan Mishra",      college: "VIT Vellore",         xp: 4290, streak: 21, interviews: 17, badge: "🥉", role: "Backend Track" },
  { rank: 4,  name: "Divya Sharma",      college: "Amrita Bangalore",    xp: 3980, streak: 19, interviews: 15, badge: "⭐", role: "Full Stack" },
  { rank: 5,  name: "Karthik Nair",      college: "NIT Warangal",        xp: 3760, streak: 16, interviews: 14, badge: "⭐", role: "DSA Track" },
  { rank: 6,  name: "Priya Venkat",      college: "SRM Chennai",         xp: 3540, streak: 14, interviews: 13, badge: "⭐", role: "HR Track" },
  { rank: 7,  name: "Aakash Gupta",      college: "Manipal Udupi",       xp: 3310, streak: 12, interviews: 12, badge: "⭐", role: "Backend Track" },
  { rank: 8,  name: "Lakshmi Prasad",    college: "GITAM Vizag",         xp: 3120, streak: 11, interviews: 11, badge: "⭐", role: "Full Stack" },
  { rank: 9,  name: "Rahul Tiwari",      college: "Lovely Professional", xp: 2980, streak: 9,  interviews: 10, badge: "⭐", role: "DSA Track" },
  { rank: 10, name: "Ananya Krishnan",   college: "Amrita Coimbatore",   xp: 2760, streak: 8,  interviews: 9,  badge: "⭐", role: "Frontend Track" },
  { rank: 11, name: "Vikram Singh",      college: "BIT Mesra",           xp: 2550, streak: 7,  interviews: 8,  badge: "⭐", role: "Backend Track" },
  { rank: 12, name: "Meena Subramanian", college: "Sastra Thanjavur",    xp: 2380, streak: 6,  interviews: 7,  badge: "⭐", role: "HR Track" },
];

const podiumColors: Record<number, string> = {
  1: "from-yellow-400 to-amber-500",
  2: "from-slate-300 to-slate-400",
  3: "from-amber-600 to-amber-700",
};

const weeklyStats = [
  { label: "Mon", xp: 120 }, { label: "Tue", xp: 200 }, { label: "Wed", xp: 80 },
  { label: "Thu", xp: 260 }, { label: "Fri", xp: 180 }, { label: "Sat", xp: 320 }, { label: "Sun", xp: 140 },
];
const maxXP = Math.max(...weeklyStats.map(s => s.xp));

export default function Leaderboard() {
  const { profile, firstName } = useProfile();

  const you = profile ? {
    rank: 47,
    name: profile.name,
    college: profile.college,
    xp: 1240,
    streak: 7,
    interviews: 4,
    badge: "⭐",
    role: profile.targetRole || "General",
  } : null;

  const top3 = MOCK_LEADERS.slice(0, 3);

  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="h-5 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-lg">Leaderboard</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">

        {/* Podium — top 3 */}
        <section>
          <h2 className="text-center text-2xl font-extrabold mb-8 flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" /> This Week's Top Performers
          </h2>
          <div className="flex items-end justify-center gap-4">
            {[top3[1], top3[0], top3[2]].map((p, i) => {
              const visualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
              const heights = ["h-28", "h-36", "h-24"];
              return (
                <motion.div
                  key={p.rank}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2 flex-1 max-w-[180px]"
                >
                  <div className="text-3xl">{p.badge}</div>
                  <div className="text-center">
                    <p className="font-bold text-sm">{p.name.split(" ")[0]}</p>
                    <p className="text-xs text-muted-foreground">{p.college.split(" ")[0]}</p>
                    <p className="text-xs font-semibold text-primary mt-0.5">{p.xp.toLocaleString()} XP</p>
                  </div>
                  <div className={`w-full ${heights[i]} bg-gradient-to-t ${podiumColors[visualRank]} rounded-t-xl flex items-start justify-center pt-2`}>
                    <span className="text-white font-extrabold text-xl">#{visualRank}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Full Rankings */}
          <section className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2"><Medal className="w-5 h-5 text-yellow-500" /> All Rankings</h3>
              <span className="text-xs text-muted-foreground">Weekly XP</span>
            </div>

            {/* Your rank banner */}
            {you && (
              <div className="mx-4 my-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {firstName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-blue-700">{you.name} (You) — Rank #{you.rank}</p>
                  <p className="text-xs text-muted-foreground">{you.xp} XP · {you.streak} day streak</p>
                </div>
                <Link href="/assessment">
                  <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap">
                    Earn XP ↑
                  </button>
                </Link>
              </div>
            )}

            <div className="divide-y">
              {MOCK_LEADERS.map((p, i) => (
                <motion.div
                  key={p.rank}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 ${p.rank <= 3 ? `bg-gradient-to-br ${podiumColors[p.rank]} text-white` : "bg-gray-100 text-gray-500"}`}>
                    {p.rank <= 3 ? p.badge : `#${p.rank}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{p.college} · {p.role}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-primary">{p.xp.toLocaleString()} XP</p>
                    <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                      <Flame className="w-3 h-3 text-orange-400" />{p.streak}d · {p.interviews} interviews
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Right column */}
          <div className="space-y-5">
            {/* Your weekly XP chart */}
            {you && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-500" /> Your Weekly XP</h3>
                <div className="flex items-end gap-1.5 h-20">
                  {weeklyStats.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: i * 0.07, duration: 0.4 }}
                        style={{ height: `${(d.xp / maxXP) * 100}%` }}
                        className="w-full rounded-t-sm bg-gradient-to-t from-blue-500 to-purple-500 origin-bottom"
                      />
                      <span className="text-[10px] text-muted-foreground">{d.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">Total this week: <span className="font-bold text-foreground">1,300 XP</span></p>
              </div>
            )}

            {/* How to earn XP */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm p-5">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> How to Earn XP</h3>
              <ul className="space-y-3">
                {[
                  { action: "Complete Assessment", xp: "+50 XP", color: "text-blue-600" },
                  { action: "Finish Mock Interview", xp: "+80 XP", color: "text-purple-600" },
                  { action: "Daily Login Streak", xp: "+10 XP/day", color: "text-orange-600" },
                  { action: "Complete Roadmap Week", xp: "+120 XP", color: "text-green-600" },
                  { action: "Perfect Score (10/10)", xp: "+200 XP", color: "text-pink-600" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.action}</span>
                    <span className={`font-bold ${item.color}`}>{item.xp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick actions */}
            <div className="space-y-2">
              <Link href="/assessment">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
                  <Target className="w-4 h-4" /> Take Assessment (+50 XP)
                </button>
              </Link>
              <Link href="/mock-interview">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
                  <Trophy className="w-4 h-4" /> Mock Interview (+80 XP)
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
