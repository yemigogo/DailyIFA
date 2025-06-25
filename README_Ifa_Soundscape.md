# Ifá Soundscape - Advanced Spiritual Audio Experience

## Overview
A comprehensive web application for creating immersive Yoruba spiritual experiences through layered audio mixing, featuring authentic traditional sounds, ceremonial drumming, and sacred chants.

## Features

### 🎵 3-Layer Audio System
- **Layer 1**: Primary spiritual content (chants, ceremonial drums)
- **Layer 2**: Nature ambience (ocean waves, sacred forest, flowing river)
- **Layer 3**: Optional Oríkì overlays (traditional praise poetry)

### 🥁 Authentic Audio Content
- **Batá Egungun Ceremonial Drumming**: Traditional ancestral worship patterns
- **Ifá Wisdom Chants**: Sacred verses for divine guidance
- **Talking Drums**: Traditional Yoruba communication rhythms
- **Nature Soundscapes**: Ocean blessings, sacred forest ambience
- **Oríkì Praise Poetry**: Traditional verses for major Orishas

### ⚙️ Advanced Controls
- **Timing Synchronization**: Offset controls for precise drum timing
- **Volume Mixing**: Independent volume controls for each layer
- **Sleep Timer**: Auto-stop functionality (1-120 minutes)
- **Preset Combinations**: Sacred preset mixes for specific purposes

### 📱 User Experience
- **Responsive Design**: Mobile-optimized interface
- **Dynamic Backgrounds**: Visual themes that change with sound selection
- **Cultural Information**: Detailed context for each soundscape
- **Keyboard Shortcuts**: Space=Play/Pause, Escape=Stop, Ctrl+S=Timer

## File Structure
```
ifa-soundscape/
├── templates/
│   ├── index.html              # Advanced template
│   └── audio_demo.html         # 3-layer mixing demo
├── static/
│   ├── audio/
│   │   └── soundscapes/        # Audio files (.mp3)
│   └── images/
│       └── backgrounds/        # Background images
├── app.py                      # Flask application
└── README.md                   # This file
```

## Required Audio Files
Place these MP3 files in `static/audio/soundscapes/`:

### Primary Spiritual Content
- `ifa_wisdom_chant.mp3` - Traditional wisdom verses
- `ifa_prosperity_chant.mp3` - Abundance attraction chants
- `bata_egungun_abida.mp3` - Ceremonial ancestral drumming
- `talking_drum_loop.mp3` - Traditional communication drums

### Nature Ambience
- `ocean_blessing_waves.mp3` - Yemoja healing waves
- `sacred_forest.mp3` - Earth spirit connection sounds
- `flowing_river.mp3` - Oshun river blessings
- `temple_peace.mp3` - Serene temple atmosphere

### Oríkì Overlays (Optional)
- `oriki_sango.mp3` - Praise poetry for Ṣàngó
- `oriki_orunmila.mp3` - Praise poetry for Òrúnmìlà
- `oriki_obatala.mp3` - Praise poetry for Ọbàtálá
- `oriki_ogun.mp3` - Praise poetry for Ògún

## Installation & Setup

### Quick Start
1. Install Flask: `pip install flask`
2. Place audio files in correct directories
3. Run: `python app.py`
4. Open: `http://localhost:5000`

### Full Setup
```bash
# Create project directory
mkdir ifa-soundscape
cd ifa-soundscape

# Create directory structure
mkdir -p static/audio/soundscapes
mkdir -p static/images/backgrounds
mkdir -p templates

# Copy template files
cp ifa_soundscape_advanced_template.html templates/index.html
cp ifa_soundscape_flask_app.py app.py

# Install Flask
pip install flask

# Add your audio files to static/audio/soundscapes/

# Run application
python app.py
```

## Sacred Preset Combinations

### 👻 Ancestral Communion
- **Purpose**: Deep connection with ancestral wisdom
- **Layers**: Batá Egungun drums + Sacred forest ambience
- **Use**: Meditation, ancestral guidance, spiritual protection

### 🌊 Divine Healing
- **Purpose**: Emotional and spiritual healing
- **Layers**: Ifá wisdom chant + Ocean blessing waves
- **Use**: Emotional cleansing, spiritual renewal, healing rituals

### 💰 Prosperity Ritual
- **Purpose**: Abundance and material blessings
- **Layers**: Ifá prosperity chant + Flowing river
- **Use**: Wealth attraction, business success, material abundance

## Cultural Context

### Spiritual Significance
Each soundscape carries deep cultural and spiritual meaning:

- **Batá Drums**: Sacred instruments that speak the language of the Orishas
- **Ifá Chants**: Traditional verses for divine wisdom and guidance
- **Ocean Waves**: Yemoja's maternal energy for healing and protection
- **Sacred Forest**: Connection to earth spirits and natural forces

### Traditional Uses
- **Morning Prayer**: Wisdom chants with nature ambience
- **Healing Ceremonies**: Ocean waves with appropriate Oríkì
- **Ancestral Communication**: Ceremonial drums with forest sounds
- **Prosperity Rituals**: Abundance chants with flowing water

## Technical Features

### Audio Synchronization
- Precise timing controls for drum layers
- Fade-in/fade-out transitions
- Loop management for continuous experience

### Volume Management
- Independent layer controls
- Master volume with mute functionality
- Balanced mixing for optimal spiritual experience

### Sleep Timer
- Automatic audio stop after set duration
- Gentle fade-out before stopping
- Timer status display and cancellation

## Browser Compatibility
- Modern browsers with HTML5 audio support
- Mobile browsers (iOS Safari, Android Chrome)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## Customization

### Adding New Audio
1. Place MP3 files in `static/audio/soundscapes/`
2. Update `audioMap` in the HTML template
3. Add sound details to `soundDetails` object
4. Update dropdown options in HTML

### Creating New Presets
Add to the `presets` object in JavaScript:
```javascript
new_preset: {
    layer1: "audio_file_id",
    layer2: "nature_sound_id",
    layer3: "oriki_id",
    offset: 0.5  // seconds
}
```

## Keyboard Shortcuts
- **Space**: Play/Pause current selection
- **Escape**: Stop all audio layers
- **Ctrl+S**: Set sleep timer with current value

## Support & Documentation
For questions about Yoruba spiritual practices or audio content, consult with traditional practitioners and cultural experts.

## Spiritual Disclaimer
This application is designed to support authentic Yoruba spiritual practices. Always approach these traditions with respect and seek guidance from knowledgeable practitioners when appropriate.

---

**Àṣẹ** - May the divine force be with you in your spiritual journey.