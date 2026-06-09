import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Assessment from "@/pages/assessment";
import Onboarding from "@/pages/onboarding";
import MockInterview from "@/pages/mock-interview";
import Roadmap from "@/pages/roadmap";
import Leaderboard from "@/pages/leaderboard";
import About from "@/pages/about";
import Resume from "@/pages/resume";
import Projects from "@/pages/projects";
import Contact from "@/pages/contact";
import { useProfile } from "@/hooks/use-profile";
import { LanguageProvider } from "@/contexts/language-context";

const queryClient = new QueryClient();

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { profile, loading } = useProfile();
  if (loading) return null;
  if (!profile) return <Redirect to="/onboarding" />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/dashboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/assessment" component={Assessment} />
      <Route path="/mock-interview" component={MockInterview} />
      <Route path="/roadmap">
        {() => <ProtectedRoute component={Roadmap} />}
      </Route>
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/resume">
        {() => <ProtectedRoute component={Resume} />}
      </Route>
      <Route path="/projects">
        {() => <ProtectedRoute component={Projects} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
