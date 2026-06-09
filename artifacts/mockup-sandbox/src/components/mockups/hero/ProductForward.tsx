export function ProductForward() {
  return (
    <div className="min-h-screen font-sans" style={{ background: "#f8f9ff" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }} />
          <span className="font-bold text-lg text-gray-900 tracking-tight">PlacementAI</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
          <span className="hover:text-gray-900 cursor-pointer">Features</span>
          <span className="hover:text-gray-900 cursor-pointer">Colleges</span>
          <span className="hover:text-gray-900 cursor-pointer">About</span>
        </div>
        <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
          Try for Free
        </button>
      </nav>

      {/* Hero */}
      <div className="container mx-auto px-6 pt-10 pb-0">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-5">
            🎓 Built for Tier-2 · Tier-3 · Degree Colleges
          </div>
          <h1 className="text-5xl font-black text-gray-900 leading-tight mb-4">
            Your AI Mentor. <span style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Your Dream Job.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-7">
            Get a personalised roadmap, AI mock interviews and real-time feedback — built for every Indian college student.
          </p>
          <div className="flex justify-center gap-3 mb-8">
            <button className="px-7 py-3 rounded-xl font-bold text-white text-sm shadow-lg hover:shadow-xl transition-all" style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
              Get your roadmap →
            </button>
            <button className="px-7 py-3 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 text-sm hover:border-gray-300 transition-all">
              See how it works
            </button>
          </div>
        </div>

        {/* Dashboard Preview — the centerpiece */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60" style={{ background: "linear-gradient(135deg, #f0f4ff, #faf5ff)" }}>
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-200 bg-white/70">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-gray-100 text-xs text-gray-400 text-center">placementai.in/dashboard</div>
            </div>
            {/* Dashboard UI Mock */}
            <div className="flex" style={{ minHeight: "380px" }}>
              {/* Sidebar */}
              <div className="w-44 bg-white/60 border-r border-gray-200 p-4 shrink-0">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold">S</div>
                  <div>
                    <div className="text-xs font-semibold text-gray-800">Srikari</div>
                    <div className="text-xs text-gray-400">SDE Track</div>
                  </div>
                </div>
                {[
                  { label: "Dashboard", active: true },
                  { label: "My Roadmap" },
                  { label: "Mock Interview" },
                  { label: "Assessment" },
                  { label: "Projects" },
                  { label: "Resume" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 px-2.5 py-2 rounded-lg mb-1 text-xs font-medium ${item.active ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:bg-gray-50"}`}>
                    <div className={`w-4 h-4 rounded-sm ${item.active ? "bg-indigo-200" : "bg-gray-200"}`} />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5">
                {/* Top stats */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: "XP Points", val: "2,450", color: "#6366f1" },
                    { label: "Streak", val: "7 days 🔥", color: "#f97316" },
                    { label: "Assessments", val: "12/20", color: "#22c55e" },
                    { label: "Mock Interviews", val: "5 done", color: "#a855f7" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                      <div className="text-base font-bold" style={{ color: stat.color }}>{stat.val}</div>
                    </div>
                  ))}
                </div>

                {/* Roadmap progress */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-bold text-gray-800">Your SDE Roadmap</div>
                    <div className="text-xs text-indigo-600 font-semibold">38% complete</div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
                    <div className="h-full rounded-full w-[38%]" style={{ background: "linear-gradient(90deg, #6366f1, #a855f7)" }} />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["DSA Basics ✓", "OOPS ✓", "Databases →", "System Design", "Interviews"].map((step, i) => (
                      <span key={i} className={`text-xs px-2.5 py-1 rounded-full ${i < 2 ? "bg-green-100 text-green-700" : i === 2 ? "bg-indigo-100 text-indigo-700 font-semibold" : "bg-gray-100 text-gray-400"}`}>{step}</span>
                    ))}
                  </div>
                </div>

                {/* Recent activity */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="text-sm font-bold text-gray-800 mb-2">Today's Tasks</div>
                  {[
                    { task: "Complete Array Problems (Day 8)", done: true },
                    { task: "Mock Interview: System Design", done: false },
                    { task: "Update Resume with project links", done: false },
                  ].map((t, i) => (
                    <div key={i} className={`flex items-center gap-2 py-1.5 text-xs ${t.done ? "text-gray-400 line-through" : "text-gray-700"}`}>
                      <div className={`w-3.5 h-3.5 rounded border-2 shrink-0 flex items-center justify-center ${t.done ? "border-green-400 bg-green-400" : "border-gray-300"}`}>
                        {t.done && <span className="text-white" style={{ fontSize: "8px" }}>✓</span>}
                      </div>
                      {t.task}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust line */}
          <p className="text-center text-xs text-gray-400 mt-4 pb-6">
            Trusted by 12,000+ students from 200+ Tier-2, Tier-3 and Degree colleges across India
          </p>
        </div>
      </div>
    </div>
  );
}
