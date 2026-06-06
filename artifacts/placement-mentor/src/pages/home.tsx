import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  BarChart, 
  BookOpen, 
  Target, 
  MessageSquare,
  Award,
  Video,
  Activity,
  Zap,
  Globe2,
  TrendingUp,
  Brain
} from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const features = [
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Personalized Placement Roadmap",
    description: "AI builds your 90-day plan based on your skills"
  },
  {
    icon: <Video className="w-6 h-6 text-primary" />,
    title: "AI Mock Interviews",
    description: "Practice with GPT-powered interviewers, get instant feedback"
  },
  {
    icon: <BarChart className="w-6 h-6 text-primary" />,
    title: "Skill Gap Analysis",
    description: "Know exactly what to learn and in what order"
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: "Resume Review",
    description: "AI reviews and scores your resume, suggests improvements"
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Project Recommendations",
    description: "Get project ideas matched to your target companies"
  },
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "Aptitude Preparation",
    description: "Quantitative, logical reasoning, verbal ability practice"
  },
  {
    icon: <Globe2 className="w-6 h-6 text-primary" />,
    title: "Telugu Language Support",
    description: "Learn in your native language, no barriers"
  },
  {
    icon: <Activity className="w-6 h-6 text-primary" />,
    title: "Daily Progress Tracking",
    description: "Streak system, daily goals, leaderboard"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              PlacementAI
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#success-stories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Success Stories</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium hover:underline hidden sm:inline-block">Sign In</Link>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-purple-500/20">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-background to-purple-100 dark:from-blue-900/20 dark:via-background dark:to-purple-900/20 -z-10" />
          
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 w-fit text-sm font-semibold">
                <Award className="w-4 h-4" />
                <span>1,200+ students placed this year</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Your AI Placement Mentor for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Career Success</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                From Tier-2 college to top tech company — get a personalized roadmap, AI mock interviews, and real mentorship to become placement-ready in 90 days.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:scale-105 transition-transform text-base h-12 px-8">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/assessment">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/50 text-base h-12 px-8">
                    Take Skill Assessment
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10"
            >
              <img 
                src="/hero.png" 
                alt="Students studying" 
                className="w-full h-auto object-cover aspect-[4/3] sm:aspect-video"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent mix-blend-overlay" />
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white dark:bg-zinc-950 border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Placement Success Rate", value: "94%" },
                { label: "Students Mentored", value: "12,000+" },
                { label: "Mock Interviews", value: "45,000+" },
                { label: "Roadmaps Generated", value: "8,500+" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 bg-gray-50/50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to crack top companies</h2>
              <p className="text-lg text-muted-foreground">Stop guessing what to learn. Get a structured path designed specifically for your current skill level.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="bg-background p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Your Path to Placement</h2>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                { step: 1, title: "Create Profile", desc: "Share your background and target roles" },
                { step: 2, title: "Take Assessment", desc: "Evaluate your current DSA & Dev skills" },
                { step: 3, title: "Get Roadmap", desc: "Receive your custom 90-day learning path" },
                { step: 4, title: "Practice", desc: "Do AI mock interviews and solve problems" },
                { step: 5, title: "Track Progress", desc: "Maintain your streak and level up" },
                { step: 6, title: "Get Placed", desc: "Ready for top tech company interviews" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section id="success-stories" className="py-24 bg-blue-50/50 dark:bg-blue-950/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">From Tier-2 to Top Tech</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  name: "Priya Sharma", college: "JNTU Hyderabad", company: "Amazon", 
                  quote: "Coming from a state university, I had no idea how to prepare for product companies. PlacementAI gave me the exact roadmap I needed.",
                  img: "/testimonial1.png"
                },
                { 
                  name: "Rahul Verma", college: "VIT Vellore", company: "TCS Digital", 
                  quote: "The AI mock interviews were a game-changer. They pointed out flaws in my communication I never noticed before.",
                  img: "/testimonial2.png"
                },
                { 
                  name: "Ananya Patel", college: "Amrita Coimbatore", company: "Accenture", 
                  quote: "I was overwhelmed by YouTube tutorials. Having a personalized 90-day plan kept me focused and accountable.",
                  img: "/testimonial3.png"
                }
              ].map((story, i) => (
                <div key={i} className="bg-background p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => <Target key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-muted-foreground italic mb-6">"{story.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img src={story.img} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold">{story.name}</h4>
                      <p className="text-xs text-muted-foreground">{story.college}</p>
                      <p className="text-xs font-semibold text-primary mt-0.5">Placed at {story.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Is this free to use?", a: "Yes, our core features including the basic roadmap and limited mock interviews are free. We offer a premium tier for unlimited AI interviews and advanced resume reviews." },
              { q: "How is this different from YouTube tutorials?", a: "YouTube gives you generic information. PlacementAI tests your actual skills and builds a personalized plan just for you, tracks your progress, and simulates real interview environments." },
              { q: "Does it work for non-CS students?", a: "Absolutely. We have specific roadmaps for ECE, EEE, and Mechanical students looking to transition into software roles." },
              { q: "How long until I see results?", a: "Most students who stick to their personalized daily goals see significant improvement in mock interview scores within 3-4 weeks." },
              { q: "What companies have students been placed in?", a: "Our students have secured offers from Amazon, TCS, Infosys, Wipro, Accenture, Cognizant, and various high-growth startups." },
              { q: "Is there Telugu language support?", a: "Yes! You can choose to have technical concepts explained in Telugu, Hindi, or English." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Placement Journey?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join thousands of students who have already secured their dream jobs using PlacementAI.</p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg h-14 px-8 shadow-xl">
                Get Started Free — No Credit Card Required
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 text-zinc-400 py-12 text-sm border-t border-zinc-800">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">P</span>
              </div>
              <span className="text-lg font-bold text-white">PlacementAI</span>
            </div>
            <p className="mb-4 max-w-xs">The career mentor that Tier-2/Tier-3 engineering students never had. Built with ❤️ for Indian students.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between">
          <p>© 2025 PlacementAI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white"><Globe2 className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
