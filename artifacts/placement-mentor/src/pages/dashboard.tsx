import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Map, 
  Video, 
  CheckSquare, 
  FolderGit2, 
  FileText, 
  Trophy, 
  Settings,
  Bell,
  Search,
  Flame,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  MessageCircle,
  Calculator,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/use-profile";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

export default function Dashboard() {
  const { profile, firstName, clearProfile } = useProfile();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    clearProfile();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-transparent flex font-sans text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                PlacementAI
              </span>
            </div>
          </Link>
        </div>

        {/* Profile summary */}
        {profile && (
          <div className="px-4 mb-4">
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-9 h-9 rounded-full border-2 border-blue-200 bg-white"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{profile.name}</p>
                <p className="text-xs text-muted-foreground truncate">{profile.college}</p>
              </div>
            </div>
          </div>
        )}
        
        <nav className="flex-1 px-4 space-y-1">
          {[
            { icon: <LayoutDashboard size={18} />, label: "Dashboard", link: "/dashboard", active: true },
            { icon: <Map size={18} />, label: "My Roadmap", link: "/roadmap" },
            { icon: <Video size={18} />, label: "Practice Interviews", link: "/mock-interview" },
            { icon: <CheckSquare size={18} />, label: "Skill Assessment", link: "/assessment" },
            { icon: <FolderGit2 size={18} />, label: "Projects", link: "#" },
            { icon: <FileText size={18} />, label: "Resume", link: "#" },
            { icon: <Trophy size={18} />, label: "Leaderboard", link: "/leaderboard" },
          ].map((item, i) => (
            <Link key={i} href={item.link} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-foreground"}`}>
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 mt-auto border-t dark:border-zinc-800 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-foreground transition-colors">
            <Settings size={18} />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            data-testid="button-logout"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search resources, topics..." className="w-full bg-gray-50 dark:bg-zinc-950 border-none pl-9 h-9" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
            </Button>
            <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-blue-200 bg-white">
              {profile?.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" data-testid="img-avatar-header" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {firstName.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1" data-testid="text-welcome">
                {getGreeting()}, {firstName || "there"}!
              </h1>
              <p className="text-blue-100 flex items-center gap-2">
                {profile?.targetRole ? `Target: ${profile.targetRole} · ` : ""}
                You're on a 7-day learning streak <Flame className="w-5 h-5 text-orange-400 fill-orange-400" /> Keep it up!
              </p>
            </div>
            <div className="hidden sm:block">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">Resume Roadmap</Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <CheckSquare size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Skills Assessed</p>
                  <h3 className="text-2xl font-bold">12/15</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Video size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mock Interviews</p>
                  <h3 className="text-2xl font-bold">4</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                  <Map size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Roadmap Progress</p>
                  <h3 className="text-2xl font-bold">Week 4</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Flame size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Streak Days</p>
                  <h3 className="text-2xl font-bold">7</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column (2/3) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Skill Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Progress</CardTitle>
                  <CardDescription>Your current proficiency across key areas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { label: "Data Structures & Algorithms", value: 72, icon: <BrainCircuit size={16} /> },
                    { label: "System Design", value: 45, icon: <TrendingUp size={16} /> },
                    { label: "Communication", value: 83, icon: <MessageCircle size={16} /> },
                    { label: "Aptitude", value: 68, icon: <Calculator size={16} /> }
                  ].map((skill, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2 font-medium">
                          <span className="text-muted-foreground">{skill.icon}</span>
                          {skill.label}
                        </div>
                        <span className="font-bold">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommended Projects */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle>Recommended Projects</CardTitle>
                    <CardDescription>Based on your target role ({profile?.targetRole || "Software Engineer"})</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary">View All <ChevronRight size={16} /></Button>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4 mt-4">
                  {[
                    { title: "Real-time Chat App", stack: ["React", "Socket.io", "Node.js"], diff: "Medium" },
                    { title: "E-commerce Dashboard", stack: ["Next.js", "Tailwind", "Prisma"], diff: "Hard" }
                  ].map((project, i) => (
                    <div key={i} className="border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer group">
                      <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.stack.map(tech => (
                          <span key={tech} className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-zinc-800 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Difficulty: {project.diff}</span>
                        <span className="flex items-center gap-1 text-primary"><FolderGit2 size={12} /> Start</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>

            {/* Right Column (1/3) */}
            <div className="space-y-6">
              
              {/* Readiness Score */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold text-muted-foreground mb-4">Interview Readiness Score</h3>
                  <div className="relative w-32 h-32 mx-auto flex items-center justify-center rounded-full border-8 border-primary/20 border-t-primary">
                    <div className="text-3xl font-extrabold text-primary">78</div>
                  </div>
                  <p className="text-sm mt-4 font-medium text-foreground">
                    You are in the top 20% of {profile?.college || "your college"}!
                  </p>
                </CardContent>
              </Card>

              {/* Daily Goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { text: "Solve 2 LeetCode Mediums", done: true },
                    { text: "Watch System Design basics", done: true },
                    { text: "Read 1 React article", done: true },
                    { text: "Complete Array Mock Interview", done: false },
                    { text: "Update resume objective", done: false }
                  ].map((goal, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {goal.done ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-zinc-700 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${goal.done ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                        {goal.text}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-blue-900/50">
                    <Clock className="w-5 h-5 mt-0.5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-sm">Frontend Mock Interview</h4>
                      <p className="text-xs mt-1 opacity-80">Today at 6:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
