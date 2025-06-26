import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface InteractiveYorubaTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function InteractiveYorubaText({ children, className }: InteractiveYorubaTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ts } = useLanguage();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Enhanced audio playback with authentic African voice priority
    let yoWordPlayer: HTMLAudioElement | null = null;
    
    const playYorubaWord = async (word: string) => {
      const trimmedWord = word.trim();
      if (!trimmedWord) return;

      // Use pronunciation mapping for accurate file lookup
      let audioPath = null;
      
      try {
        // First try to load the pronunciation mapping
        const mapResponse = await fetch('/static/audio/pronunciation/map.json');
        if (mapResponse.ok) {
          const pronunciationMap = await mapResponse.json();
          const wordEntry = pronunciationMap.find(entry => 
            entry.word.toLowerCase() === trimmedWord.toLowerCase()
          );
          
          if (wordEntry) {
            audioPath = `/static/audio/pronunciation/${wordEntry.file}`;
          }
        }
      } catch (error) {
        console.warn('Could not load pronunciation mapping');
      }
      
      // Fallback to direct filename if mapping not found
      if (!audioPath) {
        const simplifiedWord = trimmedWord.toLowerCase()
          .replace(/[àáâãäå]/g, 'a')
          .replace(/[èéêë]/g, 'e')
          .replace(/[ìíîï]/g, 'i')
          .replace(/[òóôõö]/g, 'o')
          .replace(/[ùúûü]/g, 'u')
          .replace(/[ṣş]/g, 's')
          .replace(/[ọọ́ọ̀]/g, 'o')
          .replace(/[ẹẹ́ẹ̀]/g, 'e')
          .replace(/[ǹń]/g, 'n');
        audioPath = `/static/audio/pronunciation/${simplifiedWord}.mp3`;
      }
      
      // Remove Google TTS fallback - only use authentic sources
      try {
        // Check if the audio file exists
        const checkResponse = await fetch(audioPath, { method: "HEAD" });
        
        if (checkResponse.ok) {
          // Stop any currently playing audio
          if (yoWordPlayer) {
            yoWordPlayer.pause();
            yoWordPlayer.currentTime = 0;
          }

          // Create new audio instance with enhanced settings for African pronunciation
          yoWordPlayer = new Audio(audioPath);
          yoWordPlayer.volume = 0.95; // Slightly higher for clear tonal pronunciation
          yoWordPlayer.playbackRate = 0.9; // Slower for authentic African speech patterns
          
          // Play the authentic audio
          await yoWordPlayer.play();
          console.log(`Playing authentic Yoruba pronunciation: ${trimmedWord}`);
        } else {
          console.warn(`No authentic pronunciation available for: ${trimmedWord}`);
          // Could notify user that authentic pronunciation is not available
          // Rather than falling back to inauthentic TTS
        }
      } catch (error) {
        console.warn("Audio playback failed:", error);
      }
    };

    // Enhanced click handler with better feedback
    const handleWordClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('yoruba-word') || target.hasAttribute('data-word')) {
        event.preventDefault();
        const word = target.getAttribute('data-word') || target.textContent?.replace('🔊', '').trim() || '';
        
        if (word) {
          playYorubaWord(word);
          
          // Enhanced visual feedback
          const originalBg = target.style.backgroundColor;
          const originalColor = target.style.color;
          const originalTransform = target.style.transform;
          
          target.style.backgroundColor = '#059669';
          target.style.color = 'white';
          target.style.transform = 'scale(0.95)';
          target.style.boxShadow = '0 2px 8px rgba(5, 150, 105, 0.3)';
          
          setTimeout(() => {
            target.style.backgroundColor = originalBg;
            target.style.color = originalColor;
            target.style.transform = originalTransform;
            target.style.boxShadow = '';
          }, 250);
        }
      }
    };

    // Auto-detect and mark Yoruba words in text
    const markYorubaWords = () => {
      const commonYorubaWords = [
        'òrìṣà', 'àṣẹ', 'ifá', 'ọdún', 'ìwòrì', 'ẹjẹ́', 'ọmọ', 'ilé', 'owó', 'ayé', 
        'ọrun', 'àgbà', 'ọba', 'ìyá', 'bàbá', 'ọ̀run', 'àlàáfíà', 'ìbùkún', 'ẹ̀mí',
        'ògún', 'ṣàngó', 'ọ̀ṣun', 'yemọja', 'ọya', 'ọbàtálá', 'èṣù', 'ọ̀rúnmìlà'
      ];

      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null
      );

      const textNodes: Text[] = [];
      let node: Text | null;
      while (node = walker.nextNode() as Text) {
        textNodes.push(node);
      }

      textNodes.forEach(textNode => {
        if (textNode.parentElement?.classList.contains('yoruba-word')) return;
        
        let text = textNode.textContent || '';
        let hasYorubaWords = false;
        
        commonYorubaWords.forEach(yorubaWord => {
          const regex = new RegExp(`\\b${yorubaWord}\\b`, 'gi');
          if (regex.test(text)) {
            hasYorubaWords = true;
            text = text.replace(regex, `<span class="yoruba-word clickable-yoruba" data-word="${yorubaWord}">$&</span>`);
          }
        });

        if (hasYorubaWords) {
          const wrapper = document.createElement('span');
          wrapper.innerHTML = text;
          textNode.parentNode?.replaceChild(wrapper, textNode);
        }
      });
    };

    // Apply styling to Yoruba words
    const style = document.createElement('style');
    style.textContent = `
      .yoruba-word {
        font-weight: bold;
        color: #046b4a;
        cursor: pointer;
        position: relative;
        padding-right: 1.5em;
        transition: all 0.2s ease;
        border-radius: 3px;
        padding: 2px 1.8em 2px 4px;
        margin: 0 2px;
      }
      
      .yoruba-word::after {
        content: "🔊";
        position: absolute;
        right: 2px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.75em;
        color: #065f46;
        opacity: 0.7;
        transition: all 0.2s ease;
      }
      
      .clickable-yoruba {
        cursor: pointer;
      }
      
      .yoruba-word:hover {
        background-color: #d1fae5;
        color: #064e3b;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .yoruba-word:hover::after {
        opacity: 1;
        color: #059669;
        transform: translateY(-50%) scale(1.1);
      }
      
      .yoruba-word:active {
        background-color: #059669;
        color: white;
        transform: scale(0.98);
      }
      
      .yoruba-word:active::after {
        color: white;
      }
      
      .dark .yoruba-word {
        color: #10b981;
        background-color: rgba(16, 185, 129, 0.1);
      }
      
      .dark .yoruba-word::after {
        color: #34d399;
      }
      
      .dark .yoruba-word:hover {
        background-color: rgba(16, 185, 129, 0.2);
        color: #6ee7b7;
      }
      
      .dark .yoruba-word:hover::after {
        color: #6ee7b7;
      }
    `;
    document.head.appendChild(style);

    // Initialize
    markYorubaWords();
    container.addEventListener('click', handleWordClick);

    // Cleanup
    return () => {
      container.removeEventListener('click', handleWordClick);
      if (yoWordPlayer) {
        yoWordPlayer.pause();
        yoWordPlayer = null;
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Hook for manual Yoruba word highlighting
export function useYorubaWordHighlighting() {
  const { ts } = useLanguage();

  const highlightYorubaWords = (text: string): string => {
    const commonYorubaWords = [
      'òrìṣà', 'àṣẹ', 'ifá', 'ọdún', 'ìwòrì', 'ẹjẹ́', 'ọmọ', 'ilé', 'owó', 'ayé', 
      'ọrun', 'àgbà', 'ọba', 'ìyá', 'bàbá', 'ọ̀run', 'àlàáfíà', 'ìbùkún', 'ẹ̀mí',
      'ògún', 'ṣàngó', 'ọ̀ṣun', 'yemọja', 'ọya', 'ọbàtálá', 'èṣù', 'ọ̀rúnmìlà'
    ];

    let highlightedText = text;
    
    commonYorubaWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(
        regex, 
        `<span class="yoruba-word clickable-yoruba" data-word="${word}">$&</span>`
      );
    });

    return highlightedText;
  };

  return { highlightYorubaWords };
}