import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { EncyclopediaProvider } from "@/components/encyclopedia/encyclopedia-provider";
import Home from "@/pages/home";
import History from "@/pages/history";
import Learn from "@/pages/learn";
import Learning from "@/pages/learning";

import LearningSimple from "@/pages/learning-simple";
import ProblemSearch from "@/pages/problem-search";
import DailyPrayers from "@/pages/daily-prayers";
import DivinationLogsPage from "@/pages/divination-logs";
import ProfilePage from "@/pages/profile";
import OrikiPlayback from "@/pages/oriki-playback";
import OrishaProfiles from "@/pages/orisha-profiles";
import Odu256Page from "@/pages/odu-256";
import { Link } from "wouter";
import BottomNavigation from "@/components/bottom-navigation";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/learning" component={Learning} />
      <Route path="/history" component={History} />
      <Route path="/learn" component={Learn} />
      <Route path="/encyclopedia" component={() => <div>Encyclopedia Coming Soon</div>} />
      <Route path="/orisha-calendar" component={Learn} />
      <Route path="/diaspora" component={Learn} />
      <Route path="/oriki" component={OrikiPlayback} />
      <Route path="/orisha-profiles" component={OrishaProfiles} />
      <Route path="/odu-256" component={Odu256Page} />
      <Route path="/search" component={ProblemSearch} />
      <Route path="/prayers" component={DailyPrayers} />
      <Route path="/logs" component={DivinationLogsPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen relative overflow-x-hidden">
            <main className="pb-16 sm:pb-20 page-transition">
              <Router />
            </main>
            <BottomNavigation />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
