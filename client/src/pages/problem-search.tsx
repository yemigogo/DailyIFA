import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, AlertCircle, Heart, Brain, Users, DollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OduPattern from "@/components/odu-pattern";
import type { Odu } from "@shared/schema";

export default function ProblemSearch() {
  const { language, t, ts } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['/api/odus/search', searchTerm],
    enabled: searchTerm.length > 2,
  });

  const commonProblems = [
    { 
      category: ts("Health & Healing", "Ilera ati Iwosan"),
      icon: Heart,
      problems: language === "english" 
        ? ["headache", "healing", "illness", "fatigue", "weakness"]
        : ["ori rirun", "iwosan", "aisan", "are", "ailera"]
    },
    {
      category: ts("Mental & Emotional", "Ọkan ati Ẹdun"),
      icon: Brain,
      problems: language === "english"
        ? ["anxiety", "confusion", "stress", "depression", "overthinking"]
        : ["aniyan", "iporuru", "wahala", "ibanujẹ", "ronu ju"]
    },
    {
      category: ts("Relationships & Family", "Ibaṣepọ ati Ẹbi"),
      icon: Users,
      problems: language === "english"
        ? ["relationship", "family", "marriage", "betrayal", "isolation"]
        : ["ibaṣepọ", "ẹbi", "igbeyawo", "ẹtan", "iyapa"]
    },
    {
      category: ts("Financial & Career", "Owo ati Iṣẹ"),
      icon: DollarSign,
      problems: language === "english"
        ? ["financial", "poverty", "job", "business", "career"]
        : ["owo", "osi", "iṣẹ", "iṣowo", "alamọdaju"]
    }
  ];

  const handleProblemClick = (problem: string) => {
    setSearchTerm(problem);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-950 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
            {ts("Find Odu for Your Problems", "Wa Odu fun Awọn Iṣoro Rẹ")}
          </h1>
          <p className="text-amber-700 dark:text-amber-300">
            {ts(
              "Search for traditional Ifá guidance based on specific life challenges",
              "Wa itọsọna Ifá ibile ti o da lori awọn nija aye kan pato"
            )}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-5 w-5" />
          <Input
            placeholder={ts(
              "Search for problems (e.g., headache, stress, money...)",
              "Wa awọn iṣoro (fun apẹẹrẹ: ori rirun, wahala, owo...)"
            )}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-amber-900 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100"
          />
        </div>

        {/* Problem Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {commonProblems.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.category;
            
            return (
              <Card 
                key={category.category}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected 
                    ? 'ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-900' 
                    : 'bg-white dark:bg-amber-950'
                }`}
                onClick={() => handleCategoryClick(category.category)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm text-amber-900 dark:text-amber-100">
                    <Icon className="h-4 w-4" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                {isSelected && (
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1">
                      {category.problems.map((problem) => (
                        <Badge
                          key={problem}
                          variant="secondary"
                          className="cursor-pointer hover:bg-amber-200 dark:hover:bg-amber-800 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProblemClick(problem);
                          }}
                        >
                          {problem}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Search Results */}
        {searchTerm.length > 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">
              {ts(
                `Results for "${searchTerm}"`,
                `Awọn abajade fun "${searchTerm}"`
              )}
            </h2>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-2 text-amber-700 dark:text-amber-300">
                  {ts("Searching Odu...", "N wa Odu...")}
                </p>
              </div>
            ) : searchResults && (searchResults as Odu[]).length > 0 ? (
              <div className="grid gap-4">
                {(searchResults as Odu[]).map((odu: Odu) => (
                  <Card key={odu.id} className="bg-white dark:bg-amber-950">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-amber-900 dark:text-amber-100">
                            {language === "english" ? odu.name : odu.nameYoruba}
                          </CardTitle>
                          <CardDescription className="text-amber-700 dark:text-amber-300">
                            {language === "english" ? odu.subtitle : odu.subtitleYoruba}
                          </CardDescription>
                        </div>
                        <OduPattern pattern={odu.pattern} className="w-8 h-8" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-amber-800 dark:text-amber-200 text-sm">
                        {language === "english" ? odu.description : odu.descriptionYoruba}
                      </p>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-amber-900 dark:text-amber-100">
                          {ts("Problems this Odu addresses:", "Awọn iṣoro ti Odu yii koju:")}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {(language === "english" ? odu.problems : odu.problemsYoruba)?.map((problem, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {problem}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-amber-900 dark:text-amber-100">
                          {ts("Guidance:", "Itọsọna:")}
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-amber-800 dark:text-amber-200">
                          {(language === "english" ? odu.guidance : odu.guidanceYoruba).map((guide, index) => (
                            <li key={index}>{guide}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : searchTerm.length > 2 ? (
              <Card className="bg-amber-50 dark:bg-amber-900 border-amber-200 dark:border-amber-700">
                <CardContent className="flex items-center gap-3 p-6">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <p className="text-amber-800 dark:text-amber-200">
                    {ts(
                      "No Odu found for this problem. Try different keywords or browse categories above.",
                      "Ko si Odu ti a ri fun iṣoro yii. Gbiyanju awọn koko-ọrọ oriṣiriṣi tabi wa awọn ẹka ti o wa loke."
                    )}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {searchTerm.length === 0 && (
          <Card className="bg-white dark:bg-amber-950">
            <CardContent className="text-center py-8">
              <Search className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-900 dark:text-amber-100 mb-2">
                {ts("Find Guidance for Your Problems", "Wa Itọsọna fun Awọn Iṣoro Rẹ")}
              </h3>
              <p className="text-amber-700 dark:text-amber-300 mb-4">
                {ts(
                  "Search for specific problems or browse categories to discover which Odu can help guide you.",
                  "Wa awọn iṣoro kan pato tabi wa awọn ẹka lati ṣawari eyiti Odu le ṣe iranlọwọ itọsọna fun ọ."
                )}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}