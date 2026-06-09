import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, FolderGit2, Github, ExternalLink, Star, Zap, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const recommended = [
  {
    title: "Student Expense Tracker",
    desc: "React + Firebase app to track monthly hostel and college expenses with charts.",
    tags: ["React", "Firebase", "Recharts"],
    difficulty: "Beginner",
    color: "from-blue-500 to-indigo-600",
    impact: "Great for Full Stack / Frontend roles",
  },
  {
    title: "Placement Portal Clone",
    desc: "Build a mini campus placement portal with job listings, applications, and status tracking.",
    tags: ["Node.js", "Express", "MongoDB"],
    difficulty: "Intermediate",
    color: "from-purple-500 to-pink-600",
    impact: "Shows real-world backend skills",
  },
  {
    title: "AI Interview Chatbot",
    desc: "A chatbot that asks you DSA questions and gives feedback using OpenAI API.",
    tags: ["Python", "FastAPI", "OpenAI"],
    difficulty: "Intermediate",
    color: "from-orange-500 to-rose-500",
    impact: "AI/ML + backend — high recruiter interest",
  },
  {
    title: "Resume Analyser CLI",
    desc: "CLI tool that reads a PDF resume and scores it for keywords and ATS compatibility.",
    tags: ["Python", "PDF parsing", "NLP"],
    difficulty: "Beginner",
    color: "from-green-500 to-teal-600",
    impact: "Perfect for Data / ML roles",
  },
  {
    title: "DSA Visualiser",
    desc: "Animated visualisation of sorting, tree traversal, and graph algorithms.",
    tags: ["React", "Canvas API", "Algorithms"],
    difficulty: "Advanced",
    color: "from-yellow-500 to-orange-600",
    impact: "Shows CS fundamentals mastery",
  },
  {
    title: "College ERP Mini-Module",
    desc: "Attendance, marks, and timetable management app for a college department.",
    tags: ["React", "Spring Boot", "MySQL"],
    difficulty: "Advanced",
    color: "from-teal-500 to-cyan-600",
    impact: "Full-stack — impressive scope",
  },
];

const myProjects = [
  { title: "My Portfolio Website", status: "Live", tags: ["React", "Tailwind"], link: "#" },
  { title: "Todo App", status: "In Progress", tags: ["Vue.js"], link: "#" },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <div className="h-5 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-lg">Project Ideas</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 max-w-5xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-3">Project Recommendations</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">Projects matched to your target role that will make recruiters notice your profile.</p>
        </div>

        {/* My Projects */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500" /> My Projects</h2>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90">
              <Plus className="w-4 h-4 mr-1" /> Add Project
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {myProjects.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors">
                <div>
                  <p className="font-semibold text-sm">{p.title}</p>
                  <div className="flex gap-1 mt-1">
                    {p.tags.map(t => <span key={t} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{t}</span>)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.status === "Live" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{p.status}</span>
                  <a href={p.link}><Github className="w-4 h-4 text-muted-foreground hover:text-foreground" /></a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended */}
        <section>
          <h2 className="font-bold text-xl mb-5 flex items-center gap-2"><Zap className="w-5 h-5 text-orange-500" /> AI-Recommended Projects for You</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommended.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${p.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-base leading-tight">{p.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 ${p.difficulty === "Beginner" ? "bg-green-100 text-green-700" : p.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{p.difficulty}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.tags.map(t => <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 rounded-lg px-3 py-2 mb-4">
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    {p.impact}
                  </div>
                  <Button size="sm" className={`w-full bg-gradient-to-r ${p.color} text-white hover:opacity-90`}>
                    <Github className="w-3.5 h-3.5 mr-1.5" /> Start Project
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
