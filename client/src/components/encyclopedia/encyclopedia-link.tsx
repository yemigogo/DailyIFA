import { useState } from "react";
import { useEncyclopedia } from "./encyclopedia-provider";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Clock, Tag } from "lucide-react";

interface EncyclopediaLinkProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

export function EncyclopediaLink({ term, children, className = "" }: EncyclopediaLinkProps) {
  const { hyperlinkableTerms, getEntry } = useEncyclopedia();
  const [isOpen, setIsOpen] = useState(false);

  // Find the matching hyperlinkable term
  const hyperlinkableTerm = hyperlinkableTerms.find(
    (t) => t.term.toLowerCase() === term.toLowerCase()
  );

  if (!hyperlinkableTerm) {
    return <span className={className}>{children}</span>;
  }

  const entry = getEntry(hyperlinkableTerm.encyclopediaSlug);

  if (!entry) {
    return <span className={className}>{children}</span>;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // You could navigate to a full encyclopedia entry page here
    // For now, we'll just toggle the hover card programmatically
    setIsOpen(!isOpen);
  };

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <button
          onClick={handleClick}
          className={`inline underline decoration-amber-500 decoration-2 underline-offset-2 
                     hover:decoration-amber-600 cursor-pointer text-amber-700 dark:text-amber-300
                     font-medium transition-colors ${className}`}
        >
          {children}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 p-0" side="top" align="center">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-amber-900 dark:text-amber-100">
                  {entry.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <Badge variant="outline" className="text-xs">
                    {entry.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{entry.readingTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    <span className="capitalize">{entry.difficulty}</span>
                  </div>
                </div>
              </div>
              <Book className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 space-y-4">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {entry.shortDescription}
              </p>
            </div>

            <div className="space-y-3">
              {entry.fullContent.split('\n\n').slice(0, 2).map((paragraph, index) => (
                <p key={index} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {paragraph.length > 150 ? `${paragraph.substring(0, 150)}...` : paragraph}
                </p>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
              {(entry.yorubaTerms || []).length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Yoruba Terms:</h4>
                  <div className="flex flex-wrap gap-1">
                    {(entry.yorubaTerms || []).map((term, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {(entry.tags || []).length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Topics:</h4>
                  <div className="flex flex-wrap gap-1">
                    {(entry.tags || []).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-800">
              Click to learn more about this concept
            </div>
          </CardContent>
        </Card>
      </HoverCardContent>
    </HoverCard>
  );
}

export default EncyclopediaLink;