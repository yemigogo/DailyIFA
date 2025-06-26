import React from "react";
import { useEncyclopedia } from "./encyclopedia-provider";
import { EncyclopediaLink } from "./encyclopedia-link";

interface AutoLinkTextProps {
  children: string;
  className?: string;
}

export function AutoLinkText({ children, className = "" }: AutoLinkTextProps) {
  const { hyperlinkableTerms, isLoading } = useEncyclopedia();

  // Don't process if loading or no terms available
  if (isLoading || !hyperlinkableTerms || hyperlinkableTerms.length === 0) {
    return <span className={className}>{children}</span>;
  }

  // Sort terms by length (longest first) to avoid partial matches
  const sortedTerms = [...hyperlinkableTerms].sort((a, b) => b.term.length - a.term.length);

  let processedText = children;
  const replacements: { term: string; replacement: JSX.Element }[] = [];

  // Find all matching terms
  sortedTerms.forEach((termData, index) => {
    const term = termData.term;
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    
    if (regex.test(processedText)) {
      const uniqueKey = `encyclopedia-link-${index}-${Date.now()}`;
      replacements.push({
        term,
        replacement: (
          <EncyclopediaLink key={uniqueKey} term={term} className={className}>
            {term}
          </EncyclopediaLink>
        )
      });
    }
  });

  // If no replacements needed, return plain text
  if (replacements.length === 0) {
    return <span className={className}>{children}</span>;
  }

  // Split text and create elements with replacements
  const parts: (string | JSX.Element)[] = [];
  let remainingText = children;

  replacements.forEach(({ term, replacement }) => {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    const match = remainingText.match(regex);
    
    if (match && match.index !== undefined) {
      // Add text before match
      if (match.index > 0) {
        parts.push(remainingText.substring(0, match.index));
      }
      
      // Add the replacement element
      parts.push(replacement);
      
      // Update remaining text
      remainingText = remainingText.substring(match.index + match[0].length);
    }
  });

  // Add any remaining text
  if (remainingText.length > 0) {
    parts.push(remainingText);
  }

  return (
    <span className={className}>
      {parts.map((part, index) => 
        typeof part === 'string' ? part : React.cloneElement(part, { key: `part-${index}` })
      )}
    </span>
  );
}

export default AutoLinkText;