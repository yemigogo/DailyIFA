import UserProfile from "@/components/user-profile";
import YorubaCalendar from "@/components/yoruba-calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProfilePage() {
  const { ts } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
            {ts("Profile & Calendar", "Àkọsílẹ̀ & Kálẹ́ńdà")}
          </h1>
          <p className="text-amber-700 dark:text-amber-300">
            {ts("Customize your spiritual journey and track sacred time", "Ṣètò ìrìnàjò ẹ̀mí rẹ kí o sì tọpinpin àkókò mímọ́")}
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {ts("Profile", "Àkọsílẹ̀")}
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {ts("Calendar", "Kálẹ́ńdà")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <UserProfile />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <YorubaCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}