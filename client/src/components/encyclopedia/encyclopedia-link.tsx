import React, { useState } from "react";
import { BookOpen, ExternalLink } from "lucide-react";
import { useEncyclopedia } from "./encyclopedia-provider";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EncyclopediaLinkProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

export function EncyclopediaLink({ term, children, className = "" }: EncyclopediaLinkProps) {
  const { hyperlinkableTerms, getEntry } = useEncyclopedia();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Find if this term is hyperlinkable
  const hyperlinkableTerm = hyperlinkableTerms.find(
    t => t.term.toLowerCase() === term.toLowerCase()
  );

  if (!hyperlinkableTerm) {
    return <span className={className}>{children}</span>;
  }

  const entry = getEntry(hyperlinkableTerm.encyclopediaSlug);

  if (!entry) {
    return <span className={className}>{children}</span>;
  }

  const handleMarkAsRead = async () => {
    try {
      await fetch("/api/encyclopedia/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entrySlug: entry.slug })
      });
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              className={`${className} text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 underline decoration-dotted underline-offset-2 transition-colors inline-flex items-center gap-1`}
              onClick={() => setIsDialogOpen(true)}
            >
              {children}
              <BookOpen className="h-3 w-3 opacity-70" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                {entry.title}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="capitalize">
                  {entry.category}
                </Badge>
                <span className="text-muted-foreground">
                  {entry.readingTime} • {entry.difficulty}
                </span>
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-4">
                <p className="text-muted-foreground font-medium">
                  {entry.shortDescription}
                </p>
                
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {entry.fullContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>

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
            </ScrollArea>

            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAsRead}
                className="text-xs"
              >
                Mark as Read
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <h4 className="font-semibold text-sm">{entry.title}</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            {entry.shortDescription}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-xs">
              {entry.category}
            </Badge>
            <span>{entry.readingTime}</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}