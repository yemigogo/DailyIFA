import os, zipfile, textwrap, io, datetime, pathlib, json, base64, sys, re

def create_yoruba_pronunciation_template():
    """Create comprehensive Yoruba pronunciation template based on attached file"""
    
    # Create template directory
    base = "templates/yoruba_pronunciation_template"
    os.makedirs(f"{base}/static/audio/pronunciation", exist_ok=True)
    os.makedirs(f"{base}/templates", exist_ok=True)

    # Enhanced placeholder mp3 names with common Yoruba words
    placeholder_words = [
        "orun.mp3", "aye.mp3", "sango.mp3", "orisa.mp3", "ase.mp3", 
        "ifa.mp3", "ogun.mp3", "osun.mp3", "yemoja.mp3", "obatala.mp3",
        "esu.mp3", "oya.mp3", "orunmila.mp3", "omo.mp3", "ile.mp3",
        "owo.mp3", "agba.mp3", "alafia.mp3", "ibukun.mp3", "emi.mp3"
    ]
    
    for name in placeholder_words:
        with open(f"{base}/static/audio/pronunciation/{name}", "wb") as f:
            f.write(b"")  # Empty placeholder files

    # Enhanced index.html with comprehensive demo
    html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yorùbá Pronunciation Demo - Ifá Spiritual App</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 2rem;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
            line-height: 1.6;
            color: #334155;
        }
        
        .container {
            max-width: 800px;
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
        
        .intro {
            background: #f0fdf4;
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 4px solid #22c55e;
            margin-bottom: 2rem;
        }
        
        .word-section {
            margin-bottom: 2rem;
        }
        
        .word-section h3 {
            color: #0a663e;
            border-bottom: 2px solid #22c55e;
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .yoruba-word {
            font-weight: bold;
            color: #0a663e;
            cursor: pointer;
            position: relative;
            padding: 4px 1.5em 4px 8px;
            margin: 2px;
            border-radius: 6px;
            transition: all 0.2s ease;
            display: inline-block;
        }
        
        .yoruba-word::after {
            content: "🔊";
            position: absolute;
            right: 4px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.8em;
            color: #065f46;
            opacity: 0.7;
        }
        
        .yoruba-word:hover {
            background-color: #d1fae5;
            color: #064e3b;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
        
        .word-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 8px;
            margin: 1rem 0;
        }
        
        .status {
            background: #ecfccb;
            border: 1px solid #84cc16;
            border-radius: 6px;
            padding: 1rem;
            margin-top: 2rem;
            text-align: center;
            font-weight: 500;
            color: #365314;
        }
        
        .instructions {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 1rem;
            margin: 2rem 0;
            border-radius: 0 6px 6px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔊 Yorùbá Pronunciation Demo</h1>
        
        <div class="intro">
            <p><strong>Welcome to the Ifá Spiritual App Pronunciation System!</strong></p>
            <p>Click on any highlighted Yoruba word to hear its authentic pronunciation. 
               The system intelligently uses local audio files when available, 
               or Google Translate TTS as a fallback.</p>
        </div>

        <div class="word-section">
            <h3>Sacred Orishas</h3>
            <div class="word-grid">
                <span class="yoruba-word" data-word="òrìṣà">òrìṣà</span>
                <span class="yoruba-word" data-word="ṣàngó">ṣàngó</span>
                <span class="yoruba-word" data-word="ọ̀ṣun">ọ̀ṣun</span>
                <span class="yoruba-word" data-word="yemọja">yemọja</span>
                <span class="yoruba-word" data-word="ọbàtálá">ọbàtálá</span>
                <span class="yoruba-word" data-word="ògún">ògún</span>
                <span class="yoruba-word" data-word="ọya">ọya</span>
                <span class="yoruba-word" data-word="èṣù">èṣù</span>
                <span class="yoruba-word" data-word="ọ̀rúnmìlà">ọ̀rúnmìlà</span>
            </div>
        </div>

        <div class="word-section">
            <h3>Spiritual Concepts</h3>
            <div class="word-grid">
                <span class="yoruba-word" data-word="àṣẹ">àṣẹ</span>
                <span class="yoruba-word" data-word="ifá">ifá</span>
                <span class="yoruba-word" data-word="ọ̀run">ọ̀run</span>
                <span class="yoruba-word" data-word="ayé">ayé</span>
                <span class="yoruba-word" data-word="ẹ̀mí">ẹ̀mí</span>
                <span class="yoruba-word" data-word="àlàáfíà">àlàáfíà</span>
                <span class="yoruba-word" data-word="ìbùkún">ìbùkún</span>
            </div>
        </div>

        <div class="word-section">
            <h3>Common Words</h3>
            <div class="word-grid">
                <span class="yoruba-word" data-word="ọmọ">ọmọ</span>
                <span class="yoruba-word" data-word="ilé">ilé</span>
                <span class="yoruba-word" data-word="owó">owó</span>
                <span class="yoruba-word" data-word="àgbà">àgbà</span>
                <span class="yoruba-word" data-word="ọba">ọba</span>
                <span class="yoruba-word" data-word="ìyá">ìyá</span>
                <span class="yoruba-word" data-word="bàbá">bàbá</span>
            </div>
        </div>

        <div class="instructions">
            <strong>Technical Features:</strong>
            <ul>
                <li>🎵 Volume optimized to 90% for comfortable listening</li>
                <li>⏱️ Playback rate set to 95% for better comprehension</li>
                <li>🔄 Intelligent fallback from local files to Google TTS</li>
                <li>🎨 Enhanced visual feedback with hover and click animations</li>
                <li>📱 Fully responsive design for mobile and desktop</li>
            </ul>
        </div>

        <div class="status" id="status">
            Click any word above to test pronunciation!
        </div>
    </div>

    <script>
        const LOCAL_PATH = "/static/audio/pronunciation/";
        let yoPlayer = null;

        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll(".yoruba-word").forEach(el => {
                el.addEventListener("click", () => playWord(el.dataset.word, el));
            });
        });

        async function playWord(word, element) {
            const local = LOCAL_PATH + word.toLowerCase() + ".mp3";
            const fallback = `https://translate.google.com/translate_tts?client=tw-ob&tl=yo&q=${encodeURIComponent(word)}`;
            
            const status = document.getElementById('status');
            status.textContent = `Loading pronunciation for "${word}"...`;
            
            try {
                const head = await fetch(local, { method: "HEAD" });
                const src = head.ok ? local : fallback;
                const sourceType = head.ok ? "local audio file" : "Google TTS";
                
                if (yoPlayer) yoPlayer.pause();
                yoPlayer = new Audio(src);
                yoPlayer.volume = 0.9;
                yoPlayer.playbackRate = 0.95;
                
                yoPlayer.onloadstart = () => {
                    status.textContent = `Playing "${word}" from ${sourceType}...`;
                };
                
                yoPlayer.onended = () => {
                    status.textContent = `Completed: "${word}" (${sourceType})`;
                };
                
                yoPlayer.onerror = () => {
                    status.textContent = `Error playing "${word}". Please try again.`;
                };
                
                await yoPlayer.play();
                
            } catch (e) {
                console.error("Pronunciation error:", e);
                status.textContent = `Failed to play "${word}". Check your internet connection.`;
            }
        }
    </script>
</body>
</html>"""

    with open(f"{base}/templates/index.html", "w", encoding='utf-8') as f:
        f.write(html)

    # Enhanced Flask app with additional routes
    py = """from flask import Flask, render_template, jsonify, request
import os
import json

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/words')
def get_words():
    \"\"\"API endpoint to get available pronunciation words\"\"\"
    audio_dir = 'static/audio/pronunciation'
    words = []
    
    if os.path.exists(audio_dir):
        for file in os.listdir(audio_dir):
            if file.endswith('.mp3'):
                word = file.replace('.mp3', '')
                words.append({
                    'word': word,
                    'file': file,
                    'has_audio': True
                })
    
    return jsonify(words)

@app.route('/api/test/<word>')
def test_word(word):
    \"\"\"Test if a specific word has pronunciation available\"\"\"
    audio_file = f'static/audio/pronunciation/{word.lower()}.mp3'
    exists = os.path.exists(audio_file)
    
    return jsonify({
        'word': word,
        'has_local_audio': exists,
        'fallback_available': True,
        'file_path': audio_file if exists else None
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
"""

    with open(f"{base}/main.py", "w", encoding='utf-8') as f:
        f.write(py)

    # Create README file
    readme = """# Yorùbá Pronunciation Template

## Overview
A complete template for implementing Yoruba word pronunciation in web applications, specifically designed for spiritual and cultural applications like the Ifá Daily Reading App.

## Features
- Interactive clickable Yoruba words with speaker icons
- Intelligent audio fallback (local files → Google TTS)
- Enhanced visual feedback and animations
- Responsive design for mobile and desktop
- Comprehensive word collection (Orishas, spiritual concepts, common words)

## Technical Implementation
- Volume optimized to 90% for comfortable listening
- Playback rate set to 95% for better comprehension
- HEAD request validation for local audio files
- Error handling and status feedback
- Clean, modern UI with accessibility features

## Usage
1. Place audio files in `static/audio/pronunciation/`
2. Run the Flask app: `python main.py`
3. Navigate to `http://localhost:5000`
4. Click any highlighted word to hear pronunciation

## File Structure
```
yoruba_pronunciation_template/
├── main.py                    # Flask application
├── templates/
│   └── index.html            # Main demo page
└── static/
    └── audio/
        └── pronunciation/    # Audio files directory
```

## Integration
This template can be easily integrated into existing applications by:
1. Copying the CSS and JavaScript code
2. Adding the audio file structure
3. Implementing the playWord() function
4. Styling the .yoruba-word class elements

## Audio Files
The system supports both local MP3 files and Google Translate TTS fallback for unlimited vocabulary coverage.
"""

    with open(f"{base}/README.md", "w", encoding='utf-8') as f:
        f.write(readme)

    # Create zip archive
    zip_path = "exports/yoruba_pronunciation_template.zip"
    os.makedirs("exports", exist_ok=True)
    
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for root, dirs, files in os.walk(base):
            for file in files:
                full = os.path.join(root, file)
                arcname = os.path.relpath(full, base)
                z.write(full, arcname=arcname)
    
    print(f"Created Yoruba pronunciation template: {zip_path}")
    return zip_path

if __name__ == "__main__":
    template_path = create_yoruba_pronunciation_template()
    print(f"Template created successfully: {template_path}")