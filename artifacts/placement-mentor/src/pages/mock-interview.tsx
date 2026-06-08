import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, RotateCcw, Clock, Star, ChevronRight, Play, SkipForward, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks/use-profile";

type Role = { id: string; label: string; color: string; border: string; bg: string; accent: string; icon: string; desc: string };
const ROLES: Role[] = [
  { id: "frontend", label: "Frontend Dev", color: "text-blue-600", border: "border-blue-300", bg: "bg-blue-50", accent: "from-blue-500 to-indigo-600", icon: "🖥️", desc: "React, HTML/CSS, JS, Accessibility" },
  { id: "backend", label: "Backend Dev", color: "text-emerald-600", border: "border-emerald-300", bg: "bg-emerald-50", accent: "from-emerald-500 to-teal-600", icon: "⚙️", desc: "APIs, Databases, System Design" },
  { id: "dsa", label: "DSA Round", color: "text-purple-600", border: "border-purple-300", bg: "bg-purple-50", accent: "from-purple-500 to-fuchsia-600", icon: "🧠", desc: "Arrays, Trees, DP, Graphs" },
  { id: "hr", label: "HR Round", color: "text-orange-600", border: "border-orange-300", bg: "bg-orange-50", accent: "from-orange-500 to-rose-500", icon: "🤝", desc: "Behavioural, Situational, Culture fit" },
];

type Question = { q: string; hint: string; ideal: string };

const ALL_QUESTIONS: Record<string, Question[]> = {
  frontend: [
    { q: "What is the difference between == and === in JavaScript?", hint: "Think about type coercion.", ideal: "== performs type coercion before comparison (e.g., '5' == 5 is true), while === checks both value and type without coercion ('5' === 5 is false). Always prefer === to avoid unexpected bugs." },
    { q: "Explain the concept of 'closure' in JavaScript with an example.", hint: "Think about functions within functions and variable scope.", ideal: "A closure is a function that retains access to its outer scope even after the outer function has returned. Example: a counter function that uses a local variable — each call to the inner function still accesses that variable even after the outer function is done." },
    { q: "What is the virtual DOM and how does React use it?", hint: "Think about performance and diffing.", ideal: "The virtual DOM is a lightweight in-memory representation of the actual DOM. React creates a virtual DOM tree, compares it with the previous version (diffing), and only updates the real DOM where changes occurred, making updates efficient." },
    { q: "How would you optimize the performance of a React application?", hint: "Think about re-renders, lazy loading, and memoization.", ideal: "Use React.memo to prevent unnecessary re-renders, useMemo/useCallback for expensive computations, code-split with lazy/Suspense, avoid anonymous functions in renders, use proper key props in lists, and profile with React DevTools." },
    { q: "What is CSS specificity and how is it calculated?", hint: "Think about the hierarchy of selectors.", ideal: "Specificity determines which CSS rule applies when multiple rules target the same element. It is calculated as (inline styles, ID selectors, class/attribute selectors, element selectors). Higher specificity wins. !important overrides everything." },
    { q: "What is event delegation in JavaScript and why is it useful?", hint: "Think about bubbling and adding one listener instead of many.", ideal: "Event delegation is attaching a single event listener to a parent element instead of multiple listeners to child elements. When a child is clicked, the event bubbles up to the parent. It's useful for dynamic content and reduces memory usage." },
    { q: "Explain the difference between 'null' and 'undefined' in JavaScript.", hint: "Think about intentional absence vs unintentional absence.", ideal: "'undefined' means a variable has been declared but not assigned a value — it happens automatically. 'null' is an intentional assignment meaning 'no value'. Both are falsy, but typeof null === 'object' (a known JS quirk) while typeof undefined === 'undefined'." },
    { q: "What is the difference between localStorage and sessionStorage?", hint: "Think about persistence.", ideal: "Both store key-value pairs in the browser. localStorage persists until explicitly cleared — it survives page refreshes and browser restarts. sessionStorage is cleared when the browser tab is closed. Use localStorage for user preferences, sessionStorage for temporary tab-level state." },
    { q: "What are React hooks and why were they introduced?", hint: "Think about class components and functional components.", ideal: "React hooks (introduced in v16.8) let you use state and lifecycle features in functional components without writing classes. Key hooks: useState for state, useEffect for side effects, useContext for context. They make code more reusable and easier to read than class-based patterns." },
    { q: "What is CORS and how do you handle it in web development?", hint: "Think about same-origin policy and server headers.", ideal: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts HTTP requests to a different origin. The server must include Access-Control-Allow-Origin headers. In development, you can use a proxy; in production, the server sets the correct CORS headers." },
    { q: "Explain the CSS box model.", hint: "Think about content, padding, border, and margin.", ideal: "The CSS box model describes the rectangular boxes generated for elements. From inside out: content (actual content), padding (space between content and border), border (visible edge), and margin (space outside the border). box-sizing: border-box includes padding and border in the element's total width/height." },
    { q: "What is the difference between 'call', 'apply', and 'bind' in JavaScript?", hint: "Think about invoking functions with a specific 'this' context.", ideal: "All three set the 'this' value. call() invokes immediately with arguments listed individually. apply() invokes immediately with arguments as an array. bind() returns a new function with 'this' bound, called later. Example: fn.call(obj, a, b) vs fn.apply(obj, [a, b]) vs fn.bind(obj)." },
  ],
  backend: [
    { q: "What is the difference between REST and GraphQL?", hint: "Think about data fetching, over-fetching, and under-fetching.", ideal: "REST uses fixed endpoints returning predefined data shapes, which can lead to over- or under-fetching. GraphQL uses a single endpoint where clients specify exactly what data they need, reducing unnecessary data transfer but adding query complexity." },
    { q: "Explain database indexing and when you would use it.", hint: "Think about read vs write trade-offs.", ideal: "An index is a data structure that speeds up data retrieval on a column at the cost of extra storage and slower writes. Use indexes on columns frequently used in WHERE, JOIN, or ORDER BY clauses, but avoid over-indexing on tables with frequent INSERT/UPDATE operations." },
    { q: "What is the CAP theorem?", hint: "Think about distributed systems and trade-offs.", ideal: "CAP theorem states that a distributed system can only guarantee two of three: Consistency, Availability, and Partition tolerance. Since partition tolerance is unavoidable, systems trade off between CP (e.g., HBase) and AP (e.g., Cassandra)." },
    { q: "How would you design a URL shortener service?", hint: "Think about hashing, storage, and scale.", ideal: "Use Base62 encoding of an auto-incrementing ID to generate short codes. Store the mapping in a database. Add Redis cache for frequently accessed URLs. Use a load balancer for scale, and handle collisions in hash generation." },
    { q: "What are the ACID properties in databases?", hint: "Think about transactions.", ideal: "ACID stands for: Atomicity (all-or-nothing), Consistency (data always stays valid), Isolation (concurrent transactions don't interfere), and Durability (committed data persists after crashes). These properties ensure reliable database transactions." },
    { q: "What is the difference between SQL and NoSQL databases?", hint: "Think about schema, scalability, and use cases.", ideal: "SQL databases (MySQL, PostgreSQL) use structured schemas and tables, support complex JOINs, and are ideal for relational data. NoSQL databases (MongoDB, Cassandra) are schema-flexible, scale horizontally, and suit high-volume or unstructured data. Choose based on your data model and scale needs." },
    { q: "How does JWT authentication work?", hint: "Think about three parts: header, payload, signature.", ideal: "JWT (JSON Web Token) has three Base64-encoded parts: header (algorithm), payload (claims/user data), and signature. The server creates a JWT signed with a secret key. The client sends it in the Authorization header. The server verifies the signature without querying the database, making it stateless." },
    { q: "What is connection pooling in databases?", hint: "Think about the cost of creating database connections.", ideal: "Creating a new database connection is expensive (authentication, network setup). Connection pooling maintains a set of pre-established connections and reuses them. When a request needs a DB connection, it borrows one from the pool and returns it when done, significantly improving performance." },
    { q: "Explain the concept of middleware in Express.js.", hint: "Think about functions that run between the request and response.", ideal: "Middleware functions in Express have access to req, res, and next(). They execute in sequence and can modify the request/response, end the request cycle, or call next() to pass control to the next middleware. Common uses: authentication, logging, error handling, body parsing." },
    { q: "What is database sharding and when would you use it?", hint: "Think about horizontal scaling for very large datasets.", ideal: "Sharding splits a database horizontally across multiple servers based on a shard key (e.g., user ID range). Each shard holds a subset of data. Use sharding when a single database can't handle the data volume or query load. Challenges include cross-shard queries and resharding." },
    { q: "What is the difference between horizontal and vertical scaling?", hint: "Think about adding more machines vs upgrading one machine.", ideal: "Vertical scaling (scaling up) means adding more resources (CPU, RAM) to a single server — it has a hardware limit. Horizontal scaling (scaling out) means adding more servers and distributing load — it's more resilient and theoretically unlimited. Most modern systems prefer horizontal scaling for flexibility." },
    { q: "How would you implement rate limiting in an API?", hint: "Think about token bucket or sliding window algorithms.", ideal: "Common approaches: Token Bucket (each client gets tokens that refill at a set rate), Sliding Window (track request counts within a rolling time window), or Fixed Window. Use Redis for distributed rate limiting across multiple servers. Return HTTP 429 Too Many Requests when the limit is exceeded." },
  ],
  dsa: [
    { q: "Given an array of integers, find two numbers that add up to a target sum.", hint: "Think about a hash map approach — O(n) time.", ideal: "Use a hash set/map: iterate through the array, for each element check if (target - element) exists in the map. If yes, return both numbers. If no, add the element to the map. This achieves O(n) time and O(n) space, much better than O(n²) brute force." },
    { q: "Explain the difference between BFS and DFS and when to use each.", hint: "Think about use cases: shortest path vs exploring all paths.", ideal: "BFS uses a queue and explores level by level — ideal for finding shortest paths in unweighted graphs. DFS uses a stack/recursion and explores as far as possible — ideal for cycle detection, topological sort, and solving puzzles like mazes." },
    { q: "What is dynamic programming? Give an example.", hint: "Think about overlapping subproblems and optimal substructure.", ideal: "DP solves complex problems by breaking them into overlapping subproblems and storing results to avoid recomputation. Example: Fibonacci — instead of recursive O(2^n), store computed values and achieve O(n). Other examples: knapsack, LCS, coin change." },
    { q: "Reverse a linked list in-place.", hint: "Think about keeping track of previous, current, and next pointers.", ideal: "Use three pointers: prev=null, curr=head, next=null. Each iteration: save next=curr.next, set curr.next=prev, move prev=curr, curr=next. When curr is null, prev is the new head. Time O(n), Space O(1)." },
    { q: "What is the time complexity of quicksort in average and worst case?", hint: "Think about pivot selection.", ideal: "Average case O(n log n) when the pivot consistently splits the array roughly in half. Worst case O(n²) when the pivot is always the smallest/largest (already sorted array with first/last as pivot). Randomized pivot selection avoids the worst case." },
    { q: "Explain what a balanced binary search tree is and why it matters.", hint: "Think about search time and height.", ideal: "A balanced BST (like AVL tree or Red-Black tree) keeps its height at O(log n) by auto-balancing after insertions/deletions. This ensures search, insert, and delete all remain O(log n). An unbalanced BST can degrade to O(n) like a linked list in the worst case." },
    { q: "How would you detect a cycle in a linked list?", hint: "Think about using two pointers moving at different speeds.", ideal: "Floyd's Cycle Detection (tortoise and hare): use two pointers, slow (moves 1 step) and fast (moves 2 steps). If there's a cycle, they will eventually meet. If fast reaches null, no cycle. Time O(n), Space O(1). Alternative: use a hash set to track visited nodes — O(n) space." },
    { q: "What is a heap data structure and when is it used?", hint: "Think about priority queues and finding min/max efficiently.", ideal: "A heap is a complete binary tree satisfying the heap property (max-heap: parent ≥ children; min-heap: parent ≤ children). It supports O(1) peek and O(log n) insert/delete. Used for priority queues, heap sort, and finding the k largest/smallest elements efficiently." },
    { q: "Explain the sliding window technique with an example.", hint: "Think about avoiding nested loops for substring/subarray problems.", ideal: "Sliding window maintains a window of elements that satisfies some condition, expanding or shrinking it as you traverse. Example: maximum sum subarray of size k — instead of O(n·k) brute force, maintain a running sum and slide the window in O(n). Great for contiguous subarray/substring problems." },
    { q: "What is a trie and what problems does it solve?", hint: "Think about string prefix operations.", ideal: "A trie (prefix tree) stores strings character by character, sharing common prefixes. Operations are O(m) where m is the string length. Used for autocomplete, spell checking, IP routing, and word search problems. More space-efficient than hash maps for prefix-heavy workloads." },
    { q: "Given a binary tree, write an approach to check if it is a valid BST.", hint: "Think about min/max bounds for each node.", ideal: "Pass min and max bounds while traversing recursively. For the root, bounds are (-∞, +∞). Going left, update max = current node value. Going right, update min = current node value. If any node violates its bounds, it's not a valid BST. Time O(n), Space O(h) for the call stack." },
    { q: "What is memoization and how does it differ from tabulation?", hint: "Think about top-down vs bottom-up DP.", ideal: "Both are DP optimization techniques. Memoization (top-down): recursively solve subproblems and cache results — only solves needed subproblems. Tabulation (bottom-up): iteratively fill a table for all subproblems from base cases up. Tabulation avoids recursion overhead but may compute unused states." },
  ],
  hr: [
    { q: "Tell me about yourself.", hint: "Structure: past (background) → present (current skills) → future (why this company).", ideal: "Start with your academic background and branch, mention key technical skills you've developed, highlight a relevant project or achievement, and end with what excites you about this company/role. Keep it under 2 minutes and practice until it sounds natural." },
    { q: "Describe a time you faced a difficult challenge and how you overcame it.", hint: "Use the STAR method: Situation, Task, Action, Result.", ideal: "Use STAR: Describe the Situation briefly, your Task, the specific Actions you took (most important — be specific), and the Result with measurable outcomes. Choose a real example showing problem-solving, resilience, or teamwork." },
    { q: "Where do you see yourself in 5 years?", hint: "Show ambition but align with the company's growth opportunities.", ideal: "Show you want to grow technically and take on more responsibility, eventually contributing as a senior engineer. Tie your growth to the company's mission — it shows you've researched them and are serious about the role." },
    { q: "Why do you want to work at this company specifically?", hint: "Research the company — mention specific products, culture, or values.", ideal: "Show genuine research: mention a specific product you admire, a company value that resonates, or a recent growth milestone. Tie it back to how your skills and goals align. Generic answers like 'for growth and learning' are red flags." },
    { q: "What is your greatest weakness?", hint: "Be honest but show self-awareness and growth.", ideal: "Choose a real weakness but frame it as something you're actively improving. Avoid clichés like 'I work too hard.' Example: 'I used to struggle with public speaking, so I joined my college fest as an MC. I'm still improving but it's much better.' Shows self-awareness and growth mindset." },
    { q: "How do you handle working under tight deadlines?", hint: "Think about prioritization, communication, and real examples.", ideal: "Describe your process: break the task into smaller pieces, prioritize by impact, communicate early if something might slip. Give a real example from college — an exam week where you managed multiple assignments. Employers want to see you stay calm and systematic under pressure." },
    { q: "Tell me about a time you worked effectively in a team.", hint: "Focus on your specific role and contribution, not just the team's success.", ideal: "Use STAR. Describe the team goal, your specific role (e.g., backend developer, coordinator), an obstacle you helped resolve, and the outcome. Highlight listening, compromise, or leadership moments. Interviewers want to know you collaborate, not just that the team won." },
    { q: "Why should we hire you over other candidates?", hint: "Connect your skills and strengths specifically to the job role.", ideal: "Summarize 2-3 unique strengths relevant to the role (technical skill + soft skill), back each with a specific example, then tie it to what the company needs. Don't put down others — frame it as 'here is what I specifically bring.' Confidence without arrogance." },
    { q: "How do you keep yourself updated with new technologies?", hint: "Mention specific learning resources and habits.", ideal: "Mention specific habits: following newsletters (like ByteByteGo, JS Weekly), building side projects with new tech, watching YouTube channels (Fireship, Traversy Media), reading documentation, or contributing to open source. Show that learning is a habit, not something you do only when required." },
    { q: "Describe a situation where you had a conflict with a teammate and how you resolved it.", hint: "Focus on resolution, not the conflict itself.", ideal: "Acknowledge the conflict honestly, describe how you approached the other person (privately, calmly), how you listened to their perspective, and what compromise or resolution you reached. The key message: you handled it professionally without escalating or avoiding it." },
    { q: "What motivates you to come to work every day?", hint: "Connect your answer to the type of work you'll be doing.", ideal: "Be authentic. Good answers connect to the work: 'I love solving hard technical problems and seeing something I built actually being used by people.' Avoid money-focused answers in this question. Show genuine passion for building, learning, or impact." },
    { q: "Do you have any questions for us?", hint: "Always ask something — silence is a red flag.", ideal: "Always ask 2-3 thoughtful questions. Good ones: 'What does the first 90 days look like for this role?', 'What does the engineering team's review/feedback process look like?', 'What's the biggest challenge the team is currently working through?'. Shows you're engaged and serious." },
  ],
};

const QUESTIONS_PER_SESSION = 5;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Stage = "select" | "interview" | "result";
type FeedbackEntry = { question: string; answer: string; score: number; tip: string };

function scoreFeedback(answer: string): { score: number; tip: string } {
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
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const role = selectedRole;
  const currentQ = sessionQuestions[qIndex];
  const progress = sessionQuestions.length > 0 ? Math.round((qIndex / sessionQuestions.length) * 100) : 0;

  const startInterview = (r: Role) => {
    setSelectedRole(r);
    setSessionQuestions(shuffle(ALL_QUESTIONS[r.id]).slice(0, QUESTIONS_PER_SESSION));
    setQIndex(0);
    setAnswer("");
    setFeedbacks([]);
    setSubmitted(false);
    setStage("interview");
  };

  const handleSubmit = () => {
    if (!answer.trim() || !currentQ) return;
    const { score, tip } = scoreFeedback(answer);
    setFeedbacks(prev => [...prev, { question: currentQ.q, answer, score, tip }]);
    setSubmitted(true);
  };

  const handleNext = () => {
    setAnswer("");
    setSubmitted(false);
    if (qIndex + 1 < sessionQuestions.length) {
      setQIndex(i => i + 1);
    } else {
      setStage("result");
    }
  };

  const avgScore = feedbacks.length > 0 ? Math.round(feedbacks.reduce((s, f) => s + f.score, 0) / feedbacks.length) : 0;
  const scoreLabel = avgScore >= 8 ? "Excellent 🚀" : avgScore >= 6 ? "Good 📈" : avgScore >= 4 ? "Needs Practice 🌱" : "Keep Trying 💪";
  const scoreColor = avgScore >= 8 ? "text-green-600" : avgScore >= 6 ? "text-blue-600" : avgScore >= 4 ? "text-orange-600" : "text-red-500";

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      {/* Animated blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-2/3 right-1/3 w-72 h-72 bg-pink-300/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <header className="h-16 border-b bg-white/70 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
        <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium text-sm transition-colors">
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
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/30"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-blue-600 to-pink-500">
                  AI Mock Interview
                </h1>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  {firstName ? `Ready, ${firstName}? ` : ""}Pick a round — get <span className="font-bold text-foreground">fresh random questions</span> every time.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {ROLES.map((r, i) => (
                  <motion.button
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => startInterview(r)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all cursor-pointer bg-white/80 hover:shadow-xl ${r.bg} ${r.border}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.accent} flex items-center justify-center text-2xl mb-3 shadow-md`}>
                      {r.icon}
                    </div>
                    <h3 className={`text-lg font-extrabold mb-1 ${r.color}`}>{r.label}</h3>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                    <div className={`mt-4 flex items-center gap-1 text-xs font-bold ${r.color}`}>
                      Start Round <Play className="w-3 h-3" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-white/70 backdrop-blur-sm rounded-xl border text-sm text-muted-foreground text-center">
                <span className="font-semibold text-foreground">{QUESTIONS_PER_SESSION} questions per round</span> · Randomised every session · Ideal answers revealed after each question
              </div>
            </motion.div>
          )}

          {/* ── Stage 2: Interview ── */}
          {stage === "interview" && currentQ && role && (
            <motion.div key={`q-${qIndex}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
              <div className="mb-6 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full border-2 ${role.bg} ${role.color} ${role.border}`}>{role.icon} {role.label}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <Clock className="w-4 h-4" />
                    {qIndex + 1} / {sessionQuestions.length}
                  </div>
                </div>
                <div className="relative h-2.5 rounded-full bg-gray-200 overflow-hidden">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${role.accent}`}
                    initial={{ width: `${(qIndex / sessionQuestions.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border mb-4">
                <CardContent className="p-6 md:p-8">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Question {qIndex + 1}</p>
                  <h2 className="text-xl font-extrabold mb-4 leading-snug">{currentQ.q}</h2>
                  {!submitted && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                      <span className="text-base shrink-0">💡</span>
                      <span><strong>Hint:</strong> {currentQ.hint}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {!submitted ? (
                <Card className="bg-white/90 backdrop-blur-sm shadow-sm border mb-4">
                  <CardContent className="p-6">
                    <label className="text-sm font-bold mb-2 block">Your Answer</label>
                    <Textarea
                      placeholder="Type your answer here... Explain clearly, use examples where possible."
                      value={answer}
                      onChange={e => setAnswer(e.target.value)}
                      className="min-h-[140px] resize-none text-sm border-gray-200 focus:border-blue-400 rounded-xl"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-muted-foreground">{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={handleNext}>
                          <SkipForward className="w-4 h-4 mr-1" /> Skip
                        </Button>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                          <Button
                            onClick={handleSubmit}
                            disabled={answer.trim().length < 5}
                            className={`bg-gradient-to-r ${role.accent} text-white shadow-md font-bold`}
                          >
                            Submit <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  {feedbacks[feedbacks.length - 1] && (
                    <Card className="bg-white/90 backdrop-blur-sm shadow-sm border mb-4">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.accent} flex items-center justify-center text-white text-lg font-extrabold shadow-lg`}>
                            {feedbacks[feedbacks.length - 1].score}/10
                          </div>
                          <div>
                            <p className="font-extrabold text-base">Score: {feedbacks[feedbacks.length - 1].score}/10</p>
                            <p className="text-sm text-muted-foreground">{feedbacks[feedbacks.length - 1].tip}</p>
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                          <p className="text-xs font-extrabold text-green-700 uppercase tracking-wide mb-2 flex items-center gap-1"><Star className="w-3 h-3" /> Ideal Answer</p>
                          <p className="text-sm text-green-900 leading-relaxed">{currentQ.ideal}</p>
                        </div>
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                          <Button onClick={handleNext} className={`mt-4 w-full bg-gradient-to-r ${role.accent} text-white font-bold shadow-md`}>
                            {qIndex + 1 < sessionQuestions.length ? "Next Question" : "See Results 🎯"} <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </motion.div>
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
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className={`w-28 h-28 rounded-full bg-gradient-to-br ${role?.accent ?? "from-blue-600 to-purple-600"} flex items-center justify-center mx-auto mb-4 shadow-2xl`}
                >
                  <span className="text-white text-3xl font-extrabold">{avgScore}/10</span>
                </motion.div>
                <h1 className="text-2xl font-extrabold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600">Interview Complete!</h1>
                <p className={`text-lg font-bold ${scoreColor}`}>{scoreLabel}</p>
                <p className="text-muted-foreground text-sm mt-1">You answered {feedbacks.length} of {sessionQuestions.length} questions</p>
              </div>

              <div className="space-y-3 mb-8">
                {feedbacks.map((fb, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <Card className="bg-white/90 border shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-foreground mb-1">Q{i + 1}: {fb.question}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">Your answer: {fb.answer}</p>
                          </div>
                          <div className={`text-lg font-extrabold shrink-0 ${fb.score >= 8 ? "text-green-600" : fb.score >= 6 ? "text-blue-600" : "text-orange-500"}`}>
                            {fb.score}/10
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 bg-gray-50 rounded-lg p-2">{fb.tip}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button onClick={() => { setStage("select"); setSelectedRole(null); }} variant="outline" className="flex-1 font-semibold">
                  <RotateCcw className="w-4 h-4 mr-2" /> Try Another Round
                </Button>
                <Link href="/dashboard" className="flex-1">
                  <Button className={`w-full bg-gradient-to-r ${role?.accent ?? "from-blue-600 to-purple-600"} text-white font-bold shadow-md`}>
                    Dashboard <ChevronRight className="ml-2 w-4 h-4" />
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
