import UserProfile from "@/components/user-profile";
import YorubaCalendar from "@/components/yoruba-calendar";
import AdvancedOrishaAssessment from "@/components/advanced-orisha-assessment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Sparkles, LogIn, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/use-auth";

export default function ProfilePage() {
  const { ts } = useLanguage();
  const { user, isAuthenticated, logout, isLoggingOut } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
            {ts("Profile & Calendar", "Àkọsílẹ̀ & Kálẹ́ńdà")}
          </h1>
          <p className="text-amber-700 dark:text-amber-300">
            {ts("Customize your spiritual journey, track sacred time, and discover your divine Orisha connection", "Ṣètò ìrìnàjò ẹ̀mí rẹ, tọpinpin àkókò mímọ́, kí o sì ṣàwárí ìsopọ̀ Òrìṣà Ọ̀run rẹ")}
          </p>
        </div>

        {/* Authentication Card */}
        <Card className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 border-amber-200 dark:border-gray-600">
          <CardContent className="p-4">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                    {(user as any)?.firstName?.[0] || (user as any)?.email?.[0] || (user as any)?.name?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900 dark:text-amber-100" data-testid="text-user-name">
                      {(user as any)?.firstName ? `${(user as any).firstName} ${(user as any).lastName || ''}`.trim() : (user as any)?.email || (user as any)?.name || ts("User", "Olùmúlò")}
                    </p>
                    <p className="text-sm text-amber-600 dark:text-amber-300">
                      {ts("Logged in", "Ti wọlé")}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => logout()}
                  disabled={isLoggingOut}
                  className="border-amber-300 text-amber-700 hover:bg-amber-100"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {isLoggingOut ? ts("Logging out...", "Ń jáde...") : ts("Logout", "Jáde")}
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-amber-900 dark:text-amber-100">
                    {ts("Sign in for full features", "Wọlé fún ẹ̀yà kíkún")}
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-300">
                    {ts("Save your spiritual journey across devices", "Fi ìrìnàjò ẹ̀mí rẹ pamọ́ lórí àwọn ẹ̀rọ")}
                  </p>
                </div>
                <Button 
                  onClick={() => window.location.href = "/api/login"}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                  data-testid="button-login"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {ts("Login", "Wọlé")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2" data-testid="tab-profile">
              <User className="h-4 w-4" />
              {ts("Profile", "Àkọsílẹ̀")}
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2" data-testid="tab-calendar">
              <Calendar className="h-4 w-4" />
              {ts("Calendar", "Kálẹ́ńdà")}
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center gap-2" data-testid="tab-assessment">
              <Sparkles className="h-4 w-4" />
              {ts("Orisha Assessment", "Ìdánwò Òrìṣà")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <UserProfile />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <YorubaCalendar />
          </TabsContent>

          <TabsContent value="assessment" className="mt-6">
            <AdvancedOrishaAssessment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
