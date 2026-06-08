import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Brain, MessageSquare, Calculator, Database, CheckCircle2, XCircle, RotateCcw, Sparkles, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "technical", title: "Technical Skills", desc: "DSA & Core CS concepts", icon: <Database className="w-6 h-6 text-blue-600" />, color: "hover:border-blue-500 hover:bg-blue-50", selectedColor: "border-blue-500 bg-blue-50", accent: "from-blue-500 to-indigo-600", badge: "bg-blue-100 text-blue-700" },
  { id: "communication", title: "Communication", desc: "Verbal & Written English", icon: <MessageSquare className="w-6 h-6 text-purple-500" />, color: "hover:border-purple-500 hover:bg-purple-50", selectedColor: "border-purple-500 bg-purple-50", accent: "from-purple-500 to-fuchsia-600", badge: "bg-purple-100 text-purple-700" },
  { id: "aptitude", title: "Aptitude", desc: "Quants & Logical Reasoning", icon: <Calculator className="w-6 h-6 text-orange-500" />, color: "hover:border-orange-500 hover:bg-orange-50", selectedColor: "border-orange-500 bg-orange-50", accent: "from-orange-500 to-rose-500", badge: "bg-orange-100 text-orange-700" },
  { id: "domain", title: "Domain Knowledge", desc: "Web, Mobile or Data", icon: <Brain className="w-6 h-6 text-green-500" />, color: "hover:border-green-500 hover:bg-green-50", selectedColor: "border-green-500 bg-green-50", accent: "from-green-500 to-teal-600", badge: "bg-green-100 text-green-700" },
];

type Question = { q: string; options: string[]; correct: number };

const questionBank: Record<string, Question[]> = {
  technical: [
    { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1 },
    { q: "Which data structure uses LIFO order?", options: ["Queue", "Stack", "Linked List", "Tree"], correct: 1 },
    { q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Logic", "Sequential Query List", "Strong Query Layer"], correct: 0 },
    { q: "Which sorting algorithm has the best average-case complexity?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"], correct: 2 },
    { q: "What is a primary key in a database?", options: ["A key that can be null", "A unique identifier for each record", "A foreign reference to another table", "A duplicate field"], correct: 1 },
    { q: "In object-oriented programming, what is 'encapsulation'?", options: ["Hiding implementation details and exposing only necessary parts", "Creating multiple classes", "Inheriting from a parent class", "Defining abstract methods"], correct: 0 },
    { q: "Which of these is NOT a valid HTTP method?", options: ["GET", "POST", "FETCH", "DELETE"], correct: 2 },
    { q: "What does 'DRY' stand for in software development?", options: ["Don't Repeat Yourself", "Dynamic Rendering Yields", "Data Repository Yield", "Direct Runtime Yield"], correct: 0 },
    { q: "Which data structure is used for BFS traversal?", options: ["Stack", "Queue", "Tree", "Heap"], correct: 1 },
    { q: "What is the output of: 2 + '3' in JavaScript?", options: ["5", "'23'", "23", "Error"], correct: 2 },
    { q: "Which algorithm is used to find shortest path in a weighted graph?", options: ["BFS", "DFS", "Dijkstra's", "Prim's"], correct: 2 },
    { q: "What does ORM stand for?", options: ["Object Relational Mapping", "Oriented Runtime Model", "Open Resource Management", "Object Reference Module"], correct: 0 },
    { q: "What is a deadlock in operating systems?", options: ["A program crash", "Two processes waiting forever for each other's resources", "A full memory state", "A CPU scheduling error"], correct: 1 },
    { q: "Which of the following is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], correct: 2 },
    { q: "What is the worst-case time complexity of quicksort?", options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"], correct: 1 },
  ],
  communication: [
    { q: "Choose the correct sentence:", options: ["He don't know the answer.", "He doesn't knows the answer.", "He doesn't know the answer.", "He not know the answer."], correct: 2 },
    { q: "What is a synonym for 'Meticulous'?", options: ["Careless", "Detailed", "Lazy", "Hasty"], correct: 1 },
    { q: "Choose the best way to start a professional email:", options: ["Hey!", "What's up?", "Dear Sir/Madam,", "Yo bro,"], correct: 2 },
    { q: "Which sentence is grammatically correct?", options: ["Neither of the students were ready.", "Neither of the students was ready.", "Neither of the student were ready.", "Neither of student was ready."], correct: 1 },
    { q: "An antonym of 'Verbose' is:", options: ["Wordy", "Lengthy", "Concise", "Elaborate"], correct: 2 },
    { q: "Choose the correctly punctuated sentence:", options: ["Its a beautiful day.", "It's a beautiful day.", "Its' a beautiful day.", "Its, a beautiful day."], correct: 1 },
    { q: "What does the phrase 'hit the nail on the head' mean?", options: ["To cause injury", "To be exactly right", "To hammer something", "To miss the point"], correct: 1 },
    { q: "Which word best fills the blank: The project was _____ completed before the deadline.", options: ["barely", "hardly", "successfully", "never"], correct: 2 },
    { q: "Which is the correct passive voice of 'She wrote the report'?", options: ["The report was wrote by her.", "The report was written by her.", "The report has written by her.", "The report is wrote by her."], correct: 1 },
    { q: "Select the correct meaning of 'Pragmatic':", options: ["Idealistic and visionary", "Practical and realistic", "Emotional and passionate", "Strict and rigid"], correct: 1 },
    { q: "In professional communication, 'CC' in an email stands for:", options: ["Carbon Copy", "Confirmed Contact", "Collective Communication", "Customer Copy"], correct: 0 },
    { q: "Which tone is appropriate for a job application letter?", options: ["Casual and friendly", "Formal and professional", "Aggressive and confident", "Humorous and witty"], correct: 1 },
    { q: "Choose the sentence with correct subject-verb agreement:", options: ["The team are ready.", "The team is ready.", "The team were ready.", "The team has been are ready."], correct: 1 },
    { q: "What is the correct spelling?", options: ["Accomodation", "Acommodation", "Accommodation", "Accomodtion"], correct: 2 },
    { q: "Which word is spelled correctly?", options: ["Recieve", "Achieve", "Beleive", "Releive"], correct: 1 },
  ],
  aptitude: [
    { q: "If a train travels 60 km in 1 hour, how far will it travel in 2.5 hours?", options: ["120 km", "150 km", "180 km", "200 km"], correct: 1 },
    { q: "What comes next in the series: 2, 6, 12, 20, ?", options: ["28", "30", "32", "36"], correct: 1 },
    { q: "A is B's sister. C is B's mother. D is C's father. How is A related to D?", options: ["Daughter", "Granddaughter", "Grandmother", "Sister"], correct: 1 },
    { q: "If 20% of a number is 50, what is the number?", options: ["200", "250", "300", "150"], correct: 1 },
    { q: "Pointing to a woman, Ravi said, 'She is the mother of my mother's only daughter.' How is the woman related to Ravi?", options: ["Aunt", "Sister", "Mother", "Grandmother"], correct: 2 },
    { q: "A shopkeeper sells a shirt at 25% profit. If the cost price is ₹800, what is the selling price?", options: ["₹900", "₹1000", "₹1100", "₹950"], correct: 1 },
    { q: "If the ratio of boys to girls in a class is 3:2 and there are 30 boys, how many girls are there?", options: ["15", "18", "20", "25"], correct: 2 },
    { q: "What is the next number: 1, 4, 9, 16, 25, ?", options: ["30", "36", "49", "35"], correct: 1 },
    { q: "A pipe fills a tank in 4 hours. Another pipe empties it in 6 hours. How many hours to fill the tank if both are open?", options: ["10", "12", "8", "15"], correct: 1 },
    { q: "In a row of 10 students, if Ankit is 4th from the left, what is his position from the right?", options: ["5th", "6th", "7th", "8th"], correct: 2 },
    { q: "Find the odd one out: 7, 11, 13, 14, 17", options: ["7", "11", "14", "17"], correct: 2 },
    { q: "If A = 1, B = 2, ..., Z = 26, what is the value of CAT?", options: ["24", "27", "30", "21"], correct: 0 },
    { q: "A man walks 5 km North, then 12 km East. How far is he from his starting point?", options: ["13 km", "17 km", "15 km", "10 km"], correct: 0 },
    { q: "If 6 workers can finish a task in 10 days, how many days will 4 workers take?", options: ["12", "15", "8", "18"], correct: 1 },
    { q: "The average of 5 consecutive even numbers is 14. What is the largest number?", options: ["16", "18", "20", "15"], correct: 1 },
  ],
  domain: [
    { q: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
    { q: "Which of the following is a JavaScript framework?", options: ["Django", "Laravel", "React", "Flask"], correct: 2 },
    { q: "What does API stand for?", options: ["Application Programming Interface", "Applied Program Index", "Automated Process Integration", "Application Protocol Interface"], correct: 0 },
    { q: "What is the output of: console.log(typeof null)?", options: ["null", "undefined", "object", "number"], correct: 2 },
    { q: "Which HTTP status code means 'Not Found'?", options: ["200", "301", "403", "404"], correct: 3 },
    { q: "What is the purpose of CSS Flexbox?", options: ["Adding animations", "Laying out elements in one dimension (row or column)", "Managing databases", "Handling events"], correct: 1 },
    { q: "Which of the following is used for version control?", options: ["Docker", "Jenkins", "Git", "Kubernetes"], correct: 2 },
    { q: "What does JSON stand for?", options: ["Java Standard Object Notation", "JavaScript Object Notation", "Java Serialized Object Network", "JavaScript Oriented Nodes"], correct: 1 },
    { q: "Which SQL command is used to retrieve data from a table?", options: ["INSERT", "UPDATE", "SELECT", "DELETE"], correct: 2 },
    { q: "What is 'responsive design' in web development?", options: ["Fast loading speed", "Design that adapts to different screen sizes", "Animated UI", "Server-side rendering"], correct: 1 },
    { q: "Which of these is a Python web framework?", options: ["Spring", "Express", "Rails", "Django"], correct: 3 },
    { q: "In React, what is the purpose of 'useState'?", options: ["Fetch data from APIs", "Manage component state", "Style components", "Route between pages"], correct: 1 },
    { q: "What does CRUD stand for in web development?", options: ["Create, Read, Update, Delete", "Control, Route, Update, Deploy", "Compile, Run, Upload, Debug", "Connect, Render, Use, Display"], correct: 0 },
    { q: "What is the use of the 'alt' attribute in an HTML <img> tag?", options: ["Sets the image size", "Provides text for screen readers/fallback", "Links to another page", "Adds a border"], correct: 1 },
    { q: "Which of these is NOT a CSS property?", options: ["margin", "padding", "border", "function"], correct: 3 },
  ],
};

const QUESTIONS_PER_CATEGORY = 6;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Stage = "select" | "quiz" | "result";

export default function Assessment() {
  const [, setLocation] = useLocation();
  const [stage, setStage] = useState<Stage>("select");
  const [selected, setSelected] = useState<string[]>([]);
  const [sessionBank, setSessionBank] = useState<Record<string, Question[]>>({});
  const [currentCatIndex, setCurrentCatIndex] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, (number | null)[]>>({});
  const [chosen, setChosen] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleCategory = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const startAssessment = () => {
    const bank: Record<string, Question[]> = {};
    const init: Record<string, (number | null)[]> = {};
    selected.forEach(cat => {
      bank[cat] = shuffle(questionBank[cat]).slice(0, QUESTIONS_PER_CATEGORY);
      init[cat] = Array(QUESTIONS_PER_CATEGORY).fill(null);
    });
    setSessionBank(bank);
    setAnswers(init);
    setCurrentCatIndex(0);
    setCurrentQIndex(0);
    setChosen(null);
    setShowFeedback(false);
    setStage("quiz");
  };

  const currentCatId = selected[currentCatIndex];
  const questions = currentCatId ? (sessionBank[currentCatId] ?? []) : [];
  const currentQuestion = questions[currentQIndex];

  const totalQuestions = selected.length * QUESTIONS_PER_CATEGORY;
  const answeredSoFar = currentCatIndex * QUESTIONS_PER_CATEGORY + currentQIndex;
  const progress = Math.round((answeredSoFar / totalQuestions) * 100);

  const handleChoose = (idx: number) => {
    if (showFeedback) return;
    setChosen(idx);
    setShowFeedback(true);
    const updated = { ...answers };
    updated[currentCatId] = [...(updated[currentCatId] ?? [])];
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
    selected.forEach(cat => {
      const qs = sessionBank[cat] ?? [];
      const ans = answers[cat] ?? [];
      qs.forEach((q, i) => { if (ans[i] === q.correct) correct++; });
    });
    return { correct, total: totalQuestions, pct: Math.round((correct / totalQuestions) * 100) };
  };

  const getCategoryScore = (catId: string) => {
    const qs = sessionBank[catId] ?? [];
    const ans = answers[catId] ?? [];
    const correct = qs.filter((q, i) => ans[i] === q.correct).length;
    return { correct, total: qs.length, pct: qs.length > 0 ? Math.round((correct / qs.length) * 100) : 0 };
  };

  const getReadinessLabel = (pct: number) => {
    if (pct >= 80) return { label: "Strong 🚀", color: "text-green-600", bg: "bg-green-100" };
    if (pct >= 60) return { label: "Intermediate 📈", color: "text-blue-600", bg: "bg-blue-100" };
    if (pct >= 40) return { label: "Developing 🌱", color: "text-orange-600", bg: "bg-orange-100" };
    return { label: "Beginner 💪", color: "text-red-600", bg: "bg-red-100" };
  };

  const currentCatMeta = categories.find(c => c.id === currentCatId);

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      {/* Animated blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-300/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <header className="h-16 border-b bg-white/70 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium text-sm transition-colors" data-testid="link-back-home">
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-base bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">PlacementAI</span>
        </div>
        <div className="w-20" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 py-10">
        <AnimatePresence mode="wait">

          {/* ── STAGE 1: Category Selection ── */}
          {stage === "select" && (
            <motion.div key="select" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="w-full max-w-2xl">
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500">
                  Skill Assessment
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Pick the areas to test. Each session gives you <span className="font-bold text-foreground">fresh, randomised questions</span> — no two tests are the same.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8" data-testid="category-grid">
                {categories.map((cat, i) => {
                  const isSelected = selected.includes(cat.id);
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all border-2 shadow-sm hover:shadow-lg ${isSelected ? `${cat.selectedColor} border-2` : `bg-white border-transparent ${cat.color}`}`}
                        onClick={() => toggleCategory(cat.id)}
                        data-testid={`card-category-${cat.id}`}
                      >
                        <CardContent className="p-6 flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.accent} flex items-center justify-center shadow-md shrink-0`}>
                            <div className="text-white [&>svg]:text-white">{cat.icon}</div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold mb-1">{cat.title}</h3>
                            <p className="text-sm text-muted-foreground">{cat.desc}</p>
                            <span className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${cat.badge}`}>{QUESTIONS_PER_CATEGORY} questions</span>
                          </div>
                          <motion.div animate={{ scale: isSelected ? 1 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>{selected.length === 0 ? "Select at least one area to begin" : `${selected.length} area${selected.length > 1 ? "s" : ""} selected · ${selected.length * QUESTIONS_PER_CATEGORY} questions`}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Timer className="w-3.5 h-3.5" />~{selected.length * 4} mins</span>
                  </div>
                  <Progress value={selected.length * 25} className="h-2.5 rounded-full" />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    disabled={selected.length === 0}
                    onClick={startAssessment}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 h-12 px-8 text-base font-bold disabled:opacity-40 rounded-xl"
                    data-testid="button-start-assessment"
                  >
                    Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
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
              transition={{ duration: 0.22 }}
              className="w-full max-w-2xl"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`flex items-center gap-2 text-sm font-bold px-3 py-1 rounded-full ${currentCatMeta?.badge ?? ""}`}>
                    {currentCatMeta?.icon}
                    {currentCatMeta?.title}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">{answeredSoFar + 1} / {totalQuestions}</span>
                </div>
                <div className="relative h-3 rounded-full bg-gray-200/60 overflow-hidden">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${currentCatMeta?.accent ?? "from-blue-500 to-purple-500"}`}
                    initial={{ width: `${(answeredSoFar / totalQuestions) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <motion.div
                key={currentQuestion.q}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm shadow-xl border mb-5">
                  <CardContent className="p-7 md:p-9">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Question {currentQIndex + 1} of {QUESTIONS_PER_CATEGORY}</p>
                    <h2 className="text-xl font-extrabold mb-8 leading-snug" data-testid="text-question">{currentQuestion.q}</h2>
                    <div className="space-y-3">
                      {currentQuestion.options.map((opt, idx) => {
                        const isCorrect = idx === currentQuestion.correct;
                        const isChosen = chosen === idx;
                        let cls = "border-2 border-gray-200 bg-gray-50/80 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md";
                        if (showFeedback) {
                          if (isCorrect) cls = "border-2 border-green-500 bg-green-50 shadow-md shadow-green-200";
                          else if (isChosen) cls = "border-2 border-red-400 bg-red-50";
                          else cls = "border-2 border-gray-100 bg-gray-50 opacity-50";
                        } else if (isChosen) {
                          cls = "border-2 border-blue-500 bg-blue-50 shadow-md shadow-blue-200";
                        }
                        return (
                          <motion.button
                            key={idx}
                            whileHover={!showFeedback ? { x: 4 } : {}}
                            whileTap={!showFeedback ? { scale: 0.99 } : {}}
                            onClick={() => handleChoose(idx)}
                            disabled={showFeedback}
                            data-testid={`button-option-${idx}`}
                            className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer font-medium text-sm flex items-center gap-3 ${cls}`}
                          >
                            <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 transition-colors ${showFeedback && isCorrect ? "bg-green-500 text-white" : showFeedback && isChosen ? "bg-red-400 text-white" : "bg-white border border-gray-300 text-gray-500"}`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {showFeedback && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />}
                            {showFeedback && isChosen && !isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-end">
                    <Button
                      size="lg"
                      onClick={handleNext}
                      className={`bg-gradient-to-r ${currentCatMeta?.accent ?? "from-blue-600 to-purple-600"} text-white h-12 px-8 rounded-xl font-bold shadow-lg`}
                      data-testid="button-next-question"
                    >
                      {currentCatIndex + 1 === selected.length && currentQIndex + 1 === questions.length ? "See My Results 🎯" : "Next Question"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── STAGE 3: Results ── */}
          {stage === "result" && (() => {
            const { correct, total, pct } = calcScore();
            const readiness = getReadinessLabel(pct);
            return (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/40"
                  >
                    <span className="text-white text-3xl font-extrabold">{pct}%</span>
                  </motion.div>
                  <h1 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600">Assessment Complete!</h1>
                  <p className="text-muted-foreground text-lg">{correct} of {total} correct</p>
                  <span className={`inline-block mt-3 px-4 py-1.5 rounded-full text-sm font-bold ${readiness.bg} ${readiness.color}`}>{readiness.label}</span>
                </div>

                <div className="space-y-4 mb-8">
                  {selected.map((catId, i) => {
                    const cat = categories.find(c => c.id === catId)!;
                    const score = getCategoryScore(catId);
                    const label = getReadinessLabel(score.pct);
                    return (
                      <motion.div
                        key={catId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Card className="bg-white/90 backdrop-blur-sm border shadow-sm hover:shadow-md transition-shadow">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.accent} flex items-center justify-center shadow-sm`}>
                                  <div className="[&>svg]:text-white [&>svg]:w-5 [&>svg]:h-5">{cat.icon}</div>
                                </div>
                                <span className="font-bold">{cat.title}</span>
                              </div>
                              <span className={`text-sm font-bold px-3 py-1 rounded-full ${label.bg} ${label.color}`}>
                                {score.correct}/{score.total} · {score.pct}%
                              </span>
                            </div>
                            <div className="relative h-2.5 rounded-full bg-gray-200 overflow-hidden">
                              <motion.div
                                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${cat.accent}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${score.pct}%` }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.15 }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white border-0 shadow-xl mb-5 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                  <CardContent className="p-6 relative z-10">
                    <h3 className="font-extrabold text-xl mb-1">Your Personalised Roadmap is Ready! 🗺️</h3>
                    <p className="text-blue-100 text-sm mb-4">Based on your results, we've generated a 90-day plan.</p>
                    <Button onClick={() => setLocation("/dashboard")} className="bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-md" data-testid="button-view-roadmap">
                      View My Roadmap <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                <div className="flex justify-center">
                  <Button variant="ghost" onClick={() => { setStage("select"); setSelected([]); setChosen(null); setShowFeedback(false); }} className="text-muted-foreground hover:text-foreground" data-testid="button-retake">
                    <RotateCcw className="w-4 h-4 mr-2" /> Retake with New Questions
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
