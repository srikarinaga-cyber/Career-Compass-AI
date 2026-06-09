import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Upload, CheckCircle2, Star, Zap, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const tips = [
  "Keep it to 1 page for freshers",
  "Add a GitHub link with live projects",
  "Use strong action verbs: Built, Designed, Optimised",
  "Quantify achievements wherever possible",
  "Tailor the summary to your target role",
  "List skills relevant to the job description first",
];

const sections = [
  { name: "Contact Info", done: true },
  { name: "Education", done: true },
  { name: "Skills", done: false },
  { name: "Projects", done: false },
  { name: "Internships / Experience", done: false },
  { name: "Certifications", done: false },
  { name: "Extra-curricular", done: false },
];

export default function Resume() {
  const [uploaded, setUploaded] = useState(false);
  const [score] = useState(62);

  return (
    <div className="min-h-screen bg-transparent text-foreground font-sans">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <div className="h-5 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-lg">Resume Builder</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3">AI-Powered Resume Review</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">Upload your resume and get an instant score, detailed feedback, and suggestions tailored to your target role.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload area */}
          <div className="lg:col-span-2 space-y-5">
            {!uploaded ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors p-12 text-center cursor-pointer"
                onClick={() => setUploaded(true)}
              >
                <Upload className="w-14 h-14 mx-auto text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Drop your resume here</h3>
                <p className="text-muted-foreground mb-6">PDF or DOCX · Max 5 MB</p>
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90">
                  Browse File
                </Button>
                <p className="text-xs text-muted-foreground mt-4">Or click to simulate an upload →</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold">my_resume.pdf</p>
                      <p className="text-xs text-muted-foreground">Uploaded just now · 420 KB</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-muted-foreground">Resume Score</p>
                    <p className="text-4xl font-extrabold text-blue-600">{score}<span className="text-lg text-muted-foreground">/100</span></p>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                </div>
                <div className="space-y-3">
                  {[
                    { label: "ATS Compatibility", val: 78, color: "from-green-400 to-green-600" },
                    { label: "Keyword Match", val: 55, color: "from-yellow-400 to-orange-500" },
                    { label: "Formatting", val: 90, color: "from-blue-400 to-indigo-600" },
                    { label: "Impact Statements", val: 40, color: "from-red-400 to-rose-500" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold">{item.val}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.val}%` }} transition={{ delay: i * 0.1, duration: 0.8 }} className={`h-full bg-gradient-to-r ${item.color} rounded-full`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90">
                    <Download className="w-4 h-4 mr-2" /> Download Improved Version
                  </Button>
                  <Button variant="outline" onClick={() => setUploaded(false)}>
                    <Upload className="w-4 h-4 mr-2" /> Re-upload
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Checklist */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Resume Completeness</h3>
              <div className="grid grid-cols-2 gap-3">
                {sections.map((s, i) => (
                  <div key={i} className={`flex items-center gap-2 text-sm py-2 px-3 rounded-lg ${s.done ? "bg-green-50 text-green-700" : "bg-gray-50 text-muted-foreground"}`}>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${s.done ? "text-green-500" : "text-gray-300"}`} />
                    {s.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips sidebar */}
          <div className="space-y-5">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border shadow-sm p-5">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> Pro Tips</h3>
              <ul className="space-y-3">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-2xl p-5">
              <h3 className="font-bold mb-2">Premium Feature</h3>
              <p className="text-sm text-blue-100 mb-4">Get a 1-on-1 expert resume review and personalised rewrite — within 24 hours.</p>
              <Button className="w-full bg-white text-blue-700 hover:bg-gray-100 font-semibold">
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
