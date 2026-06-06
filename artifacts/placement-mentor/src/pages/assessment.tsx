import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Brain, MessageSquare, Calculator, Database, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "technical", title: "Technical Skills", desc: "DSA & Core CS concepts", icon: <Database className="w-6 h-6 text-blue-600" />, color: "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10", selectedColor: "border-blue-500 bg-blue-50 dark:bg-blue-900/10" },
  { id: "communication", title: "Communication", desc: "Verbal & Written English", icon: <MessageSquare className="w-6 h-6 text-purple-500" />, color: "hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10", selectedColor: "border-purple-500 bg-purple-50 dark:bg-purple-900/10" },
  { id: "aptitude", title: "Aptitude", desc: "Quants & Logical Reasoning", icon: <Calculator className="w-6 h-6 text-orange-500" />, color: "hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10", selectedColor: "border-orange-500 bg-orange-50 dark:bg-orange-900/10" },
  { id: "domain", title: "Domain Knowledge", desc: "Web, Mobile or Data", icon: <Brain className="w-6 h-6 text-green-500" />, color: "hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/10", selectedColor: "border-green-500 bg-green-50 dark:bg-green-900/10" },
];

type Question = {
  q: string;
  options: string[];
  correct: number;
};

const questionBank: Record<string, Question[]> = {
  technical: [
    { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1 },
    { q: "Which data structure uses LIFO order?", options: ["Queue", "Stack", "Linked List", "Tree"], correct: 1 },
    { q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Logic", "Sequential Query List", "Strong Query Layer"], correct: 0 },
    { q: "Which sorting algorithm has the best average-case complexity?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"], correct: 2 },
    { q: "What is a primary key in a database?", options: ["A key that can be null", "A unique identifier for each record", "A foreign reference to another table", "A duplicate field"], correct: 1 },
  ],
  communication: [
    { q: "Choose the correct sentence:", options: ["He don't know the answer.", "He doesn't knows the answer.", "He doesn't know the answer.", "He not know the answer."], correct: 2 },
    { q: "What is a synonym for 'Meticulous'?", options: ["Careless", "Detailed", "Lazy", "Hasty"], correct: 1 },
    { q: "Choose the best way to start a professional email:", options: ["Hey!", "What's up?", "Dear Sir/Madam,", "Yo bro,"], correct: 2 },
    { q: "Which sentence is grammatically correct?", options: ["Neither of the students were ready.", "Neither of the students was ready.", "Neither of the student were ready.", "Neither of student was ready."], correct: 1 },
    { q: "An antonym of 'Verbose' is:", options: ["Wordy", "Lengthy", "Concise", "Elaborate"], correct: 2 },
  ],
  aptitude: [
    { q: "If a train travels 60 km in 1 hour, how far will it travel in 2.5 hours?", options: ["120 km", "150 km", "180 km", "200 km"], correct: 1 },
    { q: "What comes next in the series: 2, 6, 12, 20, ?", options: ["28", "30", "32", "36"], correct: 1 },
    { q: "A is B's sister. C is B's mother. D is C's father. How is A related to D?", options: ["Daughter", "Granddaughter", "Grandmother", "Sister"], correct: 1 },
    { q: "If 20% of a number is 50, what is the number?", options: ["200", "250", "300", "150"], correct: 1 },
    { q: "Pointing to a woman, Ravi said, 'She is the mother of my mother's only daughter.' How is the woman related to Ravi?", options: ["Aunt", "Sister", "Mother", "Grandmother"], correct: 2 },
  ],
  domain: [
    { q: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
    { q: "Which of the following is a JavaScript framework?", options: ["Django", "Laravel", "React", "Flask"], correct: 2 },
    { q: "What does API stand for?", options: ["Application Programming Interface", "Applied Program Index", "Automated Process Integration", "Application Protocol Interface"], correct: 0 },
    { q: "What is the output of: console.log(typeof null)?", options: ["null", "undefined", "object", "number"], correct: 2 },
    { q: "Which HTTP status code means 'Not Found'?", options: ["200", "301", "403", "404"], correct: 3 },
  ],
};

type Stage = "select" | "quiz" | "result";

export default function Assessment() {
  const [, setLocation] = useLocation();
  const [stage, setStage] = useState<Stage>("select");
  const [selected, setSelected] = useState<string[]>([]);
  const [currentCatIndex, setCurrentCatIndex] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, (number | null)[]>>({});
  const [chosen, setChosen] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleCategory = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const startAssessment = () => {
    const init: Record<string, (number | null)[]> = {};
    selected.forEach(cat => { init[cat] = Array(questionBank[cat].length).fill(null); });
    setAnswers(init);
    setCurrentCatIndex(0);
    setCurrentQIndex(0);
    setChosen(null);
    setShowFeedback(false);
    setStage("quiz");
  };

  const currentCatId = selected[currentCatIndex];
  const questions = currentCatId ? questionBank[currentCatId] : [];
  const currentQuestion = questions[currentQIndex];

  const totalQuestions = selected.reduce((sum, cat) => sum + questionBank[cat].length, 0);
  const answeredSoFar = selected.slice(0, currentCatIndex).reduce((sum, cat) => sum + questionBank[cat].length, 0) + currentQIndex;
  const progress = Math.round((answeredSoFar / totalQuestions) * 100);

  const handleChoose = (idx: number) => {
    if (showFeedback) return;
    setChosen(idx);
    setShowFeedback(true);
    const updated = { ...answers };
    updated[currentCatId] = [...updated[currentCatId]];
    updated[currentCatId][currentQIndex] = idx;
    setAnswers(updated);
  };

  const handleNext = () => {
    setChosen(null);
    setShowFeedback(false);
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(q => q + 1);
    } else if (currentCatIndex + 1 < selected.length) {
      setCurrentCatIndex(c => c + 1);
      setCurrentQIndex(0);
    } else {
      setStage("result");
    }
  };

  const calcScore = () => {
    let correct = 0;
    let total = 0;
    selected.forEach(cat => {
      const qs = questionBank[cat];
      const ans = answers[cat] || [];
      qs.forEach((q, i) => {
        total++;
        if (ans[i] === q.correct) correct++;
      });
    });
    return { correct, total, pct: Math.round((correct / total) * 100) };
  };

  const getCategoryScore = (catId: string) => {
    const qs = questionBank[catId];
    const ans = answers[catId] || [];
    const correct = qs.filter((q, i) => ans[i] === q.correct).length;
    return { correct, total: qs.length, pct: Math.round((correct / qs.length) * 100) };
  };

  const getReadinessLabel = (pct: number) => {
    if (pct >= 80) return { label: "Strong", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" };
    if (pct >= 60) return { label: "Intermediate", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" };
    if (pct >= 40) return { label: "Developing", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" };
    return { label: "Beginner", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" };
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950 flex flex-col font-sans">
      <header className="h-16 border-b bg-white dark:bg-zinc-900 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium text-sm transition-colors" data-testid="link-back-home">
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-base bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">PlacementAI</span>
        </div>
        <div className="w-20" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12">
        <AnimatePresence mode="wait">

          {/* ── STAGE 1: Category Selection ── */}
          {stage === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Let's find your skill level</h1>
                <p className="text-muted-foreground text-lg">Select the areas you want to assess. We'll build your personalized 90-day placement roadmap based on your results.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8" data-testid="category-grid">
                {categories.map((cat, i) => {
                  const isSelected = selected.includes(cat.id);
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      key={cat.id}
                    >
                      <Card
                        className={`cursor-pointer transition-all border-2 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md ${isSelected ? cat.selectedColor : `border-transparent ${cat.color}`}`}
                        onClick={() => toggleCategory(cat.id)}
                        data-testid={`card-category-${cat.id}`}
                      >
                        <CardContent className="p-6 flex items-start gap-4">
                          <div className="mt-1">{cat.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-bold mb-1">{cat.title}</h3>
                            <p className="text-sm text-muted-foreground">{cat.desc}</p>
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 shrink-0" />}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>{selected.length === 0 ? "Select at least one area" : `${selected.length} area${selected.length > 1 ? "s" : ""} selected · ${selected.reduce((s, c) => s + questionBank[c].length, 0)} questions`}</span>
                    <span className="text-muted-foreground">~{selected.length * 5} mins</span>
                  </div>
                  <Progress value={selected.length * 25} className="h-2" />
                </div>
                <Button
                  size="lg"
                  disabled={selected.length === 0}
                  onClick={startAssessment}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg h-12 px-8 disabled:opacity-40"
                  data-testid="button-start-assessment"
                >
                  Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STAGE 2: Quiz ── */}
          {stage === "quiz" && currentQuestion && (
            <motion.div
              key={`quiz-${currentCatId}-${currentQIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl"
            >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span className="font-medium">{categories.find(c => c.id === currentCatId)?.title}</span>
                  <span>Question {answeredSoFar + 1} of {totalQuestions}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <Card className="bg-white dark:bg-zinc-900 shadow-md border mb-6">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold mb-8 leading-snug" data-testid="text-question">{currentQuestion.q}</h2>
                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, idx) => {
                      let optClass = "border-2 border-transparent bg-gray-50 dark:bg-zinc-800 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20";
                      if (showFeedback) {
                        if (idx === currentQuestion.correct) {
                          optClass = "border-2 border-green-500 bg-green-50 dark:bg-green-900/20";
                        } else if (idx === chosen && chosen !== currentQuestion.correct) {
                          optClass = "border-2 border-red-400 bg-red-50 dark:bg-red-900/20";
                        } else {
                          optClass = "border-2 border-transparent bg-gray-50 dark:bg-zinc-800 opacity-60";
                        }
                      } else if (chosen === idx) {
                        optClass = "border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20";
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => handleChoose(idx)}
                          disabled={showFeedback}
                          data-testid={`button-option-${idx}`}
                          className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer font-medium text-sm flex items-center gap-3 ${optClass}`}
                        >
                          <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {opt}
                          {showFeedback && idx === currentQuestion.correct && <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto shrink-0" />}
                          {showFeedback && idx === chosen && chosen !== currentQuestion.correct && <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {showFeedback && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white h-12 px-8"
                    data-testid="button-next-question"
                  >
                    {currentCatIndex + 1 === selected.length && currentQIndex + 1 === questions.length
                      ? "See Results"
                      : "Next Question"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── STAGE 3: Results ── */}
          {stage === "result" && (() => {
            const { correct, total, pct } = calcScore();
            const readiness = getReadinessLabel(pct);
            return (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl"
              >
                <div className="text-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30">
                    <span className="text-white text-3xl font-extrabold">{pct}%</span>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
                  <p className="text-muted-foreground text-lg">You scored {correct} out of {total} questions correctly.</p>
                  <span className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${readiness.bg} ${readiness.color}`}>
                    {readiness.label} Level
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {selected.map(catId => {
                    const cat = categories.find(c => c.id === catId)!;
                    const score = getCategoryScore(catId);
                    const label = getReadinessLabel(score.pct);
                    return (
                      <Card key={catId} className="bg-white dark:bg-zinc-900 border shadow-sm">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              {cat.icon}
                              <span className="font-semibold">{cat.title}</span>
                            </div>
                            <span className={`text-sm font-bold px-3 py-0.5 rounded-full ${label.bg} ${label.color}`}>
                              {score.correct}/{score.total} · {score.pct}%
                            </span>
                          </div>
                          <Progress value={score.pct} className="h-2" />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white border-0 shadow-xl mb-6">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-1">Your Personalized Roadmap is Ready!</h3>
                    <p className="text-blue-100 text-sm mb-4">Based on your results, we've generated a 90-day plan to get you placement-ready.</p>
                    <Button
                      onClick={() => setLocation("/dashboard")}
                      className="bg-white text-blue-600 hover:bg-gray-100 font-bold"
                      data-testid="button-view-roadmap"
                    >
                      View My Roadmap <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    onClick={() => { setStage("select"); setSelected([]); setChosen(null); setShowFeedback(false); }}
                    className="text-muted-foreground"
                    data-testid="button-retake"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Retake Assessment
                  </Button>
                </div>
              </motion.div>
            );
          })()}

        </AnimatePresence>
      </main>
    </div>
  );
}
