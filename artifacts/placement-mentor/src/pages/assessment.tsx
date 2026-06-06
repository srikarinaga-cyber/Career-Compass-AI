import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Brain, MessageSquare, Calculator, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Assessment() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950 flex flex-col font-sans">
      <header className="h-16 border-b bg-white dark:bg-zinc-900 flex items-center px-4 md:px-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium text-sm transition-colors">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Let's find your skill level</h1>
            <p className="text-muted-foreground text-lg">We need to assess your current knowledge to build your personalized 90-day placement roadmap.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { title: "Technical Skills", desc: "DSA & Core CS concepts", icon: <Database className="w-6 h-6 text-primary" />, color: "border-primary hover:bg-primary/5" },
              { title: "Communication", desc: "Verbal & Written English", icon: <MessageSquare className="w-6 h-6 text-purple-500" />, color: "hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10" },
              { title: "Aptitude", desc: "Quants & Logical Reasoning", icon: <Calculator className="w-6 h-6 text-orange-500" />, color: "hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10" },
              { title: "Domain Knowledge", desc: "Web, Mobile or Data", icon: <Brain className="w-6 h-6 text-green-500" />, color: "hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/10" },
            ].map((cat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
              >
                <Card className={`cursor-pointer transition-all border-2 border-transparent bg-white dark:bg-zinc-900 ${cat.color} shadow-sm hover:shadow-md`}>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="mt-1">{cat.icon}</div>
                    <div>
                      <h3 className="font-bold mb-1">{cat.title}</h3>
                      <p className="text-sm text-muted-foreground">{cat.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Assessment Time</span>
                <span>~25 mins</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-full w-1/4 rounded-full" />
              </div>
            </div>
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg h-12 px-8">
              Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
}
