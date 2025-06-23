import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Leaf, Clock, AlertTriangle, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { getQueryFn } from "@/lib/queryClient";
import type { EboRecommendation } from "@shared/schema";

interface EboRecommendationsProps {
  oduId?: number;
  showFilters?: boolean;
}

export default function EboRecommendations({ oduId, showFilters = true }: EboRecommendationsProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const { ts } = useLanguage();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: oduId ? ["/api/ebo-recommendations", { oduId }] : ["/api/ebo-recommendations"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredRecommendations = (recommendations as EboRecommendation[] || []).filter(rec => {
    const categoryMatch = categoryFilter === "all" || rec.category === categoryFilter;
    const difficultyMatch = difficultyFilter === "all" || rec.difficulty === difficultyFilter;
    return categoryMatch && difficultyMatch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      clarity: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
      protection: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
      wisdom: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      prosperity: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      healing: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      transformation: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
      advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
          {ts("Ẹbọ Recommendations", "Àwọn Ìmọ̀ràn Ẹbọ")}
        </h2>
        {showFilters && (
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-amber-600" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={ts("Category", "Ẹ̀ka")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{ts("All Categories", "Gbogbo Ẹ̀ka")}</SelectItem>
                <SelectItem value="clarity">{ts("Clarity", "Ìmọ́")}</SelectItem>
                <SelectItem value="protection">{ts("Protection", "Ààbò")}</SelectItem>
                <SelectItem value="wisdom">{ts("Wisdom", "Ọgbọ́n")}</SelectItem>
                <SelectItem value="prosperity">{ts("Prosperity", "Ọrọ̀")}</SelectItem>
                <SelectItem value="healing">{ts("Healing", "Ìwòsàn")}</SelectItem>
                <SelectItem value="transformation">{ts("Transformation", "Àyípadà")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={ts("Difficulty", "Àṣewéré")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{ts("All Levels", "Gbogbo Ipò")}</SelectItem>
                <SelectItem value="beginner">{ts("Beginner", "Ìbẹ̀rẹ̀")}</SelectItem>
                <SelectItem value="intermediate">{ts("Intermediate", "Àárín")}</SelectItem>
                <SelectItem value="advanced">{ts("Advanced", "Àgbà")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {filteredRecommendations.map((rec) => (
          <Card key={rec.id} className="bg-white dark:bg-amber-950 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getCategoryColor(rec.category)}>
                      {ts(rec.category, rec.category)}
                    </Badge>
                    <Badge className={getDifficultyColor(rec.difficulty)}>
                      {ts(rec.difficulty, rec.difficulty)}
                    </Badge>
                  </div>
                  <CardTitle className="text-amber-900 dark:text-amber-100">
                    {ts(rec.title, rec.titleYoruba)}
                  </CardTitle>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-2">
                    {ts(rec.description, rec.descriptionYoruba)}
                  </p>
                </div>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(rec.id)}
                      className="ml-4"
                    >
                      {expandedItems.has(rec.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>
            </CardHeader>

            <Collapsible open={expandedItems.has(rec.id)}>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {/* Materials */}
                  <div>
                    <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2 flex items-center">
                      <Leaf className="h-4 w-4 mr-2" />
                      {ts("Required Materials", "Àwọn Ohun Èlò")}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {ts("English:", "Gẹ̀ẹ́sì:")}
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {rec.materials.map((material, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                              {material}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {ts("Yoruba:", "Yorùbá:")}
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {rec.materialsYoruba.map((material, index) => (
                            <li key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                              {material}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Herbs */}
                  {rec.herbs && rec.herbs.length > 0 && (
                    <div>
                      <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                        {ts("Traditional Herbs", "Àwọn Ewébẹ Ìbílẹ̀")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {rec.herbs.map((herb, index) => (
                              <li key={index} className="flex items-center">
                                <Leaf className="h-3 w-3 text-green-500 mr-2" />
                                {herb}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {rec.herbsYoruba?.map((herb, index) => (
                              <li key={index} className="flex items-center">
                                <Leaf className="h-3 w-3 text-green-500 mr-2" />
                                {herb}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Procedure */}
                  <div>
                    <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                      {ts("Procedure", "Ìlànà")}
                    </h4>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                      <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                        {ts(rec.procedure, rec.procedureYoruba)}
                      </p>
                    </div>
                  </div>

                  {/* Timing */}
                  {rec.timing && (
                    <div>
                      <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {ts("Best Timing", "Àkókò Tó Dára Jù")}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ts(rec.timing, rec.timingYoruba || rec.timing)}
                      </p>
                    </div>
                  )}

                  {/* Precautions */}
                  {rec.precautions && rec.precautions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                        {ts("Important Precautions", "Àwọn Ìkìlọ̀ Pàtàkì")}
                      </h4>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                        <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                          {rec.precautions.map((precaution, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-3 w-3 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                              {precaution}
                            </li>
                          ))}
                        </ul>
                        {rec.precautionsYoruba && (
                          <div className="mt-3 pt-3 border-t border-orange-200 dark:border-orange-800">
                            <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                              {rec.precautionsYoruba.map((precaution, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-orange-500 mr-2">•</span>
                                  {precaution}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
                    <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                      {ts(
                        "⚠️ Important: These are traditional practices for educational purposes. Always consult with a qualified Babalawo or spiritual advisor before performing any rituals.",
                        "⚠️ Pàtàkì: Àwọn wọ̀nyí jẹ́ àṣà ìbílẹ̀ fún ẹ̀kọ́. Màá bá Babáláwo tàbí olùrànlọ́wọ́ ẹ̀mí tó yẹ kí o gbà ìmọ̀ràn ṣáájú ṣíṣe ẹbọ kankan."
                      )}
                    </p>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}

        {filteredRecommendations.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {ts("No ẹbọ recommendations found for the selected criteria.", "Ko sí ìmọ̀ràn ẹbọ kankan fún àwọn òfin tí a yàn.")}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}