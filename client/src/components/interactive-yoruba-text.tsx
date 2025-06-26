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

    // Google TTS endpoint for Yoruba
    const googleTTS = (query: string) => 
      `https://translate.google.com/translate_tts?client=tw-ob&tl=yo&ie=UTF-8&q=${encodeURIComponent(query)}`;

    // Local pronunciation path
    const getLocalURL = (word: string) => `/static/audio/pronunciation/${word.toLowerCase()}.mp3`;

    const playYorubaWord = async (word: string) => {
      const trimmedWord = word.trim();
      if (!trimmedWord) return;

      try {
        // First try local pronunciation file
        const localURL = getLocalURL(trimmedWord);
        const headResponse = await fetch(localURL, { method: "HEAD" });
        const audioSource = headResponse.ok ? localURL : googleTTS(trimmedWord);

        const audio = new Audio(audioSource);
        await audio.play();
      } catch (error) {
        console.error("Pronunciation error:", error);
      }
    };

    // Add click handlers to all Yoruba words
    const handleWordClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('yoruba-word') || target.hasAttribute('data-word')) {
        event.preventDefault();
        const word = target.getAttribute('data-word') || target.textContent || '';
        playYorubaWord(word);
        
        // Visual feedback - flash effect
        target.style.backgroundColor = '#059669';
        target.style.color = 'white';
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
          target.style.backgroundColor = '';
          target.style.color = '';
          target.style.transform = '';
        }, 200);
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
        font-size: 0.8em;
        color: #065f46;
        opacity: 0.8;
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
      document.head.removeChild(style);
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