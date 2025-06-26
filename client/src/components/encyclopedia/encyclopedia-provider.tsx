import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EncyclopediaEntry, HyperlinkableTerm } from "@shared/encyclopedia-schema";

interface EncyclopediaContextType {
  entries: EncyclopediaEntry[];
  hyperlinkableTerms: HyperlinkableTerm[];
  getEntry: (slug: string) => EncyclopediaEntry | undefined;
  searchEntries: (query: string) => EncyclopediaEntry[];
  getEntriesByCategory: (category: string) => EncyclopediaEntry[];
  isLoading: boolean;
}

const EncyclopediaContext = createContext<EncyclopediaContextType | undefined>(undefined);

export function EncyclopediaProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all encyclopedia entries
  const { data: entries = [], isLoading: entriesLoading } = useQuery({
    queryKey: ["/api/encyclopedia/entries"],
  });

  // Fetch hyperlinkable terms
  const { data: hyperlinkableTerms = [], isLoading: termsLoading } = useQuery({
    queryKey: ["/api/encyclopedia/terms"],
  });

  const isLoading = entriesLoading || termsLoading;

  const getEntry = (slug: string): EncyclopediaEntry | undefined => {
    return entries.find((entry: EncyclopediaEntry) => entry.slug === slug);
  };

  const searchEntries = (query: string): EncyclopediaEntry[] => {
    if (!query.trim()) return entries;
    
    const searchTerm = query.toLowerCase();
    return entries.filter((entry: EncyclopediaEntry) => 
      entry.title.toLowerCase().includes(searchTerm) ||
      entry.shortDescription.toLowerCase().includes(searchTerm) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      entry.yorubaTerms.some(term => term.toLowerCase().includes(searchTerm))
    );
  };

  const getEntriesByCategory = (category: string): EncyclopediaEntry[] => {
    return entries.filter((entry: EncyclopediaEntry) => entry.category === category);
  };

  const contextValue: EncyclopediaContextType = {
    entries,
    hyperlinkableTerms,
    getEntry,
    searchEntries,
    getEntriesByCategory,
    isLoading
  };

  return (
    <EncyclopediaContext.Provider value={contextValue}>
      {children}
    </EncyclopediaContext.Provider>
  );
}

export function useEncyclopedia() {
  const context = useContext(EncyclopediaContext);
  if (context === undefined) {
    throw new Error("useEncyclopedia must be used within an EncyclopediaProvider");
  }
  return context;
}