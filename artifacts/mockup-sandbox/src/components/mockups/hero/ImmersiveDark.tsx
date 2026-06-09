export function ImmersiveDark() {
  return (
    <div className="min-h-screen font-sans overflow-hidden relative flex flex-col" style={{ background: "#0a0a0f" }}>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-25" style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }} />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #f97316, transparent 70%)" }} />
        {/* Grid overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg" style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }} />
          <span className="text-white font-bold text-lg tracking-tight">PlacementAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <span className="hover:text-white cursor-pointer transition-colors">Features</span>
          <span className="hover:text-white cursor-pointer transition-colors">How it works</span>
          <span className="hover:text-white cursor-pointer transition-colors">About</span>
        </div>
        <button className="px-5 py-2 rounded-full text-sm font-semibold text-white border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all">
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-gray-300 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          12,000+ students placed from Tier-2, Tier-3 & Degree colleges
        </div>

        <h1 className="text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 max-w-4xl">
          Your FAANG dream
          <br />
          <span style={{ background: "linear-gradient(90deg, #6366f1, #ec4899, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            doesn't need an IIT tag.
          </span>
        </h1>

        <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
          PlacementAI is the personal mentor built for students at Tier-2, Tier-3 and Degree colleges across India — with AI mock interviews, personalised roadmaps and real placement support.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button className="px-8 py-4 rounded-full text-base font-bold text-white transition-all hover:scale-105 hover:shadow-2xl" style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)", boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}>
            Start for free →
          </button>
          <button className="px-8 py-4 rounded-full text-base font-semibold text-gray-300 border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all">
            Watch demo ▶
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
          {[
            { val: "94%", label: "Placement rate" },
            { val: "12K+", label: "Students placed" },
            { val: "500+", label: "Companies" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-black text-white mb-1">{s.val}</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />
    </div>
  );
}
