import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Mic, RotateCcw, CheckCircle2, Clock, Star, ChevronRight, Play, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks/use-profile";

type Role = { id: string; label: string; color: string; bg: string; icon: string; desc: string };
const ROLES: Role[] = [
  { id: "frontend", label: "Frontend Dev", color: "text-blue-600", bg: "bg-blue-50 border-blue-200", icon: "🖥️", desc: "React, HTML/CSS, JS, Accessibility" },
  { id: "backend", label: "Backend Dev", color: "text-green-600", bg: "bg-green-50 border-green-200", icon: "⚙️", desc: "APIs, Databases, System Design" },
  { id: "dsa", label: "DSA Round", color: "text-purple-600", bg: "bg-purple-50 border-purple-200", icon: "🧠", desc: "Arrays, Trees, DP, Graphs" },
  { id: "hr", label: "HR Round", color: "text-orange-600", bg: "bg-orange-50 border-orange-200", icon: "🤝", desc: "Behavioural, Situational, Culture fit" },
];

type Question = { q: string; hint: string; ideal: string };
const QUESTIONS: Record<string, Question[]> = {
  frontend: [
    { q: "What is the difference between == and === in JavaScript?", hint: "Think about type coercion.", ideal: "== performs type coercion before comparison (e.g., '5' == 5 is true), while === checks both value and type without coercion ('5' === 5 is false). Always prefer === to avoid unexpected bugs." },
    { q: "Explain the concept of 'closure' in JavaScript with an example.", hint: "Think about functions within functions and variable scope.", ideal: "A closure is a function that retains access to its outer scope even after the outer function has returned. Example: a counter function that uses a local variable — each call to the inner function still accesses that variable even after the outer function is done." },
    { q: "What is the virtual DOM and how does React use it?", hint: "Think about performance and diffing.", ideal: "The virtual DOM is a lightweight in-memory representation of the actual DOM. React creates a virtual DOM tree, compares it with the previous version (diffing), and only updates the real DOM where changes occurred, making updates efficient." },
    { q: "How would you optimize the performance of a React application?", hint: "Think about re-renders, lazy loading, and memoization.", ideal: "Use React.memo to prevent unnecessary re-renders, useMemo/useCallback for expensive computations, code-split with lazy/Suspense, avoid anonymous functions in renders, use proper key props in lists, and profile with React DevTools." },
    { q: "What is CSS specificity and how is it calculated?", hint: "Think about the hierarchy of selectors.", ideal: "Specificity determines which CSS rule applies when multiple rules target the same element. It is calculated as (inline styles, ID selectors, class/attribute selectors, element selectors). Higher specificity wins. !important overrides everything." },
  ],
  backend: [
    { q: "What is the difference between REST and GraphQL?", hint: "Think about data fetching, over-fetching, and under-fetching.", ideal: "REST uses fixed endpoints returning predefined data shapes, which can lead to over- or under-fetching. GraphQL uses a single endpoint where clients specify exactly what data they need, reducing unnecessary data transfer but adding query complexity." },
    { q: "Explain database indexing and when you would use it.", hint: "Think about read vs write trade-offs.", ideal: "An index is a data structure that speeds up data retrieval on a column at the cost of extra storage and slower writes. Use indexes on columns frequently used in WHERE, JOIN, or ORDER BY clauses, but avoid over-indexing on tables with frequent INSERT/UPDATE operations." },
    { q: "What is the CAP theorem?", hint: "Think about distributed systems and trade-offs.", ideal: "CAP theorem states that a distributed system can only guarantee two of three: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition tolerance (system works despite network failures). Since partition tolerance is unavoidable, systems trade off between CP (e.g., HBase) and AP (e.g., Cassandra)." },
    { q: "How would you design a URL shortener service?", hint: "Think about hashing, storage, and scale.", ideal: "Use a hash function (e.g., Base62 encoding of an auto-incrementing ID) to generate a short code. Store the mapping in a database with the original URL. Add a cache (Redis) for frequently accessed URLs. Use a load balancer for scale, and handle collisions in the hash generation." },
    { q: "What are the ACID properties in databases?", hint: "Think about transactions.", ideal: "ACID stands for: Atomicity (a transaction is all-or-nothing), Consistency (data always stays valid), Isolation (concurrent transactions don't interfere), and Durability (committed data is permanent even after crashes). These properties ensure reliable database transactions." },
  ],
  dsa: [
    { q: "Given an array of integers, find two numbers that add up to a target sum.", hint: "Think about a hash map approach — O(n) time.", ideal: "Use a hash set/map: iterate through the array, for each element check if (target - element) exists in the map. If yes, return both numbers. If no, add the element to the map. This achieves O(n) time and O(n) space, much better than O(n²) brute force." },
    { q: "Explain the difference between BFS and DFS and when to use each.", hint: "Think about use cases: shortest path vs exploring all paths.", ideal: "BFS (Breadth-First Search) uses a queue and explores level by level — ideal for finding shortest paths in unweighted graphs. DFS (Depth-First Search) uses a stack/recursion and explores as far as possible — ideal for cycle detection, topological sort, and solving puzzles." },
    { q: "What is dynamic programming? Give an example.", hint: "Think about overlapping subproblems and optimal substructure.", ideal: "DP solves complex problems by breaking them into overlapping subproblems and storing results to avoid recomputation (memoization or tabulation). Example: Fibonacci — instead of recursive O(2^n), store computed values and achieve O(n). Other examples: knapsack, longest common subsequence." },
    { q: "Reverse a linked list in-place.", hint: "Think about keeping track of previous, current, and next pointers.", ideal: "Use three pointers: prev=null, curr=head, next=null. In each iteration: save next=curr.next, set curr.next=prev, move prev=curr, curr=next. When curr is null, prev is the new head. Time O(n), Space O(1)." },
    { q: "What is the time complexity of quicksort in average and worst case?", hint: "Think about pivot selection.", ideal: "Average case is O(n log n) when the pivot consistently divides the array into roughly equal halves. Worst case is O(n²) when the pivot is always the smallest or largest element (already sorted array with first/last as pivot). Randomized pivot selection helps avoid the worst case." },
  ],
  hr: [
    { q: "Tell me about yourself.", hint: "Structure: past (background) → present (current skills/role) → future (why this company).", ideal: "Start with your academic background and branch, mention key technical skills you've developed, highlight a relevant project or achievement, and end with what excites you about this company/role. Keep it under 2 minutes and practice it until it sounds natural." },
    { q: "Describe a time you faced a difficult challenge and how you overcame it.", hint: "Use the STAR method: Situation, Task, Action, Result.", ideal: "Use STAR: Describe the Situation briefly, your Task/responsibility, the specific Actions you took (this is the most important part — be specific), and the Result with measurable outcomes if possible. Choose a real example that shows problem-solving, resilience, or teamwork." },
    { q: "Where do you see yourself in 5 years?", hint: "Show ambition but align with the company's growth opportunities.", ideal: "Show that you want to grow technically (e.g., 'become a strong full-stack developer'), take on more responsibility, and eventually contribute as a senior engineer or tech lead. Tie your growth to the company's mission — it shows you've researched them and are serious." },
    { q: "Why do you want to work at this company specifically?", hint: "Research the company beforehand — mention specific products, culture, or values.", ideal: "Show genuine research: mention a specific product you admire, a company value that resonates with you, or a recent news item about their growth/impact. Then tie it back to how your skills and goals align. Generic answers like 'for growth' are red flags." },
    { q: "What is your greatest weakness?", hint: "Be honest but show self-awareness and growth.", ideal: "Choose a real weakness but frame it as something you're actively improving. Avoid clichés like 'I work too hard.' Example: 'I used to struggle with public speaking, so I joined my college tech fest as an MC and gave two internal presentations this year. I'm still improving but it's much better.' Shows self-awareness + growth mindset." },
  ],
};

type Stage = "select" | "interview" | "result";
type FeedbackEntry = { question: string; answer: string; score: number; tip: string };

function scoreFeedback(answer: string, ideal: string): { score: number; tip: string } {
  const words = answer.trim().split(/\s+/).filter(Boolean).length;
  if (words < 10) return { score: 3, tip: "Your answer is too short. Try to explain your reasoning with at least 2-3 sentences." };
  if (words < 30) return { score: 5, tip: "Good start! Add a concrete example or explain the 'why' behind your answer." };
  if (words < 60) return { score: 7, tip: "Solid answer. Consider structuring it with a real-world example for maximum impact." };
  return { score: 9, tip: "Excellent, detailed answer! You covered the concept well." };
}

export default function MockInterview() {
  const { profile, firstName } = useProfile();
  const [stage, setStage] = useState<Stage>("select");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
  const [showIdeal, setShowIdeal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const role = selectedRole;
  const questions = role ? QUESTIONS[role.id] : [];
  const currentQ = questions[qIndex];
  const progress = questions.length > 0 ? Math.round(((qIndex) / questions.length) * 100) : 0;

  const startInterview = (r: Role) => {
    setSelectedRole(r);
    setQIndex(0);
    setAnswer("");
    setFeedbacks([]);
    setShowIdeal(false);
    setSubmitted(false);
    setStage("interview");
  };

  const handleSubmit = () => {
    if (!answer.trim() || !currentQ || !role) return;
    const { score, tip } = scoreFeedback(answer, currentQ.ideal);
    setFeedbacks(prev => [...prev, { question: currentQ.q, answer, score, tip }]);
    setSubmitted(true);
    setShowIdeal(true);
  };

  const handleNext = () => {
    setAnswer("");
    setShowIdeal(false);
    setSubmitted(false);
    if (qIndex + 1 < questions.length) {
      setQIndex(i => i + 1);
    } else {
      setStage("result");
    }
  };

  const avgScore = feedbacks.length > 0 ? Math.round(feedbacks.reduce((s, f) => s + f.score, 0) / feedbacks.length) : 0;
  const scoreLabel = avgScore >= 8 ? "Excellent" : avgScore >= 6 ? "Good" : avgScore >= 4 ? "Needs Practice" : "Keep Trying";
  const scoreColor = avgScore >= 8 ? "text-green-600" : avgScore >= 6 ? "text-blue-600" : avgScore >= 4 ? "text-orange-600" : "text-red-500";

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
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Mock Interview</span>
        </div>
        <div className="w-24" />
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-3xl mx-auto w-full">
        <AnimatePresence mode="wait">

          {/* ── Stage 1: Role Selection ── */}
          {stage === "select" && (
            <motion.div key="select" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="text-center mb-10 mt-4">
                <div className="text-5xl mb-4">🎤</div>
                <h1 className="text-3xl font-bold mb-2">AI Mock Interview</h1>
                <p className="text-muted-foreground text-lg">
                  {firstName ? `Ready, ${firstName}?` : "Ready?"} Choose a round and practice with real interview questions.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {ROLES.map(role => (
                  <motion.button
                    key={role.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startInterview(role)}
                    data-testid={`button-role-${role.id}`}
                    className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer bg-white/80 hover:shadow-lg ${role.bg}`}
                  >
                    <div className="text-4xl mb-3">{role.icon}</div>
                    <h3 className={`text-lg font-bold mb-1 ${role.color}`}>{role.label}</h3>
                    <p className="text-sm text-muted-foreground">{role.desc}</p>
                    <div className={`mt-4 flex items-center gap-1 text-xs font-semibold ${role.color}`}>
                      Start <Play className="w-3 h-3" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/70 rounded-xl border text-sm text-muted-foreground text-center">
                <span className="font-semibold text-foreground">5 questions per round</span> · Your answers are scored instantly · Ideal answers revealed after each question
              </div>
            </motion.div>
          )}

          {/* ── Stage 2: Interview ── */}
          {stage === "interview" && currentQ && role && (
            <motion.div key={`q-${qIndex}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
              {/* Header */}
              <div className="mb-6 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${role.bg} ${role.color}`}>{role.icon} {role.label}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Question {qIndex + 1} of {questions.length}
                  </div>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>

              {/* Question Card */}
              <Card className="bg-white/90 shadow-md border mb-4">
                <CardContent className="p-6 md:p-8">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Question {qIndex + 1}</p>
                  <h2 className="text-xl font-bold mb-4 leading-snug" data-testid="text-interview-question">{currentQ.q}</h2>
                  {!submitted && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                      <span className="text-base">💡</span>
                      <span><strong>Hint:</strong> {currentQ.hint}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Answer Box */}
              {!submitted ? (
                <Card className="bg-white/90 shadow-sm border mb-4">
                  <CardContent className="p-6">
                    <label className="text-sm font-semibold mb-2 block">Your Answer</label>
                    <Textarea
                      placeholder="Type your answer here... Explain clearly, use examples where possible."
                      value={answer}
                      onChange={e => setAnswer(e.target.value)}
                      className="min-h-[140px] resize-none text-sm border-gray-200 focus:border-blue-400"
                      data-testid="textarea-answer"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-muted-foreground">{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={handleNext} data-testid="button-skip">
                          <SkipForward className="w-4 h-4 mr-1" /> Skip
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          disabled={answer.trim().length < 5}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          data-testid="button-submit-answer"
                        >
                          Submit Answer <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Score Feedback */}
                  {feedbacks[feedbacks.length - 1] && (
                    <Card className="bg-white/90 shadow-sm border mb-4">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-extrabold shadow">
                            {feedbacks[feedbacks.length - 1].score}/10
                          </div>
                          <div>
                            <p className="font-bold text-base">Score: {feedbacks[feedbacks.length - 1].score}/10</p>
                            <p className="text-sm text-muted-foreground">{feedbacks[feedbacks.length - 1].tip}</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                          <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2 flex items-center gap-1"><Star className="w-3 h-3" /> Ideal Answer</p>
                          <p className="text-sm text-green-900 leading-relaxed">{currentQ.ideal}</p>
                        </div>
                        <Button onClick={handleNext} className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white" data-testid="button-next-question">
                          {qIndex + 1 < questions.length ? "Next Question" : "See Results"} <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── Stage 3: Results ── */}
          {stage === "result" && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-center mt-4 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/30">
                  <span className="text-white text-3xl font-extrabold">{avgScore}/10</span>
                </div>
                <h1 className="text-2xl font-bold mb-1">Interview Complete!</h1>
                <p className={`text-lg font-semibold ${scoreColor}`}>{scoreLabel}</p>
                <p className="text-muted-foreground text-sm mt-1">You answered {feedbacks.length} of {questions.length} questions</p>
              </div>

              <div className="space-y-4 mb-8">
                {feedbacks.map((fb, i) => (
                  <Card key={i} className="bg-white/90 border shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground mb-1">Q{i + 1}: {fb.question}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">Your answer: {fb.answer}</p>
                        </div>
                        <div className={`text-lg font-extrabold shrink-0 ${fb.score >= 8 ? "text-green-600" : fb.score >= 6 ? "text-blue-600" : "text-orange-500"}`}>
                          {fb.score}/10
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 bg-gray-50 rounded-lg p-2">{fb.tip}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-3">
                <Button onClick={() => { setStage("select"); setSelectedRole(null); }} variant="outline" className="flex-1" data-testid="button-try-another">
                  <RotateCcw className="w-4 h-4 mr-2" /> Try Another Round
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white" data-testid="button-back-to-dashboard">
                    Back to Dashboard <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
