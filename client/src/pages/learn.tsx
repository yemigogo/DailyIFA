import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Star, Lightbulb, Heart, Search, Filter } from "lucide-react";
import { Odu, DailyReadingWithOdu } from "@shared/schema";
import { useLocation } from "wouter";
import OduPattern from "@/components/odu-pattern";
import OduIfaImage from "@/components/odu-ifa-image";
import { useLanguage } from "@/contexts/LanguageContext";
import InteractiveYorubaText from "@/components/interactive-yoruba-text";
import { formatDate } from "@/lib/date-utils";
import { useState, useMemo, useEffect } from "react";
import { 
  generateOduCatalog, 
  mergeCatalogWithApiData, 
  filterByType, 
  searchCatalog 
} from "@/data/odu-catalog";

export default function Learn() {
  const [, setLocation] = useLocation();
  const { language, ts } = useLanguage();
  const todayDate = formatDate(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "major" | "minor">("all");

  const { data: odus = [], isLoading } = useQuery<Odu[]>({
    queryKey: ["/api/odus"],
  });

  const { data: todaysReading } = useQuery<DailyReadingWithOdu>({
    queryKey: [`/api/readings/${todayDate}`],
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 32; // Show 32 cards per page for better mobile performance

  // Generate catalog and merge with API data
  const catalogWithData = useMemo(() => {
    const catalog = generateOduCatalog();
    return mergeCatalogWithApiData(catalog, odus);
  }, [odus]);

  // Filter cards based on search and type
  const filteredCards = useMemo(() => {
    let filtered = filterByType(catalogWithData, filterType);
    filtered = searchCatalog(filtered, searchQuery);
    return filtered;
  }, [catalogWithData, searchQuery, filterType]);

  // Paginate filtered results
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const paginatedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    return filteredCards.slice(startIndex, startIndex + cardsPerPage);
  }, [filteredCards, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sacred-gold/20">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="p-2 text-spiritual-blue hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sacred-gold rounded-full flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <h1 className="font-crimson font-bold text-spiritual-blue text-xl">
              Learn About Ifá
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Today's Sacred Odu */}
        {todaysReading && (
          <Card className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-300 dark:border-amber-700">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-3 text-center">
                {ts("Today's Sacred Odu", "Odù Mímọ́ Òní")}
              </h3>
              <div className="flex items-center justify-center gap-3">
                <OduIfaImage oduName={todaysReading.odu.name} size={80} />
                <div className="text-left">
                  <p className="font-bold text-amber-900 dark:text-amber-100">
                    {todaysReading.odu.name}
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    {language === "english" ? todaysReading.odu.subtitle : todaysReading.odu.subtitleYoruba}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Introduction */}
        <Card className="bg-gradient-to-r from-sacred-gold/10 to-spiritual-blue/10 border-sacred-gold/20">
          <CardContent className="p-6">
            <h2 className="font-crimson text-xl font-bold text-spiritual-blue mb-3">
              The Wisdom of Ifá
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Ifá is an ancient African spiritual tradition that originated among the Yoruba people. It is a system of divination that provides guidance, wisdom, and insight into life's challenges and opportunities through the sacred verses known as Odu.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-spiritual-blue rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs font-medium text-spiritual-blue">Wisdom</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-sage-green rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs font-medium text-spiritual-blue">Guidance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-sacred-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs font-medium text-spiritual-blue">Healing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Controls */}
        <Card className="border-sacred-gold/10">
          <CardContent className="p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={ts("Search Odu by name or number...", "Wa Odù nípa orúkọ tàbí nọ́mbà...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-odu"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
                className="flex-1"
                data-testid="button-filter-all"
              >
                {ts("All", "Gbogbo")} ({catalogWithData.length})
              </Button>
              <Button
                variant={filterType === "major" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("major")}
                className="flex-1"
                data-testid="button-filter-major"
              >
                {ts("Major", "Àkọ́kọ́")} (16)
              </Button>
              <Button
                variant={filterType === "minor" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("minor")}
                className="flex-1"
                data-testid="button-filter-minor"
              >
                {ts("Combined", "Àpapọ̀")} (240)
              </Button>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600 text-center">
              {ts(
                `Showing ${filteredCards.length} Odu`,
                `Ń fihàn ${filteredCards.length} Odù`
              )}
            </p>
          </CardContent>
        </Card>

        {/* The Complete 256 Odu Grid */}
        <Card className="border-sacred-gold/10">
          <CardContent className="p-6">
            <h3 className="font-crimson text-lg font-semibold text-spiritual-blue mb-4">
              {filterType === "major" 
                ? ts("The 16 Major Odu", "Àwọn Odù Àkọ́kọ́ 16") 
                : filterType === "minor"
                ? ts("The 240 Combined Odu", "Àwọn Odù Àpapọ̀ 240")
                : ts("The Complete 256 Sacred Odu", "Àwọn Odù Mímọ́ 256 Pípé")
              }
            </h3>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-100 rounded-lg">
                    <Skeleton className="w-full h-full" />
                  </div>
                ))}
              </div>
            ) : filteredCards.length === 0 ? (
              <div className="text-center py-12" data-testid="text-no-results">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  {ts(
                    "No Odu found matching your search",
                    "Ko sí Odù tí o bamu pẹ̀lú ìwádìí rẹ"
                  )}
                </p>
              </div>
            ) : (
              <>
                {/* Odu Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {paginatedCards.map((odu) => (
                    <div 
                      key={odu.id} 
                      className="group cursor-pointer"
                      data-testid={`card-odu-${odu.id}`}
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-black/5 relative">
                        <img
                          src={odu.imagePath}
                          alt={`${odu.name} - ${odu.subtitle}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                            <p className="font-semibold text-sm mb-1">{odu.name}</p>
                            <p className="text-xs opacity-90">{language === "english" ? odu.subtitle : odu.subtitleYoruba}</p>
                          </div>
                        </div>
                        {/* Card Number Badge */}
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-semibold">
                          {odu.id}
                        </div>
                        {/* Major Odu Badge */}
                        {odu.isMajor && (
                          <div className="absolute top-2 left-2 bg-sacred-gold text-white text-xs px-2 py-1 rounded-md font-semibold">
                            {ts("Major", "Àkọ́kọ́")}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className="font-semibold text-xs text-spiritual-blue truncate">{odu.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      data-testid="button-page-prev"
                    >
                      {ts("Previous", "Ṣáájú")}
                    </Button>
                    <span className="text-sm text-gray-600 mx-4">
                      {ts(`Page ${currentPage} of ${totalPages}`, `Ojú-ìwé ${currentPage} nínú ${totalPages}`)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      data-testid="button-page-next"
                    >
                      {ts("Next", "Tókàn")}
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* How to Use */}
        <Card className="border-sacred-gold/10">
          <CardContent className="p-6">
            <h3 className="font-crimson text-lg font-semibold text-spiritual-blue mb-4">
              How to Use Daily Readings
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sacred-gold rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-spiritual-blue">Morning Reflection</h4>
                  <p className="text-sm text-gray-600">
                    Read your daily Odu each morning to set intentions and receive guidance for the day ahead.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sacred-gold rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-spiritual-blue">Contemplate the Message</h4>
                  <p className="text-sm text-gray-600">
                    Spend time thinking about how the Odu's wisdom applies to your current situation and challenges.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sacred-gold rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-spiritual-blue">Apply the Guidance</h4>
                  <p className="text-sm text-gray-600">
                    Take practical steps based on the Odu's guidance throughout your day.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sacred-gold rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-spiritual-blue">Evening Reflection</h4>
                  <p className="text-sm text-gray-600">
                    Reflect on how the day's events connected to your morning reading and what you learned.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Respect and Understanding */}
        <Card className="bg-gradient-to-r from-sage-green/10 to-sacred-gold/10 border-sage-green/20">
          <CardContent className="p-6">
            <h3 className="font-crimson text-lg font-semibold text-spiritual-blue mb-3">
              Approaching Ifá with Respect
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Ifá is a sacred tradition that should be approached with respect, humility, and an open heart. These daily readings are meant to provide guidance and inspiration while honoring the deep wisdom of this ancient spiritual practice.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
