export function BoldData() {
  return (
    <div className="min-h-screen font-sans" style={{ background: "#fffbf5" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }} />
          <span className="font-black text-lg text-gray-900 tracking-tight">PlacementAI</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <span className="hover:text-gray-900 cursor-pointer">Features</span>
          <span className="hover:text-gray-900 cursor-pointer">Colleges</span>
          <span className="hover:text-gray-900 cursor-pointer">About</span>
        </div>
        <button className="px-5 py-2.5 rounded-full text-sm font-bold text-white" style={{ background: "#111" }}>
          Start free
        </button>
      </nav>

      {/* Hero — full-bleed stats layout */}
      <div className="px-10 pt-6 pb-0 flex gap-10 items-start">
        {/* Left — text + CTA */}
        <div className="flex-1 pt-4 max-w-xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-2">
              {["#6366f1", "#f97316", "#22c55e", "#ec4899"].map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ background: c }} />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-600">12,000+ students placed</span>
          </div>

          <h1 className="text-6xl font-black text-gray-900 leading-[1.0] mb-6">
            Your college<br />
            <span style={{ background: "linear-gradient(135deg, #f97316, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              name doesn't
            </span>
            <br />define you.
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-8">
            India's first AI mentor designed specifically for students at <strong className="text-gray-800">Tier-2, Tier-3 and Degree colleges</strong>. Get the prep that IIT students take for granted — available to everyone.
          </p>

          <div className="flex gap-3 mb-10">
            <button className="px-7 py-3.5 rounded-full font-bold text-white text-sm shadow-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #f97316, #ef4444)", boxShadow: "0 10px 30px rgba(249,115,22,0.35)" }}>
              Begin your journey →
            </button>
            <button className="px-7 py-3.5 rounded-full font-semibold text-gray-700 border-2 border-gray-200 text-sm hover:border-gray-400 transition-all">
              See success stories
            </button>
          </div>

          {/* Compact stats row */}
          <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
            {[
              { val: "90", unit: "days", label: "avg. to first offer" },
              { val: "500", unit: "+", label: "hiring partners" },
              { val: "4.9", unit: "★", label: "student rating" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-gray-900 leading-none">{s.val}<span className="text-xl text-gray-400">{s.unit}</span></div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — giant number feature block */}
        <div className="flex-shrink-0 w-80 space-y-4 pt-2">
          {[
            { num: "94%", label: "Placement rate", sub: "within 6 months of completing the program", color: "#f97316", bg: "#fff7ed" },
            { num: "#1", label: "For Tier-3 colleges", sub: "most recommended platform by placement officers", color: "#6366f1", bg: "#f5f3ff" },
            { num: "3×", label: "Higher salary", sub: "compared to unprepared peers from same college", color: "#22c55e", bg: "#f0fdf4" },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl p-5 border border-gray-100" style={{ background: item.bg }}>
              <div className="text-5xl font-black mb-1" style={{ color: item.color }}>{item.num}</div>
              <div className="font-bold text-gray-900 text-sm mb-0.5">{item.label}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee logos strip */}
      <div className="mt-8 border-t border-gray-100 py-5 px-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Students placed at</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>
        <div className="flex items-center gap-8 justify-center">
          {["Google", "Microsoft", "Wipro", "Infosys", "TCS", "Capgemini", "Cognizant", "Accenture"].map((co, i) => (
            <span key={i} className="text-sm font-bold text-gray-300">{co}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
