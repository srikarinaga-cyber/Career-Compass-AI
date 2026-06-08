import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2, BarChart, BookOpen, Target, MessageSquare,
  Award, Video, Activity, Zap, Globe2, TrendingUp, Brain, ChevronRight, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useT, LANG_OPTIONS, type Lang } from "@/contexts/language-context";

function LanguageSwitcher() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const current = LANG_OPTIONS.find(l => l.code === t.lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white/80 hover:bg-gray-50 text-sm font-medium transition-all shadow-sm"
        aria-label="Change language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline text-xs text-muted-foreground">{current.native}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-10 z-50 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {LANG_OPTIONS.map(opt => (
                <button
                  key={opt.code}
                  onClick={() => { t.setLang(opt.code as Lang); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${t.lang === opt.code ? "bg-blue-50 font-semibold text-blue-700" : "text-foreground"}`}
                >
                  <span className="text-base">{opt.flag}</span>
                  <span>{opt.native}</span>
                  {t.lang === opt.code && <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-blue-600" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const t = useT();

  const features = [
    { icon: <Target className="w-6 h-6 text-primary" />, title: t.feat_0_title, description: t.feat_0_desc, link: "/onboarding" },
    { icon: <Video className="w-6 h-6 text-primary" />, title: t.feat_1_title, description: t.feat_1_desc, link: "/assessment" },
    { icon: <BarChart className="w-6 h-6 text-primary" />, title: t.feat_2_title, description: t.feat_2_desc, link: "/assessment" },
    { icon: <BookOpen className="w-6 h-6 text-primary" />, title: t.feat_3_title, description: t.feat_3_desc, link: "/dashboard" },
    { icon: <Zap className="w-6 h-6 text-primary" />, title: t.feat_4_title, description: t.feat_4_desc, link: "/dashboard" },
    { icon: <Brain className="w-6 h-6 text-primary" />, title: t.feat_5_title, description: t.feat_5_desc, link: "/assessment" },
    { icon: <Globe2 className="w-6 h-6 text-primary" />, title: t.feat_6_title, description: t.feat_6_desc, link: "/onboarding" },
    { icon: <Activity className="w-6 h-6 text-primary" />, title: t.feat_7_title, description: t.feat_7_desc, link: "/dashboard" },
  ];

  const steps = [
    { step: 1, title: t.hiw_0_title, desc: t.hiw_0_desc, cta: t.hiw_0_cta, link: "/onboarding", color: "from-blue-500 to-blue-600" },
    { step: 2, title: t.hiw_1_title, desc: t.hiw_1_desc, cta: t.hiw_1_cta, link: "/assessment", color: "from-indigo-500 to-indigo-600" },
    { step: 3, title: t.hiw_2_title, desc: t.hiw_2_desc, cta: t.hiw_2_cta, link: "/dashboard", color: "from-violet-500 to-violet-600" },
    { step: 4, title: t.hiw_3_title, desc: t.hiw_3_desc, cta: t.hiw_3_cta, link: "/assessment", color: "from-purple-500 to-purple-600" },
    { step: 5, title: t.hiw_4_title, desc: t.hiw_4_desc, cta: t.hiw_4_cta, link: "/dashboard", color: "from-fuchsia-500 to-fuchsia-600" },
    { step: 6, title: t.hiw_5_title, desc: t.hiw_5_desc, cta: t.hiw_5_cta, link: "/onboarding", color: "from-pink-500 to-rose-500" },
  ];

  const faqs = [
    { q: t.faq_0_q, a: t.faq_0_a }, { q: t.faq_1_q, a: t.faq_1_a },
    { q: t.faq_2_q, a: t.faq_2_a }, { q: t.faq_3_q, a: t.faq_3_a },
    { q: t.faq_4_q, a: t.faq_4_a }, { q: t.faq_5_q, a: t.faq_5_a },
  ];

  return (
    <div className="min-h-screen bg-white/50 backdrop-blur-[2px] text-foreground flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/75 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">PlacementAI</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav_features}</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav_howItWorks}</a>
            <a href="#success-stories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav_successStories}</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t.nav_faq}</a>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/dashboard" className="text-sm font-medium hover:underline hidden sm:inline-block">{t.nav_signIn}</Link>
            <Link href="/onboarding">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-purple-500/20 text-sm">
                {t.nav_getStarted}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/60 via-transparent to-purple-100/60 -z-10" />
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 w-fit text-sm font-semibold">
                <Award className="w-4 h-4" />
                <span>{t.hero_badge}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                {t.hero_heading} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t.hero_headingAccent}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">{t.hero_desc}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:scale-105 transition-transform text-base h-12 px-8">
                    {t.hero_cta1} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/assessment">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-blue-200 hover:bg-blue-50 text-base h-12 px-8">
                    {t.hero_cta2}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/30">
              <img src="/hero.png" alt="Students studying" className="w-full h-auto object-cover aspect-[4/3] sm:aspect-video" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent mix-blend-overlay" />
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white/80 border-y backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: t.stat_successRate, value: "94%" },
                { label: t.stat_mentored, value: "12,000+" },
                { label: t.stat_mockInterviews, value: "45,000+" },
                { label: t.stat_roadmaps, value: "8,500+" },
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
        <section id="features" className="py-24 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.feat_heading}</h2>
              <p className="text-lg text-muted-foreground">{t.feat_subheading}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <Link key={i} href={feature.link}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    data-testid={`card-feature-${i}`}
                    className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer h-full"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.common_getStarted} <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.hiw_heading}</h2>
              <p className="text-lg text-muted-foreground">{t.hiw_subheading}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 relative">
              {steps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                  data-testid={`card-step-${item.step}`}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-6 h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center text-xl font-extrabold mb-5 shadow-md`}>
                      {item.step}
                    </div>
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{item.desc}</p>
                    <Link href={item.link}>
                      <button
                        data-testid={`button-step-${item.step}`}
                        className={`mt-5 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${item.color} hover:opacity-90 hover:shadow-md transition-all flex items-center justify-center gap-2`}
                      >
                        {item.cta} <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                  {i % 3 !== 2 && (
                    <div className="hidden md:flex absolute top-10 -right-3 z-10 w-6 items-center justify-center">
                      <ChevronRight className="w-5 h-5 text-blue-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section id="success-stories" className="py-24 bg-white/40 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.success_heading}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Priya Sharma", college: "JNTU Hyderabad", company: "Amazon", quote: "Coming from a state university, I had no idea how to prepare for product companies. PlacementAI gave me the exact roadmap I needed.", img: "/testimonial1.png" },
                { name: "Rahul Verma", college: "VIT Vellore", company: "TCS Digital", quote: "The AI mock interviews were a game-changer. They pointed out flaws in my communication I never noticed before.", img: "/testimonial2.png" },
                { name: "Ananya Patel", college: "Amrita Coimbatore", company: "Accenture", quote: "I was overwhelmed by YouTube tutorials. Having a personalized 90-day plan kept me focused and accountable.", img: "/testimonial3.png" },
              ].map((story, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.faq_heading}</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white/80 backdrop-blur-sm rounded-xl border px-2">
                <AccordionTrigger className="text-left font-semibold px-4">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed px-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA Banner */}
        <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-24 -translate-y-24" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-32 translate-y-32" />
          <div className="container mx-auto max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.cta_heading}</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">{t.cta_desc}</p>
            <Link href="/onboarding">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg h-14 px-8 shadow-xl font-bold">
                {t.cta_btn}
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
            <p className="mb-4 max-w-xs">{t.footer_tagline}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer_product}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">{t.nav_features}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.nav_successStories}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t.footer_company}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2025 PlacementAI. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Globe2 className="w-4 h-4" />
            <span>English · తెలుగు · हिंदी · தமிழ்</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
