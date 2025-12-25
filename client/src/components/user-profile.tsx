import { useState } from "react";
import { User, Crown, Palette, Bell, Moon, Sun, Star, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import OrishaAssessment from "./orisha-assessment";
// import EnhancedUserProfile from "./enhanced-user-profile";

interface UserProfileProps {
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
}

const orishaAlignments = [
  { 
    name: "Ọbàtálá", 
    description: "Clarity, peace, wisdom", 
    yoruba: "Ìmọ́lẹ̀, àlàáfíà, ọgbọ́n",
    color: "white",
    traits: ["Peaceful", "Wise", "Pure"]
  },
  { 
    name: "Ògún", 
    description: "Work, iron, progress", 
    yoruba: "Iṣẹ́, irin, ìlọsíwájú",
    color: "green",
    traits: ["Hardworking", "Strong", "Determined"]
  },
  { 
    name: "Ọ̀ṣun", 
    description: "Love, beauty, rivers", 
    yoruba: "Ìfẹ́, ẹwà, odò",
    color: "yellow",
    traits: ["Loving", "Beautiful", "Nurturing"]
  },
  { 
    name: "Yemoja", 
    description: "Motherhood, ocean, protection", 
    yoruba: "Ìyá, òkun, ààbò",
    color: "blue",
    traits: ["Protective", "Maternal", "Wise"]
  },
  { 
    name: "Ṣàngó", 
    description: "Thunder, justice, power", 
    yoruba: "Àrá, òdodo, agbára",
    color: "red",
    traits: ["Powerful", "Just", "Dynamic"]
  },
  { 
    name: "Ọya", 
    description: "Wind, change, warriors", 
    yoruba: "Afẹ́fẹ́, àyípadà, jagunjagun",
    color: "purple",
    traits: ["Changeable", "Strong", "Independent"]
  }
];

const themes = [
  { id: "light", name: "Light Mode", yoruba: "Ìmọ́lẹ̀", icon: Sun },
  { id: "dark", name: "Dark Mode", yoruba: "Òkùnkùn", icon: Moon },
  { id: "orun", name: "Ọ̀run Theme", yoruba: "Kókó Ọ̀run", description: "Heaven theme" },
  { id: "aiye", name: "Ayé Theme", yoruba: "Kókó Ayé", description: "Earth theme" }
];

export default function UserProfile({ onThemeChange, currentTheme = "light" }: UserProfileProps) {
  const [profile, setProfile] = useState({
  name: "",
  orishaAlignment: "",
  notifications: true,
  dailyReminders: true,
  theme: currentTheme,
  age: "", // Add this line
  year: "2025" // Add this line
});
  
  const { ts } = useLanguage();

  const getOrishaColor = (orisha: any) => {
    const colors: { [key: string]: string } = {
      white: "bg-gray-100 text-gray-800 border-gray-300",
      green: "bg-green-100 text-green-800 border-green-300",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-300",
      blue: "bg-blue-100 text-blue-800 border-blue-300",
      red: "bg-red-100 text-red-800 border-red-300",
      purple: "bg-purple-100 text-purple-800 border-purple-300"
    };
    return colors[orisha.color] || "bg-gray-100 text-gray-800";
  };

  const handleThemeChange = (themeId: string) => {
    setProfile(prev => ({ ...prev, theme: themeId }));
    onThemeChange?.(themeId);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="enhanced" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="enhanced" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            {ts("Enhanced", "Àfihàn")}
          </TabsTrigger>
          <TabsTrigger value="basic">
            {ts("Basic Info", "Àlàyé Ìpìlẹ̀")}
          </TabsTrigger>
          <TabsTrigger value="assessment">
            {ts("Orisha Assessment", "Àyẹ̀wò Òrìṣà")}
          </TabsTrigger>
          <TabsTrigger value="settings">
            {ts("Preferences", "Àwọn Ìfẹ́")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enhanced" className="mt-6">
          {/* <EnhancedUserProfile onThemeChange={onThemeChange} currentTheme={currentTheme} /> */}
          <div className="text-center py-8">
            <p className="text-amber-700 dark:text-amber-300">Enhanced features temporarily disabled</p>
          </div>
        </TabsContent>

        <TabsContent value="basic" className="space-y-6">
          {/* Profile Basic Info */}
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <User className="h-5 w-5" />
                {ts("User Profile", "Àkọsílẹ̀ Olùmúlò")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">{ts("Your Name", "Orúkọ Rẹ")}</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={ts("Enter your name", "Kọ orúkọ rẹ")}
                />
              </div>
            </CardContent>
          </Card>
<Card className="mt-6">
  <CardHeader>
    <CardTitle>Personalize Your Daily Reading</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label>Your Age</Label>
      <Input 
        type="number" 
        placeholder="Enter age (e.g. 12 for Isaiah)..." 
        value={profile.age}
        onChange={(e) => setProfile({...profile, age: e.target.value})}
      />
    </div>
    <div className="space-y-2">
      <Label>Reading Year</Label>
      <Select 
        value={profile.year} 
        onValueChange={(value) => setProfile({...profile, year: value})}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2025">2025</SelectItem>
          <SelectItem value="2026">2026</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </CardContent>
</Card>
          
          {/* Manual Orisha Selection */}
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <Crown className="h-5 w-5" />
                {ts("Manual Orisha Selection", "Ìyàn Òrìṣà Fúnrarẹ")}
              </CardTitle>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                {ts("Or choose your Orisha manually if you already know your alignment", "Tàbí yan Òrìṣà rẹ fúnrarẹ tí o bá ti mọ ìbámu rẹ")}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {orishaAlignments.map((orisha) => (
                  <div
                    key={orisha.name}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      profile.orishaAlignment === orisha.name 
                        ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                    }`}
                    onClick={() => setProfile(prev => ({ ...prev, orishaAlignment: orisha.name }))}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                          {orisha.name}
                        </h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                          {orisha.description}
                        </p>
                        <p className="text-xs text-amber-600 dark:text-amber-400 italic mb-3">
                          {orisha.yoruba}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {orisha.traits.map((trait, index) => (
                            <Badge key={index} variant="secondary" className={getOrishaColor(orisha)}>
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full ${getOrishaColor(orisha).split(' ')[0]} border-2`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <OrishaAssessment />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Theme Customization */}
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <Palette className="h-5 w-5" />
                {ts("Theme Customization", "Ìṣètò Àwọ̀")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {themes.map((theme) => {
                  const Icon = theme.icon || Palette;
                  return (
                    <div
                      key={theme.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        profile.theme === theme.id
                          ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                      }`}
                      onClick={() => handleThemeChange(theme.id)}
                    >
                      <div className="text-center space-y-2">
                        <Icon className="h-6 w-6 mx-auto text-amber-600" />
                        <h4 className="font-medium text-amber-900 dark:text-amber-100">
                          {theme.name}
                        </h4>
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                          {theme.yoruba}
                        </p>
                        {theme.description && (
                          <p className="text-xs text-amber-500 dark:text-amber-500">
                            {theme.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <Bell className="h-5 w-5" />
                {ts("Notifications", "Àwọn Ìfiránsẹ́")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">
                    {ts("Daily Ifá Readings", "Kíka Ifá Ojoojúmọ́")}
                  </Label>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {ts("Get notified of your daily reading", "Gbà ìfiránsẹ́ kíka ojoojúmọ́")}
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={profile.notifications}
                  onCheckedChange={(checked) => setProfile(prev => ({ ...prev, notifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reminders">
                    {ts("Orisha Feast Day Alerts", "Ìfiránsẹ́ Ọjọ́ Òrìṣà")}
                  </Label>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {ts("Get reminded of important Orisha festivals", "Rántí ọjọ́ àjọ̀dún Òrìṣà pàtàkì")}
                  </p>
                </div>
                <Switch
                  id="reminders"
                  checked={profile.dailyReminders}
                  onCheckedChange={(checked) => setProfile(prev => ({ ...prev, dailyReminders: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Profile */}
      <div className="flex justify-end">
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
          {ts("Save Profile", "Fi Àkọsílẹ̀ Pamọ́")}
        </Button>
      </div>
    </div>
  );
}