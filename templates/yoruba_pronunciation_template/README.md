# Yorùbá Pronunciation Template

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
