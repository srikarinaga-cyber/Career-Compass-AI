import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, Target, Users, Zap, Globe2, Award, BookOpen,
  Mail, ArrowRight, Star, Building2, GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Srikari",
    role: "Co-founder & CEO",
    bio: "On a mission to democratise placement prep for every student — Tier-2, Tier-3, and Degree college — across India.",
    avatar: "SK",
    gradient: "from-blue-500 to-indigo-600",
    linkedin: "#",
  },
  {
    name: "Bhavana",
    role: "Co-founder & Head of Product",
    bio: "Believes every student deserves a personalised mentor — not just students at NITs and IITs. Building for Bharat.",
    avatar: "BH",
    gradient: "from-purple-500 to-pink-600",
    linkedin: "#",
  },
  {
    name: "Namitha",
    role: "Lead Engineer",
    bio: "Full-stack engineer who built AI-powered feedback systems. Passionate about making tech education accessible to all.",
    avatar: "NM",
    gradient: "from-orange-500 to-rose-500",
    linkedin: "#",
  },
  {
    name: "Tulasi",
    role: "Head of Curriculum",
    bio: "Former placement coordinator who designed interview prep programs for Tier-2, Tier-3 & Degree colleges. Helped 800+ students get placed.",
    avatar: "TL",
    gradient: "from-green-500 to-teal-600",
    linkedin: "#",
  },
];

const milestones = [
  { year: "2022", title: "The Idea", desc: "Our founders — fresh graduates from Tier-2 colleges — met at a Hyderabad startup event and realised how broken placement prep was for non-IIT students." },
  { year: "2023", title: "First 100 Students", desc: "Launched a pilot with 3 colleges in Andhra Pradesh. 78 of the first 100 students got placed within 6 months." },
  { year: "2024", title: "AI Interview Engine", desc: "Launched the AI-powered mock interview system. Students could practise 24×7 without waiting for a mentor." },
  { year: "2025", title: "12,000+ Students", desc: "Expanded to 200+ colleges across Telangana, Andhra, Tamil Nadu and Maharashtra. 94% placement success rate." },
];

const values = [
  { icon: <Heart className="w-6 h-6" />, title: "Built for Bharat", desc: "We design for students from Tier-2, Tier-3 and Degree colleges — not just metros. Multi-language, mobile-first, affordable.", color: "from-pink-500 to-rose-600" },
  { icon: <Target className="w-6 h-6" />, title: "Personalised, Not Generic", desc: "No one-size-fits-all plans. Every student gets a roadmap built around their current skills and target company.", color: "from-blue-500 to-indigo-600" },
  { icon: <Zap className="w-6 h-6" />, title: "AI-First Learning", desc: "We use AI not as a buzzword but to give every student instant feedback — at a fraction of human mentor costs.", color: "from-yellow-500 to-orange-600" },
  { icon: <Globe2 className="w-6 h-6" />, title: "Language Inclusive", desc: "Technical concepts explained in Telugu, Hindi, Tamil and English. Your mother tongue should never be a barrier.", color: "from-green-500 to-teal-600" },
];

const stats = [
  { value: "12,000+", label: "Students Mentored", icon: <Users className="w-5 h-5" /> },
  { value: "200+", label: "Partner Colleges", icon: <Building2 className="w-5 h-5" /> },
  { value: "94%", label: "Placement Success Rate", icon: <Award className="w-5 h-5" /> },
  { value: "45,000+", label: "Mock Interviews Done", icon: <GraduationCap className="w-5 h-5" /> },
];

export default function About() {
  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <span className="font-bold text-lg">About Us</span>
          </div>
          <Link href="/onboarding">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 text-sm">
              Get Started Free
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-purple-50/80 -z-10" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 w-fit mx-auto text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" /> Our Story
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              We were the students who{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                didn't have a mentor.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              PlacementAI was founded by graduates from Tier-2 and Tier-3 colleges who figured out the placement game the hard way.
              We built the mentor we wished we had — and made it available to every student at Tier-2, Tier-3 and Degree colleges across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white/70 backdrop-blur-sm border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="flex justify-center mb-2 text-primary">{s.icon}</div>
                <h3 className="text-3xl font-extrabold text-primary">{s.value}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 text-white text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-x-20 translate-y-20" />
            <div className="relative z-10">
              <BookOpen className="w-10 h-10 mx-auto mb-4 text-blue-200" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                To give every engineering student in India — regardless of which college they attend, which city they're from,
                or which language they speak — a fair shot at a great career in technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What We Believe In</h2>
            <p className="text-muted-foreground text-lg">The principles that guide every feature we build.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/80 backdrop-blur-sm rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} text-white flex items-center justify-center mb-4 shadow-md`}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-6 pl-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-extrabold shrink-0 shadow-lg z-10">
                    {m.year}
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border p-5 flex-1 shadow-sm">
                    <h3 className="font-bold text-lg mb-1">{m.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Meet the Team</h2>
            <p className="text-muted-foreground text-lg">Tier-2 engineers and educators who've been in your shoes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/90 backdrop-blur-sm rounded-2xl border p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} text-white flex items-center justify-center text-xl font-extrabold mx-auto mb-4 shadow-md`}>
                  {member.avatar}
                </div>
                <h3 className="font-bold">{member.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <Star className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Join 12,000+ Students on Their Journey</h2>
          <p className="text-muted-foreground text-lg mb-8">It doesn't matter which college you're from. What matters is where you're going.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white h-12 px-8 text-base font-semibold hover:opacity-90 shadow-lg">
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/#faq">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Read FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="bg-zinc-950 text-zinc-400 py-6 text-sm text-center border-t border-zinc-800">
        <div className="flex items-center justify-center gap-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/assessment" className="hover:text-white transition-colors">Assessment</Link>
          <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1"><Mail className="w-3 h-3" /> Contact</Link>
        </div>
        <p className="mt-3">© 2025 PlacementAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
