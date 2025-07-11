import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grid, Search, Filter, Eye, Download, Image as ImageIcon } from 'lucide-react';

interface AuthenticOduCard {
  number: number;
  name: string;
  filename: string;
  filepath: string;
  category?: string;
  pattern?: string;
  meaning?: string;
}

interface CardManifest {
  metadata: {
    title: string;
    source: string;
    total_cards: number;
    generated_at: string;
    card_dimensions: string;
    directory: string;
  };
  cards: AuthenticOduCard[];
  categories: {
    major: AuthenticOduCard[];
    minor: AuthenticOduCard[];
  };
}

export default function AuthenticOduCards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedCard, setSelectedCard] = useState<AuthenticOduCard | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  // Fetch authentic Odu cards from manifest
  const { data: manifest, isLoading, error } = useQuery<CardManifest>({
    queryKey: ['/api/odu-cards-authentic'],
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading authentic Odu cards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <ImageIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          Unable to Load Authentic Cards
        </h3>
        <p className="text-red-600 dark:text-red-300">
          The authentic Odu cards generated from your Excel data could not be loaded.
        </p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-red-600 hover:bg-red-700"
        >
          Try Again
        </Button>
      </div>
    );
  }

  const cards = manifest?.cards || [];
  
  // Filter cards based on search and category
  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.number.toString().includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || 
                           (categoryFilter === 'major' && manifest?.categories.major.some(c => c.number === card.number)) ||
                           (categoryFilter === 'minor' && manifest?.categories.minor.some(c => c.number === card.number));
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const getCardImagePath = (filename: string) => {
    return `/static/odu_cards/${filename}`;
  };

  const handleCardClick = (card: AuthenticOduCard) => {
    setSelectedCard(card);
  };

  const handleDownload = (card: AuthenticOduCard) => {
    const link = document.createElement('a');
    link.href = getCardImagePath(card.filename);
    link.download = card.filename;
    link.click();
  };

  const isMajorOdu = (card: AuthenticOduCard) => {
    return manifest?.categories.major.some(c => c.number === card.number) || false;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Authentic 256 Odu Cards
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Traditional Odu cards generated from your authentic Excel data
        </p>
        {manifest && (
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20">
              <ImageIcon className="h-4 w-4 mr-1" />
              {manifest.metadata.total_cards} Cards
            </Badge>
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
              {manifest.metadata.card_dimensions}
            </Badge>
            <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
              Excel Data Source
            </Badge>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search Odu by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cards</SelectItem>
              <SelectItem value="major">Major Odu</SelectItem>
              <SelectItem value="minor">Minor Odu</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Cards Display */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "space-y-4"
      }>
        {paginatedCards.map((card) => (
          <Card 
            key={card.number} 
            className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-amber-400 dark:hover:border-amber-500"
            onClick={() => handleCardClick(card)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  {card.name}
                </CardTitle>
                <Badge 
                  variant={isMajorOdu(card) ? 'default' : 'secondary'}
                  className={isMajorOdu(card) ? 'bg-amber-600' : 'bg-blue-600'}
                >
                  {isMajorOdu(card) ? 'Major' : 'Minor'}
                </Badge>
              </div>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                #{card.number.toString().padStart(3, '0')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-[5/4] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                <img
                  src={getCardImagePath(card.filename)}
                  alt={card.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/static/images/placeholder-odu.svg';
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(card);
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(card);
                  }}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No cards found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Card Detail Modal */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedCard?.name}
            </DialogTitle>
            <DialogDescription>
              #{selectedCard?.number.toString().padStart(3, '0')} - Authentic Odu Card
            </DialogDescription>
          </DialogHeader>
          {selectedCard && (
            <div className="space-y-4">
              <div className="aspect-[5/4] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={getCardImagePath(selectedCard.filename)}
                  alt={selectedCard.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/static/images/placeholder-odu.svg';
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <Badge 
                  variant={isMajorOdu(selectedCard) ? 'default' : 'secondary'}
                  className={isMajorOdu(selectedCard) ? 'bg-amber-600' : 'bg-blue-600'}
                >
                  {isMajorOdu(selectedCard) ? 'Major Odu' : 'Minor Odu'}
                </Badge>
                <Button
                  onClick={() => handleDownload(selectedCard)}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download High Quality
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}