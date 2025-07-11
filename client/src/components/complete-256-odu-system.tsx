
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, BookOpen, Sparkles } from 'lucide-react';

interface OduEntry {
  id: number;
  name: string;
  full_name: string;
  pattern: string;
  meaning: string;
  guidance: string;
  category: string;
  spiritual_significance: string;
  traditional_story: string;
  modern_application: string;
  primary_odu: string;
  secondary_odu: string;
}

export default function Complete256OduSystem() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [primaryOdu, setPrimaryOdu] = useState('');
  const [selectedOdu, setSelectedOdu] = useState<OduEntry | null>(null);
  
  const { data: oduData, isLoading, error } = useQuery({
    queryKey: ['/api/odu-256/complete', page, search, category, primaryOdu],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: '20',
        category,
        search,
        primary_odu: primaryOdu
      });
      const response = await fetch(`/api/odu-256/complete?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('256 Odu API response:', data);
      return data;
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['/api/odu-256/categories'],
    queryFn: async () => {
      const response = await fetch('/api/odu-256/categories');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Categories API response:', data);
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-spiritual-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading 256 Odu System</h2>
          <p className="text-gray-600 mb-4">{error instanceof Error ? error.message : 'Unknown error'}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-spiritual-blue dark:text-sacred-gold mb-4">
            <Sparkles className="inline w-8 h-8 mr-2" />
            Complete 256 Odu Ifá System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Traditional Yoruba divination system with authentic naming and patterns
          </p>
          {oduData && (
            <div className="mt-4 flex justify-center gap-4">
              <Badge variant="outline" className="text-sm">
                Total: {oduData.statistics?.total_odu || 256}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Major: {oduData.statistics?.major_odu || 16}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Minor: {oduData.statistics?.minor_odu || 240}
              </Badge>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search Odu..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Major">Major Odu</SelectItem>
                <SelectItem value="Minor">Minor Odu</SelectItem>
              </SelectContent>
            </Select>
            <Select value={primaryOdu} onValueChange={setPrimaryOdu}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Primary Odu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Primary</SelectItem>
                <SelectItem value="Eji Ogbe">Eji Ogbe</SelectItem>
                <SelectItem value="Oyeku Meji">Oyeku Meji</SelectItem>
                <SelectItem value="Iwori Meji">Iwori Meji</SelectItem>
                {/* Add more primary Odu options */}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Odu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oduData?.odu_list?.map((odu: OduEntry) => (
            <Card key={odu.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedOdu(odu)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{odu.name}</CardTitle>
                  <Badge variant={odu.category === 'Major' ? 'default' : 'secondary'}>
                    {odu.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {odu.pattern}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {odu.meaning}
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 italic">
                  {odu.guidance.substring(0, 100)}...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {oduData?.pagination && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4">
              Page {page} of {oduData.pagination.pages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage(page + 1)}
              disabled={page >= oduData.pagination.pages}
            >
              Next
            </Button>
          </div>
        )}

        {/* Detailed Modal */}
        {selectedOdu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-spiritual-blue dark:text-sacred-gold">
                    {selectedOdu.name}
                  </h2>
                  <Button variant="ghost" onClick={() => setSelectedOdu(null)}>
                    ×
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Pattern:</h3>
                    <p className="font-mono text-lg">{selectedOdu.pattern}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Meaning:</h3>
                    <p>{selectedOdu.meaning}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Guidance:</h3>
                    <p>{selectedOdu.guidance}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Spiritual Significance:</h3>
                    <p>{selectedOdu.spiritual_significance}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Traditional Story:</h3>
                    <p>{selectedOdu.traditional_story}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Modern Application:</h3>
                    <p>{selectedOdu.modern_application}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
