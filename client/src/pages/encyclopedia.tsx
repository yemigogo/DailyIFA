import React, { useState } from "react";
import { Search, BookOpen, Filter, Clock, Star } from "lucide-react";
import { useEncyclopedia } from "@/components/encyclopedia/encyclopedia-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AutoLinkText } from "@/components/encyclopedia/auto-link-text";

const categories = [
  { value: "all", label: "All Topics", icon: BookOpen },
  { value: "orisha", label: "Orisha", icon: Star },
  { value: "concept", label: "Concepts", icon: BookOpen },
  { value: "practice", label: "Practices", icon: Clock },
  { value: "history", label: "History", icon: BookOpen },
  { value: "symbol", label: "Symbols", icon: Star }
];

const difficulties = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" }
];

export default function EncyclopediaPage() {
  const { entries, searchEntries, getEntriesByCategory, isLoading } = useEncyclopedia();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [activeTab, setActiveTab] = useState("browse");

  // Filter entries based on search, category, and difficulty
  const filteredEntries = React.useMemo(() => {
    let filtered = searchQuery ? searchEntries(searchQuery) : entries;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(entry => entry.category === selectedCategory);
    }
    
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(entry => entry.difficulty === selectedDifficulty);
    }
    
    return filtered;
  }, [entries, searchQuery, selectedCategory, selectedDifficulty, searchEntries]);

  // Group entries by category for the browse tab
  const entriesByCategory = React.useMemo(() => {
    const grouped = entries.reduce((acc, entry) => {
      if (!acc[entry.category]) {
        acc[entry.category] = [];
      }
      acc[entry.category].push(entry);
      return acc;
    }, {} as Record<string, typeof entries>);
    
    return Object.entries(grouped).map(([category, categoryEntries]) => ({
      category,
      entries: categoryEntries,
      count: categoryEntries.length
    }));
  }, [entries]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <BookOpen className="h-8 w-8 animate-spin text-emerald-600 mx-auto mb-4" />
            <p className="text-muted-foreground">Loading cultural encyclopedia...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
          Cultural Encyclopedia
        </h1>
        <p className="text-muted-foreground">
          Explore the rich wisdom and traditions of Yoruba culture and Ifá spirituality
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Topics</TabsTrigger>
          <TabsTrigger value="search">Search & Filter</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search encyclopedia entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((diff) => (
                  <SelectItem key={diff.value} value={diff.value}>
                    {diff.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">
                      <AutoLinkText>{entry.title}</AutoLinkText>
                    </CardTitle>
                    <Badge variant="secondary" className="capitalize text-xs">
                      {entry.category}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    <AutoLinkText>{entry.shortDescription}</AutoLinkText>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {entry.readingTime}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {entry.difficulty}
                    </Badge>
                  </div>
                  
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {entry.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{entry.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No entries found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {entriesByCategory.map(({ category, entries: categoryEntries, count }) => {
            const categoryInfo = categories.find(c => c.value === category) || { label: category, icon: BookOpen };
            const Icon = categoryInfo.icon;
            
            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    <Icon className="h-5 w-5 text-emerald-600" />
                    {categoryInfo.label}
                    <Badge variant="secondary">{count}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryEntries.map((entry) => (
                      <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <BookOpen className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1">
                            <AutoLinkText>{entry.title}</AutoLinkText>
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            <AutoLinkText>{entry.shortDescription}</AutoLinkText>
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {entry.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {entry.readingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.slice(0, 9).map((entry) => (
              <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">
                      <AutoLinkText>{entry.title}</AutoLinkText>
                    </CardTitle>
                    <Badge variant="secondary" className="capitalize text-xs">
                      {entry.category}
                    </Badge>
                  </div>
                  <CardDescription>
                    <AutoLinkText>{entry.shortDescription}</AutoLinkText>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {entry.readingTime}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {entry.difficulty}
                    </Badge>
                  </div>
                  
                  {entry.yorubaTerms.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        Yoruba Terms:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {entry.yorubaTerms.slice(0, 3).map((term, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <AutoLinkText>{term}</AutoLinkText>
                          </Badge>
                        ))}
                        {entry.yorubaTerms.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{entry.yorubaTerms.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {entries.length > 9 && (
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("search")}
              >
                <Search className="h-4 w-4 mr-2" />
                View All Entries
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}