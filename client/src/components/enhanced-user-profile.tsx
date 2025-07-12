import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  User, Crown, Palette, Bell, Moon, Sun, Star, Heart, Zap, Waves, Mountain, Wind,
  Volume2, VolumeX, Share2, Calendar as CalendarIcon, Trophy, Target, Users,
  Settings, Mic, Speaker, Play, Pause, Clock, MapPin, Edit2, Save, UserPlus,
  Mail, MessageSquare, Globe, Smartphone, Monitor, BookOpen, Award, TrendingUp,
  Activity, BarChart3, Camera, Upload, Download, RefreshCw, CheckCircle2,
  AlertCircle, Info, Plus, Minus, Eye, EyeOff, Lock, Unlock
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { sql, asc, desc, eq } from "drizzle-orm";

interface EnhancedUserProfileProps {
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
}

// Mock user ID for demo - in real app this would come from auth
const DEMO_USER_ID = "demo-user-1";

const orishaProfiles = [
  { 
    name: "Ọbàtálá", 
    description: "Clarity, peace, wisdom", 
    yoruba: "Ìmọ́lẹ̀, àlàáfíà, ọgbọ́n",
    color: "white",
    traits: ["Peaceful", "Wise", "Pure"],
    element: "Air",
    domains: ["Wisdom", "Peace", "Justice"]
  },
  { 
    name: "Ògún", 
    description: "Work, iron, progress", 
    yoruba: "Iṣẹ́, irin, ìlọsíwájú",
    color: "green",
    traits: ["Hardworking", "Strong", "Determined"],
    element: "Iron",
    domains: ["Work", "Technology", "Protection"]
  },
  { 
    name: "Ọ̀ṣun", 
    description: "Love, beauty, rivers", 
    yoruba: "Ìfẹ́, ẹwà, odò",
    color: "yellow",
    traits: ["Loving", "Beautiful", "Nurturing"],
    element: "Water",
    domains: ["Love", "Fertility", "Healing"]
  },
  { 
    name: "Yemọja", 
    description: "Motherhood, ocean, protection", 
    yoruba: "Ìyá, òkun, ààbò",
    color: "blue",
    traits: ["Protective", "Maternal", "Wise"],
    element: "Water",
    domains: ["Motherhood", "Ocean", "Protection"]
  },
  { 
    name: "Ṣàngó", 
    description: "Thunder, justice, power", 
    yoruba: "Àrá, òdodo, agbára",
    color: "red",
    traits: ["Powerful", "Just", "Dynamic"],
    element: "Fire",
    domains: ["Thunder", "Justice", "Power"]
  },
  { 
    name: "Ọya", 
    description: "Wind, change, warriors", 
    yoruba: "Afẹ́fẹ́, àyípadà, jagunjagun",
    color: "purple",
    traits: ["Changeable", "Strong", "Independent"],
    element: "Air",
    domains: ["Wind", "Change", "Transformation"]
  }
];

const practiceTypes = [
  { id: "meditation", name: "Meditation", yoruba: "Ìgbàgbọ́", icon: Sun },
  { id: "prayer", name: "Prayer", yoruba: "Àdúrà", icon: Heart },
  { id: "ritual", name: "Ritual", yoruba: "Ẹbọ", icon: Star },
  { id: "study", name: "Study", yoruba: "Ìkẹ́kọ̀ọ́", icon: BookOpen },
  { id: "chanting", name: "Chanting", yoruba: "Orin", icon: Mic },
  { id: "divination", name: "Divination", yoruba: "Ifá", icon: Crown }
];

const themes = [
  { id: "light", name: "Light Mode", yoruba: "Ìmọ́lẹ̀", icon: Sun },
  { id: "dark", name: "Dark Mode", yoruba: "Òkùnkùn", icon: Moon },
  { id: "orun", name: "Ọ̀run Theme", yoruba: "Kókó Ọ̀run", description: "Heaven theme", colors: ["#87CEEB", "#E6E6FA"] },
  { id: "aiye", name: "Ayé Theme", yoruba: "Kókó Ayé", description: "Earth theme", colors: ["#8B4513", "#228B22"] },
  { id: "obatala", name: "Ọbàtálá Theme", yoruba: "Kókó Ọbàtálá", colors: ["#FFFFFF", "#C0C0C0"] },
  { id: "ogun", name: "Ògún Theme", yoruba: "Kókó Ògún", colors: ["#006400", "#000000"] },
  { id: "oshun", name: "Ọ̀ṣun Theme", yoruba: "Kókó Ọ̀ṣun", colors: ["#FFD700", "#FFA500"] },
  { id: "yemoja", name: "Yemọja Theme", yoruba: "Kókó Yemọja", colors: ["#4169E1", "#87CEEB"] },
  { id: "shango", name: "Ṣàngó Theme", yoruba: "Kókó Ṣàngó", colors: ["#DC143C", "#FFFFFF"] },
  { id: "oya", name: "Ọya Theme", yoruba: "Kókó Ọya", colors: ["#800080", "#9932CC"] }
];

const audioQualities = [
  { id: "low", name: "Low (64kbps)", yoruba: "Kékeré" },
  { id: "medium", name: "Medium (128kbps)", yoruba: "Àárín" },
  { id: "high", name: "High (320kbps)", yoruba: "Gíga" }
];

const speechRates = [
  { id: "slow", name: "Slow", yoruba: "Láìyára" },
  { id: "normal", name: "Normal", yoruba: "Déédéé" },
  { id: "fast", name: "Fast", yoruba: "Yára" }
];

export default function EnhancedUserProfile({ onThemeChange, currentTheme = "light" }: EnhancedUserProfileProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { ts } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // State for all profile sections
  const [basicProfile, setBasicProfile] = useState({
    name: "",
    email: "",
    spiritualName: "",
    location: "",
    bio: "",
    primaryOrisha: "",
    secondaryOrisha: "",
    spiritualLevel: "beginner",
    spiritualGoals: [] as string[]
  });

  const [notificationSettings, setNotificationSettings] = useState({
    dailyReadings: true,
    weeklyInsights: true,
    orishaFeastDays: true,
    practiceReminders: true,
    socialUpdates: false,
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    frequency: "daily",
    reminderTime: "09:00",
    quietHours: { start: "22:00", end: "07:00" }
  });

  const [newPractice, setNewPractice] = useState({
    practiceType: "",
    title: "",
    description: "",
    duration: 15,
    orisha: "",
    location: "",
    materials: [] as string[],
    date: new Date().toISOString().split('T')[0]
  });

  const [themeCustomization, setThemeCustomization] = useState({
    currentTheme: currentTheme,
    orishaTheme: "",
    sacredSymbols: true,
    animations: true,
    highContrast: false,
    reducedMotion: false,
    accentColor: "#d97706",
    fontFamily: "Inter",
    fontSize: "medium"
  });

  const [audioPreferences, setAudioPreferences] = useState({
    pronunciationEnabled: true,
    autoPlay: false,
    volume: 70,
    voiceGender: "any",
    speechRate: "normal",
    pronunciation_dialect: "yoruba_nigeria",
    backgroundSounds: false,
    soundTheme: "traditional",
    audioQuality: "high",
    downloadForOffline: false
  });

  const [newInsight, setNewInsight] = useState({
    title: "",
    content: "",
    orisha: "",
    isPublic: false,
    tags: [] as string[]
  });

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    eventType: "practice",
    date: new Date().toISOString().split('T')[0],
    time: "09:00",
    duration: 60,
    orisha: "",
    reminder: true,
    reminderTime: 60
  });

  // Queries for enhanced profile data
  const { data: userProfile } = useQuery({
    queryKey: ['/api/profile', DEMO_USER_ID],
    queryFn: () => apiRequest(`/api/profile/${DEMO_USER_ID}`),
  });

  const { data: practices } = useQuery({
    queryKey: ['/api/practices', DEMO_USER_ID],
    queryFn: () => apiRequest(`/api/practices/${DEMO_USER_ID}`),
  });

  const { data: achievements } = useQuery({
    queryKey: ['/api/achievements', DEMO_USER_ID],
    queryFn: () => apiRequest(`/api/achievements/${DEMO_USER_ID}`),
  });

  const { data: socialConnections } = useQuery({
    queryKey: ['/api/social', DEMO_USER_ID],
    queryFn: () => apiRequest(`/api/social/${DEMO_USER_ID}`),
  });

  const { data: sharedInsights } = useQuery({
    queryKey: ['/api/insights', DEMO_USER_ID],
    queryFn: () => apiRequest(`/api/insights/${DEMO_USER_ID}`),
  });

  const { data: calendarEvents } = useQuery({
    queryKey: ['/api/calendar', DEMO_USER_ID],
    queryFn: () => apiRequest(`/api/calendar/${DEMO_USER_ID}`),
  });

  // Mutations for profile updates
  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => apiRequest(`/api/profile/${DEMO_USER_ID}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      toast({ title: ts("Profile updated successfully", "Àkọsílẹ̀ ti di títún") });
      queryClient.invalidateQueries({ queryKey: ['/api/profile'] });
    },
  });

  const createPracticeMutation = useMutation({
    mutationFn: (practice: any) => apiRequest('/api/practices', {
      method: 'POST',
      body: JSON.stringify({ ...practice, userId: DEMO_USER_ID }),
    }),
    onSuccess: () => {
      toast({ title: ts("Practice added successfully", "Àdáṣe ti di fífi kún") });
      queryClient.invalidateQueries({ queryKey: ['/api/practices'] });
      setNewPractice({
        practiceType: "",
        title: "",
        description: "",
        duration: 15,
        orisha: "",
        location: "",
        materials: [],
        date: new Date().toISOString().split('T')[0]
      });
    },
  });

  const createInsightMutation = useMutation({
    mutationFn: (insight: any) => apiRequest('/api/insights', {
      method: 'POST',
      body: JSON.stringify({ ...insight, userId: DEMO_USER_ID }),
    }),
    onSuccess: () => {
      toast({ title: ts("Insight shared successfully", "Òye ti di pínpín") });
      queryClient.invalidateQueries({ queryKey: ['/api/insights'] });
      setNewInsight({ title: "", content: "", orisha: "", isPublic: false, tags: [] });
    },
  });

  const createEventMutation = useMutation({
    mutationFn: (event: any) => apiRequest('/api/calendar', {
      method: 'POST',
      body: JSON.stringify({ ...event, userId: DEMO_USER_ID }),
    }),
    onSuccess: () => {
      toast({ title: ts("Event created successfully", "Ìṣẹ̀lẹ̀ ti di dídá") });
      queryClient.invalidateQueries({ queryKey: ['/api/calendar'] });
      setNewEvent({
        title: "",
        description: "",
        eventType: "practice",
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        duration: 60,
        orisha: "",
        reminder: true,
        reminderTime: 60
      });
    },
  });

  const handleSaveProfile = () => {
    updateProfileMutation.mutate({
      ...basicProfile,
      notificationSettings,
      themeCustomization,
      audioPreferences
    });
  };

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
    setThemeCustomization(prev => ({ ...prev, currentTheme: themeId }));
    onThemeChange?.(themeId);
  };

  const addMaterial = (material: string) => {
    if (material.trim()) {
      setNewPractice(prev => ({
        ...prev,
        materials: [...prev.materials, material.trim()]
      }));
    }
  };

  const removeMaterial = (index: number) => {
    setNewPractice(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  const addSpiritualGoal = (goal: string) => {
    if (goal.trim()) {
      setBasicProfile(prev => ({
        ...prev,
        spiritualGoals: [...prev.spiritualGoals, goal.trim()]
      }));
    }
  };

  const removeSpiritualGoal = (index: number) => {
    setBasicProfile(prev => ({
      ...prev,
      spiritualGoals: prev.spiritualGoals.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="basic" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{ts("Basic", "Ìpìlẹ̀")}</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">{ts("Alerts", "Ìfiránsẹ́")}</span>
          </TabsTrigger>
          <TabsTrigger value="practices" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">{ts("Practices", "Àdáṣe")}</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">{ts("Social", "Àjọ")}</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{ts("Calendar", "Kálẹ́ńdà")}</span>
          </TabsTrigger>
          <TabsTrigger value="assessment" className="flex items-center gap-1">
            <Crown className="h-4 w-4" />
            <span className="hidden sm:inline">{ts("Orisha", "Òrìṣà")}</span>
          </TabsTrigger>
          <TabsTrigger value="themes" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">{ts("Themes", "Àwọ̀")}</span>
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-1">
            <Volume2 className="h-4 w-4" />
            <span className="hidden sm:inline">{ts("Audio", "Ohùn")}</span>
          </TabsTrigger>
        </TabsList>

        {/* Basic Info Tab - Enhanced */}
        <TabsContent value="basic" className="space-y-6">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <User className="h-5 w-5" />
                {ts("Enhanced Profile Information", "Àlàyé Àkọsílẹ̀ Àfihàn")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{ts("Full Name", "Orúkọ Kíkún")}</Label>
                  <Input
                    id="name"
                    value={basicProfile.name}
                    onChange={(e) => setBasicProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={ts("Enter your full name", "Kọ orúkọ kíkún rẹ")}
                  />
                </div>
                <div>
                  <Label htmlFor="spiritual-name">{ts("Spiritual Name", "Orúkọ Ẹ̀mí")}</Label>
                  <Input
                    id="spiritual-name"
                    value={basicProfile.spiritualName}
                    onChange={(e) => setBasicProfile(prev => ({ ...prev, spiritualName: e.target.value }))}
                    placeholder={ts("Your spiritual name if you have one", "Orúkọ ẹ̀mí rẹ tí o bá ní")}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{ts("Email Address", "Àdírẹ́sì Ímeèlì")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={basicProfile.email}
                    onChange={(e) => setBasicProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder={ts("your.email@example.com", "ímeèlì.rẹ@àpẹẹrẹ.com")}
                  />
                </div>
                <div>
                  <Label htmlFor="location">{ts("Location", "Ibùgbé")}</Label>
                  <Input
                    id="location"
                    value={basicProfile.location}
                    onChange={(e) => setBasicProfile(prev => ({ ...prev, location: e.target.value }))}
                    placeholder={ts("City, Country", "Ìlú, Orílẹ̀-èdè")}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">{ts("Bio / Spiritual Journey", "Àkọsílẹ̀ Ìrìnàjò Ẹ̀mí")}</Label>
                <Textarea
                  id="bio"
                  value={basicProfile.bio}
                  onChange={(e) => setBasicProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder={ts("Share your spiritual journey and interests", "Sọ̀rọ̀ nípa ìrìnàjò ẹ̀mí àti àwọn ohun tí o fẹ́")}
                  rows={4}
                />
              </div>

              <div>
                <Label>{ts("Spiritual Level", "Ipò Ẹ̀mí")}</Label>
                <Select value={basicProfile.spiritualLevel} onValueChange={(value) => setBasicProfile(prev => ({ ...prev, spiritualLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">{ts("Beginner", "Ọmọ Ẹ̀kọ́")}</SelectItem>
                    <SelectItem value="intermediate">{ts("Intermediate", "Àárín")}</SelectItem>
                    <SelectItem value="advanced">{ts("Advanced", "Òye Àgbà")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{ts("Spiritual Goals", "Àfojúsùn Ẹ̀mí")}</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {basicProfile.spiritualGoals.map((goal, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {goal}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeSpiritualGoal(index)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder={ts("Add a spiritual goal", "Fí àfojúsùn ẹ̀mí kún")}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSpiritualGoal(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addSpiritualGoal(input.value);
                      input.value = '';
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Display */}
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <Trophy className="h-5 w-5" />
                {ts("Achievements & Progress", "Àṣeyọrí àti Ìlọsíwájú")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <div className="text-2xl font-bold text-amber-600">{userProfile?.totalPracticeHours || 0}</div>
                  <div className="text-sm text-amber-700 dark:text-amber-300">{ts("Practice Hours", "Wákàtí Àdáṣe")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="text-2xl font-bold text-green-600">{userProfile?.streak || 0}</div>
                  <div className="text-sm text-green-700 dark:text-green-300">{ts("Current Streak", "Ìtẹ̀síwájú Lọ́wọ́")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-2xl font-bold text-blue-600">{achievements?.length || 0}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">{ts("Achievements", "Àṣeyọrí")}</div>
                </div>
              </div>
              
              {achievements && achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">{ts("Recent Achievements", "Àṣeyọrí Tuntun")}</h4>
                  <div className="flex flex-wrap gap-2">
                    {achievements.slice(0, 6).map((achievement: any, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {achievement.badgeName}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Notification Settings Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <Bell className="h-5 w-5" />
                {ts("Advanced Notification Preferences", "Ètò Ìfiránsẹ́ Àfihàn")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Notifications */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {ts("Content Notifications", "Ìfiránsẹ́ Àkóónú")}
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{ts("Daily Ifá Readings", "Kíka Ifá Ojoojúmọ́")}</Label>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {ts("Get notified of your daily reading", "Gbà ìfiránsẹ́ kíka ojoojúmọ́")}
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.dailyReadings}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, dailyReadings: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{ts("Weekly Spiritual Insights", "Òye Ẹ̀mí Ọ̀sẹ̀")}</Label>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {ts("Receive weekly spiritual guidance", "Gbà ìmọ̀nà ẹ̀mí ọ̀sẹ̀")}
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyInsights}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, weeklyInsights: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{ts("Orisha Feast Day Alerts", "Ìfiránsẹ́ Ọjọ́ Òrìṣà")}</Label>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {ts("Get reminded of important Orisha festivals", "Rántí ọjọ́ àjọ̀dún Òrìṣà pàtàkì")}
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.orishaFeastDays}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, orishaFeastDays: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{ts("Practice Reminders", "Ìrántí Àdáṣe")}</Label>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {ts("Reminders for your spiritual practices", "Ìrántí fún àdáṣe ẹ̀mí rẹ")}
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.practiceReminders}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, practiceReminders: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{ts("Social Updates", "Ìmọ̀ Àjọ")}</Label>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {ts("Updates from your spiritual community", "Ìmọ̀ láti ọ̀dọ̀ àwùjọ ẹ̀mí rẹ")}
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.socialUpdates}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, socialUpdates: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Delivery Methods */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  {ts("Delivery Methods", "Ọ̀nà Ìfiránṣẹ́")}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <Label>{ts("Email", "Ímeèlì")}</Label>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <Label>{ts("Push", "Títa")}</Label>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      <Label>{ts("Sound", "Ohùn")}</Label>
                    </div>
                    <Switch
                      checked={notificationSettings.soundEnabled}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, soundEnabled: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Timing Settings */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {ts("Timing & Schedule", "Àkókò àti Ètò")}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{ts("Notification Frequency", "Ìgbà Ìfiránsẹ́")}</Label>
                    <Select 
                      value={notificationSettings.frequency} 
                      onValueChange={(value) => setNotificationSettings(prev => ({ ...prev, frequency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">{ts("Daily", "Ojoojúmọ́")}</SelectItem>
                        <SelectItem value="weekly">{ts("Weekly", "Ọ̀sẹ̀")}</SelectItem>
                        <SelectItem value="custom">{ts("Custom", "Àdáṣe")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>{ts("Preferred Time", "Àkókò Tí a Fẹ́")}</Label>
                    <Input
                      type="time"
                      value={notificationSettings.reminderTime}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, reminderTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{ts("Quiet Hours", "Wákàtí Ìdákẹ́")}</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">{ts("Start", "Ìbẹ̀rẹ̀")}</Label>
                      <Input
                        type="time"
                        value={notificationSettings.quietHours.start}
                        onChange={(e) => setNotificationSettings(prev => ({ 
                          ...prev, 
                          quietHours: { ...prev.quietHours, start: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">{ts("End", "Ìparí")}</Label>
                      <Input
                        type="time"
                        value={notificationSettings.quietHours.end}
                        onChange={(e) => setNotificationSettings(prev => ({ 
                          ...prev, 
                          quietHours: { ...prev.quietHours, end: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    {ts("No notifications will be sent during these hours", "Kò sí ìfiránsẹ́ tí a ó fi ránṣẹ́ lákókò yìí")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Spiritual Practice Tracking Tab */}
        <TabsContent value="practices" className="space-y-6">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <Activity className="h-5 w-5" />
                {ts("Spiritual Practice Tracking", "Ìtọpinpin Àdáṣe Ẹ̀mí")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Practice Form */}
              <div className="space-y-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <h4 className="font-medium">{ts("Log New Practice", "Kọ Àdáṣe Tuntun Sílẹ̀")}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{ts("Practice Type", "Irú Àdáṣe")}</Label>
                    <Select value={newPractice.practiceType} onValueChange={(value) => setNewPractice(prev => ({ ...prev, practiceType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={ts("Select practice type", "Yan irú àdáṣe")} />
                      </SelectTrigger>
                      <SelectContent>
                        {practiceTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              <type.icon className="h-4 w-4" />
                              <span>{type.name}</span>
                              <span className="text-xs text-amber-600">({type.yoruba})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>{ts("Associated Orisha", "Òrìṣà Tí ó Jọmọ́")}</Label>
                    <Select value={newPractice.orisha} onValueChange={(value) => setNewPractice(prev => ({ ...prev, orisha: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={ts("Select Orisha", "Yan Òrìṣà")} />
                      </SelectTrigger>
                      <SelectContent>
                        {orishaProfiles.map((orisha) => (
                          <SelectItem key={orisha.name} value={orisha.name}>
                            {orisha.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>{ts("Practice Title", "Àkọlé Àdáṣe")}</Label>
                  <Input
                    value={newPractice.title}
                    onChange={(e) => setNewPractice(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={ts("Brief title for your practice", "Àkọlé kúkúrú fún àdáṣe rẹ")}
                  />
                </div>

                <div>
                  <Label>{ts("Description", "Àlàyé")}</Label>
                  <Textarea
                    value={newPractice.description}
                    onChange={(e) => setNewPractice(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={ts("Describe what you did during this practice", "Ṣàlàyé ohun tí o ṣe lákókò àdáṣe yìí")}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>{ts("Duration (minutes)", "Ìgbà (ìṣẹ́jú)")}</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[newPractice.duration]}
                        onValueChange={([value]) => setNewPractice(prev => ({ ...prev, duration: value }))}
                        max={240}
                        min={5}
                        step={5}
                        className="w-full"
                      />
                      <div className="text-center text-sm text-amber-600">{newPractice.duration} {ts("minutes", "ìṣẹ́jú")}</div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>{ts("Date", "Ọjọ́")}</Label>
                    <Input
                      type="date"
                      value={newPractice.date}
                      onChange={(e) => setNewPractice(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label>{ts("Location", "Ibùgbé")}</Label>
                    <Input
                      value={newPractice.location}
                      onChange={(e) => setNewPractice(prev => ({ ...prev, location: e.target.value }))}
                      placeholder={ts("Where did you practice?", "Níbo ni o ṣe àdáṣe?")}
                    />
                  </div>
                </div>

                <div>
                  <Label>{ts("Materials Used", "Àwọn Ohun Èlò Tí a Lò")}</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newPractice.materials.map((material, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {material}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => removeMaterial(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder={ts("Add material (candle, incense, etc.)", "Fí ohun èlò kún (fitílà, tùràrí, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ)")}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addMaterial(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addMaterial(input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => createPracticeMutation.mutate(newPractice)}
                  disabled={!newPractice.practiceType || !newPractice.title || createPracticeMutation.isPending}
                  className="w-full"
                >
                  {createPracticeMutation.isPending ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  {ts("Log Practice", "Kọ Àdáṣe Sílẹ̀")}
                </Button>
              </div>

              <Separator />

              {/* Recent Practices */}
              <div className="space-y-4">
                <h4 className="font-medium">{ts("Recent Practices", "Àdáṣe Tuntun")}</h4>
                
                {practices && practices.length > 0 ? (
                  <div className="space-y-3">
                    {practices.slice(0, 5).map((practice: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{practice.practiceType}</Badge>
                              {practice.orisha && (
                                <Badge variant="secondary">{practice.orisha}</Badge>
                              )}
                              <span className="text-sm text-amber-600">{practice.duration} {ts("min", "ìṣẹ́jú")}</span>
                            </div>
                            <h5 className="font-medium">{practice.title}</h5>
                            {practice.description && (
                              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                                {practice.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-amber-600">
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                {practice.date}
                              </span>
                              {practice.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {practice.location}
                                </span>
                              )}
                            </div>
                          </div>
                          {practice.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-amber-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-amber-600">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>{ts("No practices logged yet", "Kò sí àdáṣe tí a kọ sílẹ̀ síbẹ̀")}</p>
                    <p className="text-sm">{ts("Start tracking your spiritual journey", "Bẹ̀rẹ̀ sí í tọpinpin ìrìnàjò ẹ̀mí rẹ")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Social Features Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <Users className="h-5 w-5" />
                {ts("Spiritual Community & Sharing", "Àwùjọ Ẹ̀mí àti Pínpín")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Share Insight Form */}
              <div className="space-y-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <h4 className="font-medium flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  {ts("Share Spiritual Insight", "Pín Òye Ẹ̀mí")}
                </h4>
                
                <div>
                  <Label>{ts("Insight Title", "Àkọlé Òye")}</Label>
                  <Input
                    value={newInsight.title}
                    onChange={(e) => setNewInsight(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={ts("What insight would you like to share?", "Òye wo ni o fẹ́ pín?")}
                  />
                </div>

                <div>
                  <Label>{ts("Your Insight", "Òye Rẹ")}</Label>
                  <Textarea
                    value={newInsight.content}
                    onChange={(e) => setNewInsight(prev => ({ ...prev, content: e.target.value }))}
                    placeholder={ts("Share your spiritual experience or insight...", "Pín ìrírí tàbí òye ẹ̀mí rẹ...")}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{ts("Related Orisha", "Òrìṣà Tí ó Jọmọ́")}</Label>
                    <Select value={newInsight.orisha} onValueChange={(value) => setNewInsight(prev => ({ ...prev, orisha: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={ts("Select if related to specific Orisha", "Yan tí ó bá jọmọ́ Òrìṣà pàtó")} />
                      </SelectTrigger>
                      <SelectContent>
                        {orishaProfiles.map((orisha) => (
                          <SelectItem key={orisha.name} value={orisha.name}>
                            {orisha.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{ts("Make Public", "Ṣé Ní Gbogbogbò")}</Label>
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        {ts("Share with the community", "Pín pẹ̀lú àwùjọ")}
                      </p>
                    </div>
                    <Switch
                      checked={newInsight.isPublic}
                      onCheckedChange={(checked) => setNewInsight(prev => ({ ...prev, isPublic: checked }))}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => createInsightMutation.mutate(newInsight)}
                  disabled={!newInsight.title || !newInsight.content || createInsightMutation.isPending}
                  className="w-full"
                >
                  {createInsightMutation.isPending ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Share2 className="h-4 w-4 mr-2" />
                  )}
                  {ts("Share Insight", "Pín Òye")}
                </Button>
              </div>

              <Separator />

              {/* Community Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-2xl font-bold text-blue-600">{socialConnections?.length || 0}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">{ts("Connections", "Àsopọ̀")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="text-2xl font-bold text-green-600">{sharedInsights?.length || 0}</div>
                  <div className="text-sm text-green-700 dark:text-green-300">{ts("Insights Shared", "Òye Tí a Pín")}</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <div className="text-2xl font-bold text-purple-600">
                    {sharedInsights?.reduce((sum: number, insight: any) => sum + (insight.likes || 0), 0) || 0}
                  </div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">{ts("Total Likes", "Àpọ́jù Ìfẹ́")}</div>
                </div>
              </div>

              {/* Recent Shared Insights */}
              <div className="space-y-4">
                <h4 className="font-medium">{ts("Your Recent Insights", "Òye Tuntun Rẹ")}</h4>
                
                {sharedInsights && sharedInsights.length > 0 ? (
                  <div className="space-y-3">
                    {sharedInsights.slice(0, 3).map((insight: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium">{insight.title}</h5>
                          <div className="flex items-center gap-2">
                            {insight.isPublic ? (
                              <Badge variant="default">{ts("Public", "Gbogbogbò")}</Badge>
                            ) : (
                              <Badge variant="secondary">{ts("Private", "Àsàkò")}</Badge>
                            )}
                            {insight.orisha && (
                              <Badge variant="outline">{insight.orisha}</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                          {insight.content.substring(0, 150)}
                          {insight.content.length > 150 && "..."}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-amber-600">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {insight.likes || 0} {ts("likes", "ìfẹ́")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-3 w-3" />
                            {insight.shares || 0} {ts("shares", "pínpín")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-amber-600">
                    <Share2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>{ts("No insights shared yet", "Kò sí òye tí a pín síbẹ̀")}</p>
                    <p className="text-sm">{ts("Share your spiritual journey with others", "Pín ìrìnàjò ẹ̀mí rẹ pẹ̀lú àwọn mìíràn")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Calendar Integration Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <CalendarIcon className="h-5 w-5" />
                {ts("Spiritual Calendar & Events", "Kálẹ́ńdà Ẹ̀mí àti Àwọn Ìṣẹ̀lẹ̀")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Event Form */}
              <div className="space-y-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                <h4 className="font-medium flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {ts("Schedule Spiritual Event", "Ṣètò Ìṣẹ̀lẹ̀ Ẹ̀mí")}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{ts("Event Title", "Àkọlé Ìṣẹ̀lẹ̀")}</Label>
                    <Input
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder={ts("Name your spiritual event", "Sọ orúkọ ìṣẹ̀lẹ̀ ẹ̀mí rẹ")}
                    />
                  </div>
                  
                  <div>
                    <Label>{ts("Event Type", "Irú Ìṣẹ̀lẹ̀")}</Label>
                    <Select value={newEvent.eventType} onValueChange={(value) => setNewEvent(prev => ({ ...prev, eventType: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="practice">{ts("Practice Session", "Ìgbà Àdáṣe")}</SelectItem>
                        <SelectItem value="ritual">{ts("Ritual Ceremony", "Àyájọ́ Ẹbọ")}</SelectItem>
                        <SelectItem value="feast_day">{ts("Orisha Feast Day", "Ọjọ́ Àjọ̀dún Òrìṣà")}</SelectItem>
                        <SelectItem value="reminder">{ts("Spiritual Reminder", "Ìrántí Ẹ̀mí")}</SelectItem>
                        <SelectItem value="study">{ts("Study Session", "Ìgbà Ìkẹ́kọ̀ọ́")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>{ts("Description", "Àlàyé")}</Label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={ts("Describe the spiritual event or practice", "Ṣàlàyé ìṣẹ̀lẹ̀ tàbí àdáṣe ẹ̀mí náà")}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>{ts("Date", "Ọjọ́")}</Label>
                    <Input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label>{ts("Time", "Àkókò")}</Label>
                    <Input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label>{ts("Duration (min)", "Ìgbà (ìṣẹ́jú)")}</Label>
                    <Input
                      type="number"
                      value={newEvent.duration}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
                      min="5"
                      max="480"
                    />
                  </div>
                  
                  <div>
                    <Label>{ts("Orisha", "Òrìṣà")}</Label>
                    <Select value={newEvent.orisha} onValueChange={(value) => setNewEvent(prev => ({ ...prev, orisha: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={ts("Select", "Yan")} />
                      </SelectTrigger>
                      <SelectContent>
                        {orishaProfiles.map((orisha) => (
                          <SelectItem key={orisha.name} value={orisha.name}>
                            {orisha.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{ts("Reminder", "Ìrántí")}</Label>
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      {ts("Get notified before the event", "Gbà ìfiránsẹ́ ṣáájú ìṣẹ̀lẹ̀ náà")}
                    </p>
                  </div>
                  <Switch
                    checked={newEvent.reminder}
                    onCheckedChange={(checked) => setNewEvent(prev => ({ ...prev, reminder: checked }))}
                  />
                </div>

                {newEvent.reminder && (
                  <div>
                    <Label>{ts("Remind me", "Rán mi létí")} {newEvent.reminderTime} {ts("minutes before", "ìṣẹ́jú ṣáájú")}</Label>
                    <Slider
                      value={[newEvent.reminderTime]}
                      onValueChange={([value]) => setNewEvent(prev => ({ ...prev, reminderTime: value }))}
                      max={1440}
                      min={5}
                      step={5}
                      className="w-full mt-2"
                    />
                  </div>
                )}

                <Button
                  onClick={() => createEventMutation.mutate(newEvent)}
                  disabled={!newEvent.title || !newEvent.date || createEventMutation.isPending}
                  className="w-full"
                >
                  {createEventMutation.isPending ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CalendarIcon className="h-4 w-4 mr-2" />
                  )}
                  {ts("Schedule Event", "Ṣètò Ìṣẹ̀lẹ̀")}
                </Button>
              </div>

              <Separator />

              {/* Calendar View and Upcoming Events */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">{ts("Calendar", "Kálẹ́ńdà")}</h4>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">{ts("Upcoming Events", "Àwọn Ìṣẹ̀lẹ̀ Tí Ń Bọ̀")}</h4>
                  
                  {calendarEvents && calendarEvents.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {calendarEvents.slice(0, 10).map((event: any, index: number) => (
                        <div key={index} className="p-3 rounded-lg border">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium">{event.title}</h5>
                            <Badge variant="outline">{event.eventType}</Badge>
                          </div>
                          {event.description && (
                            <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                              {event.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-amber-600">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {event.time}
                            </span>
                            {event.orisha && (
                              <Badge variant="secondary" className="text-xs">
                                {event.orisha}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-amber-600">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>{ts("No events scheduled", "Kò sí ìṣẹ̀lẹ̀ tí a ṣètò")}</p>
                      <p className="text-sm">{ts("Schedule your spiritual practices", "Ṣètò àwọn àdáṣe ẹ̀mí rẹ")}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Continue with remaining tabs... */}
        {/* I'll create the remaining tabs (assessment, themes, audio) in the next part */}
        
        {/* Advanced Orisha Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <Crown className="h-5 w-5" />
                {ts("Advanced Orisha Assessment", "Àyẹ̀wò Òrìṣà Àfihàn")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8 text-amber-600">
                <Crown className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">{ts("Enhanced Assessment Coming Soon", "Àyẹ̀wò Àfihàn Ń Bọ̀")}</h3>
                <p className="text-sm max-w-md mx-auto">
                  {ts("A comprehensive multi-dimensional assessment to discover your spiritual alignments with detailed personality, elemental, and spiritual compatibility analysis.", "Àyẹ̀wò tí ó kún fun láti ṣàwárí ìbámu ẹ̀mí rẹ pẹ̀lú àlàyé ìwà, ọmọ ẹ̀dá, àti ìwádìí ìbámu ẹ̀mí.")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Theme Customization Tab */}
        <TabsContent value="themes" className="space-y-6">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <Palette className="h-5 w-5" />
                {ts("Enhanced Theme Customization", "Ìṣètò Àwọ̀ Àfihàn")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Selection */}
              <div className="space-y-4">
                <h4 className="font-medium">{ts("Choose Your Theme", "Yan Àwọ̀ Rẹ")}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {themes.map((theme) => {
                    const Icon = theme.icon || Palette;
                    return (
                      <div
                        key={theme.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          themeCustomization.currentTheme === theme.id
                            ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/30'
                            : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                        }`}
                        onClick={() => handleThemeChange(theme.id)}
                      >
                        <div className="text-center space-y-2">
                          <Icon className="h-8 w-8 mx-auto text-amber-600" />
                          <h5 className="font-medium text-amber-900 dark:text-amber-100">
                            {theme.name}
                          </h5>
                          <p className="text-xs text-amber-600 dark:text-amber-400">
                            {theme.yoruba}
                          </p>
                          {theme.colors && (
                            <div className="flex justify-center gap-1 mt-2">
                              {theme.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-3 h-3 rounded-full border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Accessibility Options */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {ts("Accessibility Options", "Àwọn Àṣàyàn Ìwọlé")}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <Label>{ts("High Contrast", "Ìyàtọ̀ Gíga")}</Label>
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        {ts("Increase text contrast", "Mu ìyàtọ̀ ọ̀rọ̀ pọ̀ sí")}
                      </p>
                    </div>
                    <Switch
                      checked={themeCustomization.highContrast}
                      onCheckedChange={(checked) => setThemeCustomization(prev => ({ ...prev, highContrast: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <Label>{ts("Reduced Motion", "Ìlúpọ̀ Kékeré")}</Label>
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        {ts("Minimize animations", "Dín àwọn ìmísí kù")}
                      </p>
                    </div>
                    <Switch
                      checked={themeCustomization.reducedMotion}
                      onCheckedChange={(checked) => setThemeCustomization(prev => ({ ...prev, reducedMotion: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <Label>{ts("Sacred Symbols", "Àwọn Àmì Mímọ́")}</Label>
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        {ts("Show traditional symbols", "Fi àwọn àmì àgbà hàn")}
                      </p>
                    </div>
                    <Switch
                      checked={themeCustomization.sacredSymbols}
                      onCheckedChange={(checked) => setThemeCustomization(prev => ({ ...prev, sacredSymbols: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <Label>{ts("Animations", "Àwọn Ìmísí")}</Label>
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        {ts("Enable smooth transitions", "Mu àwọn ìyípadà rọrùn ṣiṣẹ́")}
                      </p>
                    </div>
                    <Switch
                      checked={themeCustomization.animations}
                      onCheckedChange={(checked) => setThemeCustomization(prev => ({ ...prev, animations: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Font & Display Settings */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {ts("Font & Display", "Írú Lẹ́tà àti Ìfihàn")}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{ts("Font Family", "Ìdílé Lẹ́tà")}</Label>
                    <Select 
                      value={themeCustomization.fontFamily} 
                      onValueChange={(value) => setThemeCustomization(prev => ({ ...prev, fontFamily: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>{ts("Font Size", "Ìwọ̀n Lẹ́tà")}</Label>
                    <Select 
                      value={themeCustomization.fontSize} 
                      onValueChange={(value) => setThemeCustomization(prev => ({ ...prev, fontSize: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">{ts("Small", "Kékeré")}</SelectItem>
                        <SelectItem value="medium">{ts("Medium", "Àárín")}</SelectItem>
                        <SelectItem value="large">{ts("Large", "Ńlá")}</SelectItem>
                        <SelectItem value="extra-large">{ts("Extra Large", "Ńlá Púpọ̀")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>{ts("Accent Color", "Àwọ̀ Àfihàn")}</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={themeCustomization.accentColor}
                      onChange={(e) => setThemeCustomization(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={themeCustomization.accentColor}
                      onChange={(e) => setThemeCustomization(prev => ({ ...prev, accentColor: e.target.value }))}
                      placeholder="#d97706"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Audio Preferences Tab */}
        <TabsContent value="audio" className="space-y-6">
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
                <Volume2 className="h-5 w-5" />
                {ts("Enhanced Audio Preferences", "Ètò Ohùn Àfihàn")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Audio Controls */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Speaker className="h-4 w-4" />
                  {ts("Audio Controls", "Ìṣàkoso Ohùn")}
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{ts("Pronunciation Audio", "Ohùn Sísọ")}</Label>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {ts("Enable Yoruba pronunciation guides", "Mu ìtọ́sọ̀nà sísọ Yorùbá ṣiṣẹ́")}
                      </p>
                    </div>
                    <Switch
                      checked={audioPreferences.pronunciationEnabled}
                      onCheckedChange={(checked) => setAudioPreferences(prev => ({ ...prev, pronunciationEnabled: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{ts("Auto-play Audio", "Ìdásílẹ̀ Fúnra")}</Label>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {ts("Automatically play pronunciations", "Dá sísọ sílẹ̀ fúnrarẹ̀")}
                      </p>
                    </div>
                    <Switch
                      checked={audioPreferences.autoPlay}
                      onCheckedChange={(checked) => setAudioPreferences(prev => ({ ...prev, autoPlay: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{ts("Background Sounds", "Àwọn Ohùn Ẹ̀yìn")}</Label>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {ts("Traditional spiritual background sounds", "Àwọn ohùn ẹ̀yìn ẹ̀mí àtìjọ́")}
                      </p>
                    </div>
                    <Switch
                      checked={audioPreferences.backgroundSounds}
                      onCheckedChange={(checked) => setAudioPreferences(prev => ({ ...prev, backgroundSounds: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>{ts("Download for Offline", "Gba fún Àìsínípò")}</Label>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        {ts("Cache audio files for offline use", "Tọ́jú àwọn fáìlì ohùn fún lílò lórí")}
                      </p>
                    </div>
                    <Switch
                      checked={audioPreferences.downloadForOffline}
                      onCheckedChange={(checked) => setAudioPreferences(prev => ({ ...prev, downloadForOffline: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Volume and Quality Settings */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {ts("Audio Settings", "Ètò Ohùn")}
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <Label>{ts("Volume", "Ìwọ̀n Ohùn")} ({audioPreferences.volume}%)</Label>
                    <Slider
                      value={[audioPreferences.volume]}
                      onValueChange={([value]) => setAudioPreferences(prev => ({ ...prev, volume: value }))}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{ts("Speech Rate", "Ìyára Ọ̀rọ̀")}</Label>
                      <Select 
                        value={audioPreferences.speechRate} 
                        onValueChange={(value) => setAudioPreferences(prev => ({ ...prev, speechRate: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {speechRates.map((rate) => (
                            <SelectItem key={rate.id} value={rate.id}>
                              <div className="flex items-center gap-2">
                                <span>{rate.name}</span>
                                <span className="text-xs text-amber-600">({rate.yoruba})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>{ts("Voice Gender", "Akọ/Abo Ohùn")}</Label>
                      <Select 
                        value={audioPreferences.voiceGender} 
                        onValueChange={(value) => setAudioPreferences(prev => ({ ...prev, voiceGender: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">{ts("Any", "Èyíkéyìí")}</SelectItem>
                          <SelectItem value="male">{ts("Male", "Akọ")}</SelectItem>
                          <SelectItem value="female">{ts("Female", "Abo")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{ts("Audio Quality", "Ìdára Ohùn")}</Label>
                      <Select 
                        value={audioPreferences.audioQuality} 
                        onValueChange={(value) => setAudioPreferences(prev => ({ ...prev, audioQuality: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {audioQualities.map((quality) => (
                            <SelectItem key={quality.id} value={quality.id}>
                              <div className="flex items-center gap-2">
                                <span>{quality.name}</span>
                                <span className="text-xs text-amber-600">({quality.yoruba})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>{ts("Sound Theme", "Kókó Ohùn")}</Label>
                      <Select 
                        value={audioPreferences.soundTheme} 
                        onValueChange={(value) => setAudioPreferences(prev => ({ ...prev, soundTheme: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="traditional">{ts("Traditional", "Àtìjọ́")}</SelectItem>
                          <SelectItem value="modern">{ts("Modern", "Òde-òní")}</SelectItem>
                          <SelectItem value="nature">{ts("Nature", "Àdáyébá")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>{ts("Pronunciation Dialect", "Èdè Sísọ")}</Label>
                    <Select 
                      value={audioPreferences.pronunciation_dialect} 
                      onValueChange={(value) => setAudioPreferences(prev => ({ ...prev, pronunciation_dialect: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yoruba_nigeria">{ts("Nigerian Yoruba", "Yorùbá Nàìjíríà")}</SelectItem>
                        <SelectItem value="yoruba_benin">{ts("Benin Yoruba", "Yorùbá Bẹ̀nẹ̀")}</SelectItem>
                        <SelectItem value="yoruba_togo">{ts("Togo Yoruba", "Yorùbá Togo")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Audio Test */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  {ts("Test Audio Settings", "Dán Ètò Ohùn Wò")}
                </h4>
                
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                    {ts("Test your audio settings with a sample pronunciation", "Dán ètò ohùn rẹ wò pẹ̀lú àpẹẹrẹ sísọ")}
                  </p>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      {ts("Test: 'Ifá'", "Dánwò: 'Ifá'")}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      {ts("Test: 'Òrìṣà'", "Dánwò: 'Òrìṣà'")}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      {ts("Test: 'Àṣẹ'", "Dánwò: 'Àṣẹ'")}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save All Settings */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          {ts("Reset Changes", "Tún Àwọn Àyípadà Ṣe")}
        </Button>
        <Button 
          onClick={handleSaveProfile}
          disabled={updateProfileMutation.isPending}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          {updateProfileMutation.isPending ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {ts("Save All Settings", "Fi Gbogbo Ètò Pamọ́")}
        </Button>
      </div>
    </div>
  );
}