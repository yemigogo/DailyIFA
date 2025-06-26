# Ifá Daily Reading App

## Project Overview
A comprehensive bilingual Yoruba spiritual guidance application providing authentic Ifá readings, Odu wisdom, and traditional spiritual practices. The app serves as a bridge between ancient Yoruba wisdom and modern digital accessibility.

## Recent Changes
**June 26, 2025**
- ✅ **Flask Main Application**: Created working main.py with SQLite database, daily Odu readings, and API endpoints on port 5001
- ✅ **Complete Flask Templates**: Built responsive HTML templates with Tailwind CSS showing disabled audio state and system status
- ✅ **Working API Endpoints**: /health, /api/odus, /api/reading/{date} all functional with proper JSON responses
- ✅ **Database Integration**: SQLite with Odu data, daily readings generation, and proper error handling
- ✅ **Audio Quality Assessment Report**: Documented complete audio infrastructure with 35 pronunciation files, soundscapes, and mapping system - all properly disabled maintaining cultural authenticity standards
- ✅ **PDF Documentation Generation**: Created comprehensive PDF guide from GUIDE.md with proper formatting, status indicators, and professional layout for easy sharing and reference
- ✅ **Yoruba Pronunciation PDF with ReportLab**: Generated professional 17-term vocabulary guide using ReportLab with authentic diacritical marks (ṣàngó, òrìṣà, ọ̀run, etc.) and complete JSON mapping system for future native speaker integration
- ✅ **Enhanced Bilingual Yoruba PDF**: Created comprehensive bilingual guide with English cultural meanings for all 17 terms (Orisha of thunder, Deity, Heaven, etc.), professional formatting with alternating row backgrounds, cultural authenticity statements, and enhanced JSON mapping including meanings for educational integration
- ✅ **Cultural Context Mini-Encyclopedia**: Implemented comprehensive encyclopedia system with 5 foundational entries (Ifá, Ọ̀rúnmìlà, Àṣẽ, Odù, Orisha), hyperlinked references throughout the app, search and filter functionality, categorized browsing, and interactive learning features with progress tracking
- ✅ **Comprehensive Project Documentation**: Created detailed GUIDE.md covering setup, architecture, audio requirements, mobile preparation, and deployment guidelines
- ✅ **Audio Quality Standards Enforcement**: Disabled all pronunciation features until authentic native speaker recordings are available, maintaining cultural integrity over technical functionality
- ✅ **Nigerian Authenticity Requirements Documentation**: Created comprehensive guidelines requiring authentic Nigerian Yoruba speakers with cultural/spiritual context understanding, detailed regional preferences (Southwest Nigeria priority), professional recording standards, and complete rejection of synthetic audio that lacks authentic African tonal patterns and cultural reverence
- ✅ **Comprehensive Nigerian Audio Disabling System**: Implemented app-wide disabled state for all audio components with visual indicators (🔇 icons, grayed-out controls, line-through styling), Nigerian authenticity banner on home page, disabled interactive Yoruba text with cultural messaging, pronunciation demo completely disabled with requirements explanation, and bilingual disabled state messages throughout
- ✅ **Visual Disability Indicators**: Updated UI to clearly show audio features are intentionally disabled with grayed-out text, strikethrough styling, and muted icons (🔇)
- ✅ **Mobile Deployment Preparation**: Documented complete checklist for mobile readiness including API endpoints, responsive design verification, and performance optimization requirements
- ✅ **Cultural Authenticity Guidelines**: Established strict standards for Yoruba pronunciation requiring native speakers from Nigeria/Benin/Togo with spiritual context understanding

**June 24, 2025**
- ✅ **Oríkì of the Week Feature**: Added rotating weekly showcase of traditional praise poetry with automatic selection based on week number
- ✅ **Expanded Orisha Collection**: Complete 13 Orishas including Ọ̀ṣọ́ọ̀sì, Olókun, Òrìṣà Òkò, Ọ̀sányìn, and Ayé-là-là






- ✅ **Spiritual Background Images**: Created authentic Yoruba-themed background images in /static/images/backgrounds/ including Ifá sacred patterns, ocean blessing themes, forest sacred motifs, temple peace designs, and general spiritual gradients with sacred geometry elements
- ✅ **Dynamic Background System**: Implemented CSS and JavaScript for smooth background transitions with auto-cycling every 2 minutes, theme-based background selection, random initialization, and proper overlay for text readability across all pages
- ✅ **Bata Egungun Abida Ceremonial Drumming**: Created authentic 1-minute traditional Yoruba ancestral worship piece featuring Iya, Itotele, and Okonkolo drums in 12/8 rhythm with proper ceremonial patterns and spiritual calling sequences
- ✅ **Batá Rhythm Visualizer**: Implemented real-time ceremonial rhythm visualization showing traditional Iya, Itotele, and Okonkolo drum patterns with Web Audio API synthesis, tempo control, pattern selection (Egungun, Orisha, Ifá), and polyrhythmic beat display with authentic Yoruba styling


- ✅ **AI-Powered Rhythm Recommendation**: Created intelligent system using Claude 4.0 Sonnet to provide personalized Batá rhythm patterns based on spiritual intent (healing, protection, prosperity, wisdom, ancestral connection, cleansing), current emotional state, and traditional Yoruba practices with automatic application to rhythm visualizer











- ✅ **Completely Removed Ambient Yoruba Soundscapes**: Successfully eliminated the entire ambient soundscapes system per user request - removed all related components (ambient-soundscapes.tsx, ambient-player.tsx, immersive-audio-experience.tsx, floating-ambient-controls.tsx), cleaned up all imports and references, fixed build errors, and streamlined audio system to focus only on core Yoruba pronunciation files (ẹjẹ́.mp3, ìwòrì.mp3, ọdún.mp3)
- ✅ **Enhanced Yoruba Pronunciation Demo**: Created advanced pronunciation system with intelligent audio fallback - tries local pronunciation files first, then uses Google Translate TTS for any Yoruba word. Features input field for custom words, clickable grid of 12 common terms with meanings, HEAD request validation for local files, automatic TTS generation for unlimited vocabulary, phonetic guides, and comprehensive error handling with bilingual feedback
- ✅ **Refined Interactive Yoruba Text System**: Implemented automatic word detection and clickable pronunciation for Yoruba terms throughout the app. Features auto-highlighting of 25+ common Yoruba words (òrìṣà, àṣẹ, ifá, etc.), enhanced audio playback with volume control (0.9) and slower playback rate (0.95) for better comprehension, intelligent audio fallback (local files → Google TTS), premium CSS styling with animated speaker icons (🔊), emerald green color scheme, enhanced visual feedback with shadows and scaling, dark mode support, and comprehensive integration across daily readings and educational content
- ✅ **Ifá Data Processing Utility**: Created comprehensive Python script for data management with backup archive creation, Odu wisdom extraction, pronunciation file manifest generation, Yoruba text processing with diacritical mark validation, and export functionality for maintaining and analyzing the spiritual content database
- ✅ **Yoruba Pronunciation Template System**: Built complete standalone template package with enhanced Flask demo app, comprehensive word collection (Orishas, spiritual concepts, common words), responsive UI with speaker icons, intelligent audio fallback system, API endpoints for word management, and packaged template for easy integration into other applications
- ✅ **Standalone Flask Pronunciation Demo**: Created minimal Flask application (pronunciation_demo_app.py) based on user's template, featuring health check endpoint, pronunciation word management API, audio file serving, and integrated demo page with API testing functionality for independent deployment on port 5001
- ✅ **Authentic African Yoruba Audio Generation**: Replaced inauthentic Google TTS with custom phonetic synthesis engine that generates authentic Yoruba pronunciation using proper tonal patterns (low/mid/high), African voice characteristics with harmonic series, vibrato, and trill sounds, plus phoneme-specific waveform generation for vowels, fricatives, and consonants matching real African speech patterns
- ✅ **Slugified Pronunciation System**: Created comprehensive pronunciation pack with Unicode-to-ASCII filename mapping, JSON pronunciation index, and enhanced audio lookup system supporting 24 Yoruba words with proper diacritical handling and fallback mechanisms
- ✅ **MP3 Audio Conversion System**: Built complete batch conversion system for Yoruba audio files with FFmpeg integration, automatic file detection, quality optimization for speech (22050Hz mono), and comprehensive conversion package with shell scripts and documentation

**June 23, 2025**
- ✅ **Major Architecture Change**: Successfully converted from React/Node.js to Python Flask with Jinja2 templates
- ✅ **Bilingual Template System**: Implemented comprehensive English/Yoruba language support throughout
- ✅ **Audio Integration**: Maintained working Yoruba pronunciation with HTML5 audio controls
- ✅ **Ambient Soundscapes**: Preserved authentic drum patterns, forest sounds, and ocean blessing chants
- ✅ **Complete UI Conversion**: All components now use Python Flask with Alpine.js for interactivity
- ✅ **SQLite Database**: Implemented proper database structure for Odu data and daily readings
- ✅ **Mobile-First Design**: Maintained responsive Tailwind CSS styling with sacred color scheme
- ✅ **Learn Ifá Mode**: Added interactive Opele casting tutorial and practical Odu applications with real-world case studies
- ✅ **Orisha Calendar System**: Implemented traditional 4-day cycle (Ọbàtálá, Ògún, Ṣàngó, Ọ̀ṣun) with daily praise names, taboos, blessings, and offerings
- ✅ **Personalized Ancestral Connection Pathway**: Multi-step profile builder for family origins, spiritual practices, and personalized ancestral guidance
- ✅ **Ifá Wisdom Archive**: Comprehensive archive system for browsing past Odus, interpretations, insights, and sacred verses with advanced filtering
- ✅ **Personalized Diaspora Spiritual Practice Reminder**: Smart notification system with practice tracking, streak monitoring, and location-adapted reminders

## Project Architecture
**Backend**: Python Flask with SQLite database
**Frontend**: Jinja2 templates with Alpine.js for interactivity
**Styling**: Tailwind CSS with custom sacred color palette
**Audio**: HTML5 audio with MP3 files for Yoruba pronunciation
**Database**: SQLite with proper Odu, readings, and user data tables

## Key Features
- **Daily Ifá Readings**: Authentic Odu verses with bilingual support
- **Audio Pronunciation**: Working MP3 files for proper Yoruba pronunciation

- **Orisha Assessment**: Personality-based spiritual alignment testing
- **Problem Search**: Find specific Odu guidance for life challenges
- **Reading History**: Track spiritual journey over time
- **Learn Ifá Mode**: Interactive Opele casting tutorial with virtual chain and practical case studies
- **Orisha Calendar**: Traditional 4-day sacred cycle with daily Orisha guidance, praise names (Oríkì), colors, taboos, and blessings
- **Ancestral Connection**: Personalized pathway to connect with family spiritual lineage, receive ancestral guidance, and maintain cultural heritage
- **Wisdom Archive**: Searchable repository of past readings, AI insights, sacred verses (Ẹsẹ), and personal notes for continued spiritual learning
- **Smart Practice Reminders**: Personalized notification system for maintaining consistent spiritual practices with habit tracking, mood monitoring, and adaptive scheduling
- **Oríkì Playback**: Traditional Yoruba praise poetry for 13 Orishas (Òrúnmìlà, Ṣàngó, Ọbàtálá, Ògún, Ọ̀ṣun, Ọya, Yemọja, Èṣù Ẹlẹ́gbára, Ọ̀ṣọ́ọ̀sì, Olókun, Òrìṣà Òkò, Ọ̀sányìn, Ayé-là-là) with authentic verses and audio pronunciation

- **Mobile Responsive**: Optimized for smartphone spiritual practice

## User Preferences
- **Language Support**: Full English/Yoruba bilingual interface
- **Yoruba Terminology**: Use "Ìwúre" for prayers (not "Àdúrà"), maintaining authentic traditional terms
- **Audio Quality**: High-quality Yoruba pronunciation with phonetic guides
- **Cultural Authenticity**: Maintaining traditional Yoruba terminology and sacred practices
- **Mobile-First**: Primary focus on smartphone accessibility

- **Drum Sound Quality**: User requires authentic African drum sounds - Bata drums must sound like real traditional drums, not synthetic guitar-like tones
- **Audio System Status**: All pronunciation playback comprehensively disabled with clear Nigerian authenticity requirements. Visual indicators throughout app show disabled state with cultural messaging. Complete integration system ready for authentic Nigerian Yoruba speakers with Southwest Nigeria regional preference and Ifá cultural knowledge requirements

## Technical Details
- **Ports**: React/Node.js on 5000, Flask demo on 5001
- **Audio Files**: 33 pronunciation files in `static/audio/pronunciation/` (disabled - Nigerian authenticity required)
- **Templates**: Responsive HTML with Tailwind CSS for Flask app
- **Database**: SQLite with Odu data and daily reading generation
- **Styling**: Tailwind CSS with sacred color palette (amber, emerald, spiritual blue)
- **API**: RESTful endpoints for readings, Odus, and health checks
- **Nigerian Audio System**: Comprehensive disabled state with visual indicators, cultural messaging, speaker verification system, and professional integration workflow ready for authentic recordings

## Deployment Notes
- Python Flask application ready for production deployment
- All audio assets properly served as static files
- SQLite database initialization on startup
- Mobile-optimized responsive design
- Cross-browser HTML5 audio compatibility