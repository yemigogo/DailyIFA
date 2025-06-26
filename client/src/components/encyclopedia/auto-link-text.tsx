import React from "react";
import { useEncyclopedia } from "./encyclopedia-provider";
import { EncyclopediaLink } from "./encyclopedia-link";

interface AutoLinkTextProps {
  children: string;
  className?: string;
}

export function AutoLinkText({ children, className = "" }: AutoLinkTextProps) {
  const { hyperlinkableTerms } = useEncyclopedia();

  if (!children || hyperlinkableTerms.length === 0) {
    return <span className={className}>{children}</span>;
  }

  // Sort terms by length (descending) to match longer terms first
  const sortedTerms = [...hyperlinkableTerms].sort((a, b) => b.term.length - a.term.length);

  let processedText = children;
  const replacements: Array<{ original: string; replacement: React.ReactNode; key: string }> = [];

  // Find all matches and create replacements
  sortedTerms.forEach((hyperlinkableTerm, termIndex) => {
    const regex = new RegExp(`\\b${hyperlinkableTerm.term}\\b`, 'gi');
    let match;
    
    while ((match = regex.exec(processedText)) !== null) {
      const matchedText = match[0];
      const key = `link-${termIndex}-${match.index}`;
      
      // Check if this position is already replaced
      const isAlreadyReplaced = replacements.some(r => 
        match.index >= processedText.indexOf(r.original) && 
        match.index < processedText.indexOf(r.original) + r.original.length
      );
      
      if (!isAlreadyReplaced) {
        replacements.push({
          original: matchedText,
          replacement: (
            <EncyclopediaLink key={key} term={hyperlinkableTerm.term} className={className}>
              {matchedText}
            </EncyclopediaLink>
          ),
          key
        });
      }
    }
  });

  // If no replacements found, return original text
  if (replacements.length === 0) {
    return <span className={className}>{children}</span>;
  }

  // Split text and insert links
  const parts: Array<React.ReactNode> = [];
  let lastIndex = 0;
  let text = children;

  // Sort replacements by their position in the original text
  const sortedReplacements = replacements.sort((a, b) => 
    text.indexOf(a.original) - text.indexOf(b.original)
  );

  sortedReplacements.forEach((replacement, index) => {
    const matchIndex = text.indexOf(replacement.original, lastIndex);
    
    if (matchIndex >= lastIndex) {
      // Add text before the match
      if (matchIndex > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {text.substring(lastIndex, matchIndex)}
          </span>
        );
      }
      
      // Add the linked term
      parts.push(replacement.replacement);
      
      lastIndex = matchIndex + replacement.original.length;
    }
  });

  // Add remaining text after last match
  if (lastIndex < text.length) {
    parts.push(
      <span key="text-final">
        {text.substring(lastIndex)}
      </span>
    );
  }

  return <span className={className}>{parts}</span>;
}