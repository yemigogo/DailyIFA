import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ChevronLeft, ChevronRight, Play, Pause, Volume2 } from "lucide-react";
import { InteractiveYorubaText } from "@/components/interactive-yoruba-text";

interface OduData {
  id: number;
  name: string;
  nameYoruba: string;
  category: 'major' | 'minor';
  primaryOdu: string;
  secondaryOdu?: string;
  meaning: string;
  meaningYoruba: string;
  proverb: string;
  proverbYoruba: string;
  audioUrl: string;
  spiritualFocus: string[];
  guidance: string;
  guidanceYoruba: string;
}

interface OduResponse {
  odus: OduData[];
  totalPages: number;
  currentPage: number;
  totalOdus: number;
}

export default function Odu256Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "major" | "minor" | "all-256">("all");
  const [selectedOdu, setSelectedOdu] = useState<OduData | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<"english" | "yoruba">("english");

  // Fetch paginated Odu data
  const { data: oduData, isLoading } = useQuery<OduResponse>({
    queryKey: [`/api/odus/complete?page=${currentPage}&limit=16`],
    enabled: !searchQuery && selectedCategory === "all"
  });

  // Search Odu
  const { data: searchResults, isLoading: isSearching } = useQuery<{ results: OduData[]; count: number }>({
    queryKey: [`/api/odus/search-complete?q=${searchQuery}`],
    enabled: !!searchQuery
  });

  // Get Odu by category
  const { data: categoryData, isLoading: isCategoryLoading } = useQuery<{ odus: OduData[]; count: number }>({
    queryKey: [`/api/odus/category/${selectedCategory}`],
    enabled: selectedCategory !== "all" && selectedCategory !== "all-256" && !searchQuery
  });

  // Get all 256 Odu at once
  const { data: all256Data, isLoading: isAll256Loading } = useQuery<{ odus: OduData[]; totalOdus: number; majorOdus: number; minorOdus: number }>({
    queryKey: ["/api/odus/all-256"],
    enabled: selectedCategory === "all-256" && !searchQuery
  });

  // Random Odu for daily inspiration
  const { data: randomOdu } = useQuery<OduData>({
    queryKey: ["/api/odus/random"]
  });

  const displayedOdus = searchQuery 
    ? searchResults?.results || []
    : selectedCategory === "all-256"
    ? all256Data?.odus || []
    : selectedCategory !== "all" 
    ? categoryData?.odus || []
    : oduData?.odus || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage(1);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.volume = 0.8;
    audio.playbackRate = 0.95;
    audio.play().catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Complete 256 Odu Ifá System
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the complete corpus of Ifá wisdom through all 256 Odu combinations. 
            Discover the 16 major Odu Méjì and 240 minor Odu with authentic Yoruba names, 
            meanings, and spiritual guidance.
          </p>
        </div>

        {/* Random Daily Odu */}
        {randomOdu && (
          <Card className="mb-8 border-amber-200 bg-gradient-to-r from-amber-100 to-orange-100">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-amber-600" />
                <CardTitle className="text-amber-800">Today's Spiritual Guidance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    <InteractiveYorubaText text={randomOdu.nameYoruba} />
                  </h3>
                  <p className="text-amber-700 mb-3">{randomOdu.meaning}</p>
                  <p className="italic text-amber-600 mb-2">"{randomOdu.proverb}"</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => playAudio(randomOdu.audioUrl)}
                    className="bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Pronunciation
                  </Button>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Spiritual Focus</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {randomOdu.spiritualFocus.map((focus, index) => (
                      <Badge key={index} variant="secondary" className="bg-amber-200 text-amber-800">
                        {focus}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-amber-700 text-sm">
                    {currentLanguage === "english" ? randomOdu.guidance : randomOdu.guidanceYoruba}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search Odu by name, meaning, or spiritual focus..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </form>
              
              <div className="flex gap-2 items-center">
                <Filter className="w-4 h-4 text-gray-500" />
                <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
                  <TabsList className="bg-amber-100">
                    <TabsTrigger value="all">Paginated</TabsTrigger>
                    <TabsTrigger value="all-256">All 256</TabsTrigger>
                    <TabsTrigger value="major">Major (16)</TabsTrigger>
                    <TabsTrigger value="minor">Minor (240)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Button 
                variant="outline" 
                onClick={() => setCurrentLanguage(currentLanguage === "english" ? "yoruba" : "english")}
                className="whitespace-nowrap"
              >
                {currentLanguage === "english" ? "Show Yoruba" : "Show English"}
              </Button>

              {(searchQuery || selectedCategory !== "all") && (
                <Button variant="ghost" onClick={clearSearch}>
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          {searchQuery && searchResults && (
            <p className="text-gray-600">
              Found {searchResults.count} Odu matching "{searchQuery}"
            </p>
          )}
          {selectedCategory === "all-256" && all256Data && (
            <p className="text-gray-600 font-semibold">
              Viewing all {all256Data.totalOdus} Odu • {all256Data.majorOdus} Major + {all256Data.minorOdus} Minor
            </p>
          )}
          {selectedCategory !== "all" && selectedCategory !== "all-256" && categoryData && (
            <p className="text-gray-600">
              Showing {categoryData.count} {selectedCategory} Odu
            </p>
          )}
          {!searchQuery && selectedCategory === "all" && oduData && (
            <p className="text-gray-600">
              Viewing {oduData.totalOdus} complete Odu system • Page {oduData.currentPage} of {oduData.totalPages}
            </p>
          )}
        </div>

        {/* Odu Grid */}
        {isLoading || isSearching || isCategoryLoading || isAll256Loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 16 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedOdus.map((odu) => (
              <Card 
                key={odu.id} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-amber-300 bg-white"
                onClick={() => setSelectedOdu(odu)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight">
                      <InteractiveYorubaText>
                        {currentLanguage === "english" ? odu.name : odu.nameYoruba}
                      </InteractiveYorubaText>
                    </CardTitle>
                    <div className="flex gap-1">
                      <Badge 
                        variant={odu.category === "major" ? "default" : "secondary"}
                        className={odu.category === "major" ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-700"}
                      >
                        {odu.category === "major" ? "Méjì" : "Minor"}
                      </Badge>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        #{odu.id}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-3">
                    {currentLanguage === "english" ? odu.meaning : odu.meaningYoruba}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {odu.spiritualFocus.slice(0, 3).map((focus, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {focus}
                      </Badge>
                    ))}
                    {odu.spiritualFocus.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{odu.spiritualFocus.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(odu.audioUrl);
                    }}
                    className="w-full text-amber-600 hover:bg-amber-50"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Pronounce
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination for non-search results */}
        {!searchQuery && selectedCategory === "all" && oduData && oduData.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <span className="px-4 py-2 bg-amber-100 rounded-lg text-amber-800 font-medium">
              Page {currentPage} of {oduData.totalPages}
            </span>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, oduData.totalPages))}
              disabled={currentPage === oduData.totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Detailed Odu Modal/Panel */}
        {selectedOdu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      <InteractiveYorubaText>
                        {currentLanguage === "english" ? selectedOdu.name : selectedOdu.nameYoruba}
                      </InteractiveYorubaText>
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {selectedOdu.name}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedOdu(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Meaning</h4>
                    <p className="text-gray-700">{selectedOdu.meaning}</p>
                    <p className="text-gray-600 italic mt-1">
                      <InteractiveYorubaText text={selectedOdu.meaningYoruba} />
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Traditional Proverb</h4>
                    <p className="text-gray-700 italic">"{selectedOdu.proverb}"</p>
                    <p className="text-gray-600 italic mt-1">
                      "<InteractiveYorubaText text={selectedOdu.proverbYoruba} />"
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Spiritual Focus</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedOdu.spiritualFocus.map((focus, index) => (
                        <Badge key={index} variant="secondary">
                          {focus}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Spiritual Guidance</h4>
                    <p className="text-gray-700 mb-2">{selectedOdu.guidance}</p>
                    <p className="text-gray-600 italic">
                      <InteractiveYorubaText text={selectedOdu.guidanceYoruba} />
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => playAudio(selectedOdu.audioUrl)}
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Pronunciation
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedOdu(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}