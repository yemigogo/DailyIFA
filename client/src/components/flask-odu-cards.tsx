import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface OduCard {
  filename: string;
  name: string;
  url: string;
  type: string;
}

interface OduCardsResponse {
  cards: OduCard[];
  total: number;
  message: string;
}

export default function FlaskOduCards() {
  const [cards, setCards] = useState<OduCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<OduCard | null>(null);

  useEffect(() => {
    fetchOduCards();
  }, []);

  const fetchOduCards = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use current server API endpoint
      const response = await fetch('/api/odu-cards');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OduCardsResponse = await response.json();
      console.log('Flask Odu Cards API response:', data);
      setCards(data.cards);
    } catch (err) {
      console.error('Error fetching Odu cards:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch Odu cards');
    } finally {
      setLoading(false);
    }
  };

  const openFlaskInterface = () => {
    window.open('/odu', '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <span className="ml-2 text-gray-600">Loading Odu cards...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-red-600 mb-2">Error loading Odu cards</div>
            <p className="text-sm text-red-500 mb-4">{error}</p>
            <Button 
              onClick={fetchOduCards}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Flask Odu Cards</h2>
          <p className="text-gray-600">
            Traditional Odu cards served from Flask backend
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            {cards.length} cards
          </Badge>
          <Button 
            onClick={openFlaskInterface}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Full Interface
          </Button>
        </div>
      </div>

      {cards.length === 0 ? (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-8 text-center">
            <ImageIcon className="h-16 w-16 mx-auto mb-4 text-amber-500" />
            <h3 className="text-lg font-semibold mb-2 text-amber-800">
              No Odu Cards Found
            </h3>
            <p className="text-amber-600 mb-4">
              Upload your authentic Odu card images to the Flask backend
            </p>
            <div className="bg-white p-4 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-700">
                <strong>Expected location:</strong> <code>static/odu_cards/</code>
              </p>
              <p className="text-sm text-amber-700 mt-1">
                <strong>Format:</strong> PNG files with names like <code>eji-ogbe.png</code>
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <Dialog key={card.filename}>
              <DialogTrigger asChild>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="aspect-[2/3] bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg overflow-hidden mb-3">
                      <img
                        src={card.url}
                        alt={card.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center">
                              <div class="text-center">
                                <div class="text-amber-600 mb-2">
                                  <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                                  </svg>
                                </div>
                                <p class="text-sm text-amber-600">${card.name}</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 truncate">
                      {card.name}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {card.type}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl text-amber-700">
                    {card.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="aspect-[2/3] bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg overflow-hidden">
                    <img
                      src={card.url}
                      alt={card.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {card.type}
                    </Badge>
                    <Button
                      onClick={() => window.open(card.url, '_blank')}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Original
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="text-blue-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-blue-700">
                <strong>Flask Integration:</strong> This component displays traditional Odu cards 
                served from the integrated Flask backend with authentic Excel data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}