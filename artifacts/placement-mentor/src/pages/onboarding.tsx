import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, User, GraduationCap, BookOpen, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile, UserProfile } from "@/hooks/use-profile";

const BRANCHES = ["Computer Science", "Information Technology", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Other"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Recent Graduate"];
const ROLES = ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Analyst", "Data Scientist", "DevOps Engineer", "Other"];

const AVATARS = [
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Raj&backgroundColor=b6e3f4",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Priya&backgroundColor=c0aede",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Arjun&backgroundColor=d1f4d1",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Ananya&backgroundColor=ffd5dc",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Ravi&backgroundColor=ffe4b5",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=Sneha&backgroundColor=e0d7ff",
];

type Step = 0 | 1 | 2 | 3;

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { saveProfile } = useProfile();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState({
    name: "",
    college: "",
    branch: "",
    year: "",
    targetRole: "",
    avatar: AVATARS[0],
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const canNext = () => {
    if (step === 0) return form.name.trim().length >= 2 && form.college.trim().length >= 2;
    if (step === 1) return form.branch !== "" && form.year !== "";
    if (step === 2) return form.targetRole !== "";
    return true;
  };

  const next = () => {
    if (step < 3) setStep(s => (s + 1) as Step);
  };

  const finish = () => {
    saveProfile(form as UserProfile);
    setLocation("/dashboard");
  };

  const steps = [
    { label: "Your Name", icon: <User className="w-5 h-5" /> },
    { label: "Education", icon: <GraduationCap className="w-5 h-5" /> },
    { label: "Goals", icon: <Briefcase className="w-5 h-5" /> },
    { label: "Pick Avatar", icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 font-sans">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="text-white font-bold text-lg">P</span>
        </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">PlacementAI</span>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i === step ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/30" : i < step ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-zinc-400"}`}>
              {i < step ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 transition-all ${i < step ? "bg-green-400" : "bg-gray-200 dark:bg-zinc-700"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {/* Step 0 — Name & College */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border p-8"
            >
              <h2 className="text-2xl font-bold mb-1">Welcome! Let's get started</h2>
              <p className="text-muted-foreground text-sm mb-8">Tell us a bit about yourself so we can personalise your experience.</p>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="font-semibold mb-1.5 block">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={e => set("name", e.target.value)}
                    className="h-11"
                    data-testid="input-name"
                    autoFocus
                  />
                </div>
                <div>
                  <Label htmlFor="college" className="font-semibold mb-1.5 block">College / University <span className="text-red-500">*</span></Label>
                  <Input
                    id="college"
                    placeholder="e.g. JNTU Hyderabad"
                    value={form.college}
                    onChange={e => set("college", e.target.value)}
                    className="h-11"
                    data-testid="input-college"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 1 — Branch & Year */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border p-8"
            >
              <h2 className="text-2xl font-bold mb-1">Your Education</h2>
              <p className="text-muted-foreground text-sm mb-8">This helps us tailor your roadmap to your background.</p>
              <div className="space-y-5">
                <div>
                  <Label className="font-semibold mb-3 block">Branch / Department</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {BRANCHES.map(b => (
                      <button
                        key={b}
                        onClick={() => set("branch", b)}
                        data-testid={`button-branch-${b}`}
                        className={`text-left px-3 py-2.5 rounded-lg text-sm border-2 transition-all font-medium ${form.branch === b ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" : "border-transparent bg-gray-50 dark:bg-zinc-800 hover:border-blue-300"}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="font-semibold mb-3 block">Year of Study</Label>
                  <div className="flex flex-wrap gap-2">
                    {YEARS.map(y => (
                      <button
                        key={y}
                        onClick={() => set("year", y)}
                        data-testid={`button-year-${y}`}
                        className={`px-4 py-2 rounded-lg text-sm border-2 transition-all font-medium ${form.year === y ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" : "border-transparent bg-gray-50 dark:bg-zinc-800 hover:border-blue-300"}`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2 — Target Role */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border p-8"
            >
              <h2 className="text-2xl font-bold mb-1">Your Target Role</h2>
              <p className="text-muted-foreground text-sm mb-8">We'll build projects and interview prep around this role.</p>
              <div className="grid grid-cols-2 gap-3">
                {ROLES.map(role => (
                  <button
                    key={role}
                    onClick={() => set("targetRole", role)}
                    data-testid={`button-role-${role}`}
                    className={`text-left px-4 py-3 rounded-xl text-sm border-2 transition-all font-medium ${form.targetRole === role ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300" : "border-transparent bg-gray-50 dark:bg-zinc-800 hover:border-purple-300"}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3 — Avatar */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border p-8"
            >
              <h2 className="text-2xl font-bold mb-1">Choose your avatar</h2>
              <p className="text-muted-foreground text-sm mb-8">Pick the one that feels most like you, {form.name.split(" ")[0]}!</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {AVATARS.map((av, i) => (
                  <button
                    key={i}
                    onClick={() => set("avatar", av)}
                    data-testid={`button-avatar-${i}`}
                    className={`relative p-1 rounded-2xl border-3 transition-all ${form.avatar === av ? "border-4 border-blue-500 shadow-md shadow-blue-200" : "border-4 border-transparent hover:border-blue-200"}`}
                  >
                    <img src={av} alt={`Avatar ${i + 1}`} className="w-full h-auto rounded-xl" />
                  </button>
                ))}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                All set, <span className="font-semibold text-foreground">{form.name}</span>! Click below to enter your dashboard.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          {step > 0 ? (
            <button
              onClick={() => setStep(s => (s - 1) as Step)}
              className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
              data-testid="button-back"
            >
              ← Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <Button
              onClick={next}
              disabled={!canNext()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 h-11 disabled:opacity-40"
              data-testid="button-next-step"
            >
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={finish}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 h-11 shadow-lg shadow-blue-500/30"
              data-testid="button-finish-onboarding"
            >
              Go to My Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
