import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Home, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { useLocation } from "wouter";
import { 
  generateOduCatalog, 
  filterByType, 
  searchCatalog 
} from "@/data/odu-catalog";

export default function Odu256Page() {
  const { user: profile } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "major" | "minor">("all");
  const cardsPerPage = 16;
// This logic determines the life stage for a proper reading
const getLifeStage = (age: number) => {
  if (age <= 18) return "Youth"; // Wisdom for Isaiah
  if (age > 18 && age < 60) return "Adult";
  return "Elder";
};

// This uses the Year you just added to the profile
const currentReadingYear = profile.year || "2025";
  const lifeStage = getLifeStage(profile.age);
  const fullCatalog = useMemo(() => generateOduCatalog(), []);

  // Filter catalog based on search and category
  const filteredOdus = useMemo(() => {
    let filtered = filterByType(fullCatalog, selectedCategory);
    filtered = searchCatalog(filtered, searchQuery);
    return filtered;
  }, [fullCatalog, searchQuery, selectedCategory]);

  // Paginate results
  const totalPages = Math.ceil(filteredOdus.length / cardsPerPage);
  const paginatedOdus = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    return filteredOdus.slice(startIndex, startIndex + cardsPerPage);
  }, [filteredOdus, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 md:p-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="flex items-center gap-2"
              data-testid="button-home"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Complete 256 Odu Ifá System
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the complete corpus of Ifá wisdom through all 256 Odu combinations. 
            Discover the 16 major Odu Méjì and 240 minor Odu with authentic Yoruba names, 
            meanings, and spiritual guidance.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search Odu by name or number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="search-input"
                />
              </div>

              {/* Filter Tabs */}
              <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all" data-testid="filter-all">
                    All 256
                  </TabsTrigger>
                  <TabsTrigger value="major" data-testid="filter-major">
                    Major (16)
                  </TabsTrigger>
                  <TabsTrigger value="minor" data-testid="filter-minor">
                    Minor (240)
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Results Count and Clear */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Found <span className="font-semibold">{filteredOdus.length}</span> Odu matching "{searchQuery || 'all'}"
                </p>
                {(searchQuery || selectedCategory !== "all") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {filteredOdus.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No Odu found matching your search</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Odu Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {paginatedOdus.map((odu) => (
                <Card 
                  key={odu.id} 
                  className="group cursor-pointer hover:shadow-xl transition-shadow overflow-hidden"
                  data-testid={`card-odu-${odu.id}`}
                >
                  <div className="aspect-[3/4] relative">
                    <img
                      src={odu.imagePath}
                      alt={`${odu.name} - ${odu.subtitle}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <p className="font-semibold text-sm mb-1">{odu.name}</p>
                        <p className="text-xs opacity-90 line-clamp-2">{odu.subtitle}</p>
                      </div>
                    </div>
                    {/* Card Number Badge */}
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-semibold">
                      #{odu.id}
                    </div>
                    {/* Major Odu Badge */}
                    {odu.isMajor && (
                      <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
                        Major
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <p className="font-semibold text-sm text-center truncate">{odu.name}</p>
                    <p className="text-xs text-gray-600 text-center truncate">{odu.nameYoruba || odu.subtitle}</p>
         <div className="mt-2 pt-2 border-t border-amber-100/50">
  <p className="text-xs text-amber-900/80 italic line-clamp-3">
    {lifeStage === "Youth" ? (odu.youthAdvice || "Guidance for your journey...") : 
     lifeStage === "Adult" ? (odu.adultAdvice || "Wisdom for your path...") : 
     (odu.elderAdvice || odu.description || "Ancient wisdom...")}
  </p>
</div>     
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  data-testid="button-prev-page"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <span className="px-4 py-2 bg-amber-100 rounded-lg text-amber-800 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  data-testid="button-next-page"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
