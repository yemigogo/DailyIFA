import os
import json
import unicodedata
import zipfile
from pathlib import Path

# Yoruba words and their meanings
yoruba_words = [
    ("ṣàngó", "Orisha of thunder"),
    ("òrìṣà", "Deity"),
    ("ọ̀run", "Heaven"),
    ("ayé", "Earth"),
    ("ògún", "Orisha of iron and war"),
    ("ìwòrì", "Odu Ifá sign"),
    ("ẹ̀jẹ̀", "Blood"),
    ("àlàáfíà", "Peace"),
    ("odù", "Divination sign"),
    ("bàbáláwo", "Diviner, priest"),
    ("ìyánífẹ́", "Love"),
    ("ọjọ́", "Day"),
    ("ọsẹ̀", "Week"),
    ("ọdún", "Year"),
    ("ìmọ̀", "Knowledge"),
    ("àdúrà", "Prayer"),
    ("àṣẹ", "Divine command / affirmation"),
    ("ifá", "Divination system"),
    ("yemọja", "Ocean mother"),
    ("ọbàtálá", "Creator Orisha"),
    ("ọya", "Wind Orisha"),
    ("èṣù", "Messenger Orisha"),
    ("ọ̀ṣun", "River Orisha"),
    ("ọ̀rúnmìlà", "Orisha of wisdom")
]

def slugify(text):
    """Convert Yoruba text to ASCII-safe filename"""
    return ''.join(c for c in unicodedata.normalize('NFKD', text) if not unicodedata.combining(c)).lower()

def create_pronunciation_pack():
    """Create complete pronunciation pack with proper mapping"""
    
    # Create project structure
    base = Path("static/audio/pronunciation")
    base.mkdir(parents=True, exist_ok=True)
    
    # Create mapping and copy existing authentic files
    mapping = []
    existing_files = {}
    
    # Check for existing authentic audio files
    for file_path in base.glob("*.mp3"):
        if file_path.stem in ['ase', 'orisa', 'sango', 'osun', 'orunmila', 'yemoja', 'ifa']:
            existing_files[file_path.stem] = str(file_path)
    
    for word, meaning in yoruba_words:
        filename = f"{slugify(word)}.mp3"
        file_path = base / filename
        
        # Check if we have authentic audio for this word
        slugified = slugify(word)
        if slugified in existing_files:
            print(f"✓ Found existing authentic audio for {word} -> {filename}")
        else:
            # Create placeholder for future authentic audio
            with open(file_path, "wb") as f:
                f.write(b"")  # Empty placeholder
            print(f"⚪ Created placeholder for {word} -> {filename}")
        
        mapping.append({
            "word": word, 
            "meaning": meaning, 
            "file": filename,
            "slugified": slugified,
            "has_authentic": slugified in existing_files
        })
    
    # Save mapping JSON
    with open(base / "map.json", "w", encoding="utf-8") as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)
    
    print(f"\n📋 Created pronunciation mapping with {len(mapping)} words")
    print(f"📁 Files saved to: {base}")
    
    return mapping

def create_enhanced_pronunciation_demo():
    """Create enhanced demo using the mapping system"""
    
    html = """<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yorùbá Authentic Pronunciation Pack</title>
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      padding: 2rem; 
      background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
      margin: 0;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    h1 { 
      color: #0a663e; 
      text-align: center; 
      margin-bottom: 2rem; 
      font-size: 2.5rem;
    }
    .word-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
      gap: 1rem; 
      margin: 2rem 0;
    }
    .word-tile { 
      background: white; 
      padding: 1.5rem; 
      border-radius: 8px; 
      box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
      cursor: pointer;
      transition: all 0.2s ease;
      border-left: 4px solid #10b981;
    }
    .word-tile:hover { 
      background: #f0fdf4;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .word-tile.authentic {
      border-left-color: #059669;
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
    }
    .word-tile.placeholder {
      border-left-color: #f59e0b;
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    }
    .word { 
      font-weight: bold; 
      font-size: 1.3em; 
      color: #046b4a;
      margin-bottom: 0.5rem;
    }
    .meaning { 
      font-size: 0.9em; 
      color: #555;
      margin-bottom: 0.5rem;
    }
    .status {
      font-size: 0.8em;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 500;
    }
    .status.authentic {
      background: #dcfce7;
      color: #166534;
    }
    .status.placeholder {
      background: #fef3c7;
      color: #92400e;
    }
    .stats {
      background: #f8fafc;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 2rem;
    }
    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔊 Yorùbá Authentic Pronunciation Pack</h1>
    
    <div class="stats" id="stats">
      <div class="loading">Loading pronunciation data...</div>
    </div>
    
    <div class="word-grid" id="wordGrid"></div>
  </div>

  <script>
    let player = null;

    async function loadWords() {
      try {
        const res = await fetch("/static/audio/pronunciation/map.json");
        const words = await res.json();
        
        const authentic = words.filter(w => w.has_authentic).length;
        const total = words.length;
        
        // Update stats
        document.getElementById("stats").innerHTML = `
          <h3 style="margin: 0 0 0.5rem 0; color: #0a663e;">Pronunciation Status</h3>
          <div>✅ <strong>${authentic}</strong> authentic African pronunciations available</div>
          <div>⏳ <strong>${total - authentic}</strong> placeholders for future authentic audio</div>
        `;
        
        const grid = document.getElementById("wordGrid");
        grid.innerHTML = "";
        
        words.forEach(w => {
          const div = document.createElement("div");
          div.className = `word-tile ${w.has_authentic ? 'authentic' : 'placeholder'}`;
          div.innerHTML = `
            <div class="word">${w.word} 🔊</div>
            <div class="meaning">${w.meaning}</div>
            <div class="status ${w.has_authentic ? 'authentic' : 'placeholder'}">
              ${w.has_authentic ? '✅ Authentic Audio' : '⏳ Placeholder'}
            </div>
          `;
          div.onclick = () => playAudio(w.file, w.word);
          grid.appendChild(div);
        });
      } catch (error) {
        console.error("Failed to load pronunciation data:", error);
        document.getElementById("stats").innerHTML = `
          <div style="color: #dc2626;">❌ Failed to load pronunciation data</div>
        `;
      }
    }

    async function playAudio(filename, word) {
      const src = "/static/audio/pronunciation/" + filename;
      
      try {
        // Check if file exists
        const response = await fetch(src, { method: 'HEAD' });
        
        if (response.ok) {
          if (player) player.pause();
          player = new Audio(src);
          player.volume = 0.9;
          player.playbackRate = 0.9; // Authentic African pace
          await player.play();
          console.log(`Playing authentic pronunciation: ${word}`);
        } else {
          console.warn(`Audio file not found: ${filename}`);
          alert(`Authentic pronunciation for "${word}" not yet available. This is a placeholder for future authentic audio.`);
        }
      } catch (error) {
        console.error("Audio playback failed:", error);
        alert(`Failed to play pronunciation for "${word}"`);
      }
    }

    // Load words on page load
    loadWords();
  </script>
</body>
</html>"""
    
    # Save enhanced demo
    with open("enhanced_pronunciation_demo.html", "w", encoding="utf-8") as f:
        f.write(html)
    
    print("📄 Created enhanced pronunciation demo: enhanced_pronunciation_demo.html")

def main():
    """Main execution function"""
    print("🎵 Creating Yoruba Pronunciation Pack with Slugified Filenames")
    print("=" * 60)
    
    # Create the pronunciation pack
    mapping = create_pronunciation_pack()
    
    # Create enhanced demo
    create_enhanced_pronunciation_demo()
    
    # Show summary
    print("\n📊 Summary:")
    authentic_count = sum(1 for item in mapping if item.get('has_authentic', False))
    print(f"   • Total words: {len(mapping)}")
    print(f"   • Authentic audio: {authentic_count}")
    print(f"   • Placeholders: {len(mapping) - authentic_count}")
    print(f"   • Mapping file: static/audio/pronunciation/map.json")
    print(f"   • Demo file: enhanced_pronunciation_demo.html")

if __name__ == "__main__":
    main()