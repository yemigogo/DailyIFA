# 📘 Ifá Daily – Yoruba Sound & Wisdom App

This guide helps you set up, test, and prepare the Ifá Daily web app on Replit before pushing to mobile platforms. It includes instructions, a to-do checklist, and deployment notes.

---

## 📌 1. Project Overview

**Ifá Daily** delivers authentic Yoruba spiritual experience:
- Daily Ifá Odu and divination logic
- Accurate Yoruba pronunciation (currently disabled pending authentic recordings)
- Oríkì playback and ambient soundscapes
- Bilingual explanations and cultural context
- AI-powered rhythm recommendations with Batá drum patterns
- Personalized ancestral connection pathways

**Core Features**:
- **Daily Ifá Readings**: Authentic Odu verses with automated daily selection
- **Yoruba Pronunciation Module**: Interactive text with pronunciation guides (currently disabled pending authentic recordings)
- **Orisha Calendar System**: Traditional 4-day sacred cycle with daily guidance
- **Bilingual Interface**: Full English/Yoruba language support
- **Ancestral Connection Pathway**: Personalized spiritual guidance system
- **Wisdom Archive**: Searchable repository of past readings and insights
- **AI-Powered Rhythm Recommendations**: Personalized Batá drum patterns
- **Mobile-First Design**: Optimized for smartphone spiritual practice

**Current Status**: Audio pronunciation system intentionally disabled due to quality standards - awaiting authentic native speaker recordings.

## ✅ 2. Setup Instructions

### Environment Setup
```bash
# Main Application (React/Node.js)
npm run dev  # Starts both backend and frontend on port 5000

# Flask Components (for standalone pronunciation demos)
pip install flask
python pronunciation_demo_app.py  # Runs on port 5001
```

### Project Architecture
- **Main App**: React/TypeScript frontend with Node.js/Express backend
- **Database**: PostgreSQL with Drizzle ORM
- **Flask Components**: Standalone pronunciation demos and utilities
- **Styling**: Tailwind CSS with sacred color palette (amber, emerald, spiritual blue)
- **Audio**: Static file serving with HTML5 audio controls

### Folder Structure
```
/client/src/               # React frontend
  ├── components/          # UI components
  ├── pages/              # Route pages
  └── contexts/           # React contexts
/server/                   # Node.js backend
  ├── routes.ts           # API endpoints
  ├── storage.ts          # Database layer
  └── index.ts            # Server entry
/static/audio/            # Audio files
  ├── pronunciation/      # Yoruba word pronunciations (33 files)
  └── ambient/           # Spiritual soundscapes
/shared/schema.ts         # Database models
/templates/               # Jinja2 templates (Flask components)
/scripts/                 # Utility scripts
```

### Audio File Requirements
- **Format**: MP3, 22050Hz sample rate, mono channel
- **Size**: Minimum 10KB for authentic recordings
- **Naming**: ASCII-safe filenames (e.g., `sango.mp3` for `ṣàngó`)
- **Quality**: Native speaker recordings only - no synthetic audio

## 🧩 3. Components Overview

### Core Application Files
- **`server/index.ts`**: Express server and API routing
- **`client/src/App.tsx`**: Main React application entry point
- **`server/routes.ts`**: Backend API endpoints for readings, Odus, prayers
- **`shared/schema.ts`**: Database schema and TypeScript types
- **`server/storage.ts`**: Database interaction layer

### Flask Components
- **`pronunciation_demo_app.py`**: Standalone pronunciation testing (port 5001)
- **`enhanced_pronunciation_server.py`**: Advanced pronunciation features
- **`app.py`**: Legacy Flask application with SQLite backend

### Frontend Components
- **`daily-reading.tsx`**: Main reading display with Odu interpretation
- **`interactive-yoruba-text.tsx`**: Yoruba word detection and pronunciation (disabled)
- **`yoruba-pronunciation-demo.tsx`**: Pronunciation testing interface (disabled)
- **`rhythm-visualizer.tsx`**: Batá drum pattern visualization
- **`orisha-calendar.tsx`**: Traditional 4-day sacred cycle display

### Audio System
- **`static/audio/pronunciation/`**: Yoruba word pronunciations
  - Current files: 33 audio files including ase.mp3, orisa.mp3, sango.mp3, etc.
  - Status: Disabled pending authentic recordings
- **`static/audio/ambient/`**: Spiritual soundscapes for meditation

### Database Components
- **Odus**: 256 traditional Ifá verses with interpretations
- **Daily Readings**: Automated daily Odu selection and tracking
- **Prayers**: Daily and lunar prayer cycles
- **User Data**: Reading history and practice tracking

## 📂 4. Audio Checklist

### Current Audio Status
**🔇 DISABLED**: All pronunciation features are intentionally disabled due to quality standards.

### Pronunciation Audio Requirements
- [ ] **Native Speaker Recordings**: Only authentic Yoruba speakers from Nigeria/Benin/Togo
- [ ] **File Naming**: ASCII-safe names matching map.json entries
- [ ] **Quality Standards**: Clear enunciation with proper tonal patterns
- [ ] **Cultural Context**: Speakers who understand spiritual terminology
- [ ] **Format**: MP3, 22050Hz, mono, minimum 10KB file size
- [ ] **No Synthetic Audio**: Absolutely no Google TTS or generated voices

### Priority Words for Recording
- [ ] `ṣàngó` (sango.mp3) - Orisha of thunder
- [ ] `òrìṣà` (orisa.mp3) - Deity/divine force  
- [ ] `àṣẹ` (ase.mp3) - Divine power/amen
- [ ] `ọ̀ṣun` (osun.mp3) - River goddess
- [ ] `ọ̀rúnmìlà` (orunmila.mp3) - Orisha of wisdom
- [ ] `yemọja` (yemoja.mp3) - Ocean mother
- [ ] `ifá` (ifa.mp3) - Divination system

### Audio Validation
- [ ] Files load without errors (Status 200)
- [ ] Proper MIME type: `audio/mpeg`
- [ ] No synthetic/generated audio
- [ ] Cultural authenticity verified by native speakers

## 🐛 5. Bug Fix Workflow

### Audio Testing Process
1. **Manual Browser Testing**
   - Open developer tools → Network tab
   - Click audio elements and verify Status 200 responses
   - Check console for JavaScript errors

2. **File Validation**
   ```bash
   # Check file exists and size
   ls -la static/audio/pronunciation/sango.mp3
   
   # Test file accessibility
   curl -I http://localhost:5000/static/audio/pronunciation/sango.mp3
   ```

3. **Audio Quality Check**
   - Verify playbackRate and volume settings in JavaScript
   - Test across different browsers and devices
   - Ensure mobile compatibility

4. **Error Logging**
   - Monitor browser console for audio loading errors
   - Check network requests for failed file loads
   - Validate JSON mapping files

### Common Issues and Solutions
- **Audio not playing**: Check browser autoplay policies
- **Files not found**: Verify filename matches map.json entries
- **Poor quality**: Replace with authentic native speaker recordings
- **Mobile issues**: Test on actual devices, not just browser emulation

## 📦 6. Database Prep (for later mobile sync)

### Current Database Schema
- **odus**: Traditional Ifá verses and interpretations
- **dailyReadings**: Daily reading generation and tracking
- **dailyPrayers**: Weekly prayer cycle
- **ifaLunarPrayers**: Lunar-based spiritual practices
- **divinationLogs**: User reading history
- **eboRecommendations**: Spiritual guidance and offerings

### API Endpoints
```
GET /api/readings/today           # Today's Odu reading
GET /api/readings/{date}          # Specific date reading
GET /api/readings/history         # Reading history
GET /api/odus                     # All Odus
GET /api/odus/{id}                # Specific Odu details
GET /api/search?problem={query}   # Problem-based Odu search
GET /api/ebo-recommendations      # Spiritual guidance
```

### Mobile Sync Preparation
- [x] **JSON Mapping**: Unicode-safe filename mapping complete (`map.json`)
- [x] **Normalized Audio Names**: Slugified filenames with Unicode-safe naming
- [x] **API Endpoints**: RESTful design for mobile app consumption
- [ ] **Caching Headers**: Static audio files properly cached
- [x] **Clean Fallback**: Proper handling for missing authentic files

## 🔄 7. Ready for Mobile?

### Frontend Requirements
- [x] **Mobile-Responsive Design**: Tailwind CSS with mobile-first approach
- [x] **Touch-Friendly Interface**: Large touch targets and intuitive navigation
- [x] **Fast Loading**: Optimized images and efficient API calls
- [x] **Offline Capability**: Core functionality works without network

### Audio Integration Status
- [ ] **All audio integrated and plays on click**: Currently disabled pending authentic recordings
- [x] **No Google TTS fallback**: Completely removed synthetic audio
- [x] **Runs cleanly in mobile browser preview**: React app is mobile-responsive
- [x] **Clean fallback for missing files**: Proper error handling implemented
- [x] **UI elements mobile-responsive**: Tailwind CSS mobile-first design

### Performance Optimization
- [x] **Image Optimization**: SVG icons and optimized backgrounds
- [x] **API Efficiency**: Minimal database queries and response caching
- [x] **Bundle Size**: Efficient component loading and code splitting
- [x] **Progressive Enhancement**: Works without JavaScript for core content

### Testing Checklist
- [x] **Desktop Browser**: Chrome, Firefox, Safari compatibility
- [ ] **Mobile Browser**: iOS Safari and Android Chrome testing
- [x] **Responsive Design**: All screen sizes from 320px to 1920px
- [x] **Accessibility**: Keyboard navigation and screen reader support

## 🎯 Next Steps for Deployment

### Immediate Actions Required
1. **Obtain Authentic Audio**: Record native Yoruba speakers for pronunciation
2. **Mobile Testing**: Comprehensive testing on actual mobile devices
3. **Performance Audit**: Lighthouse score optimization
4. **Content Review**: Cultural authenticity verification by Yoruba speakers

### Deployment Preparation
- **Environment Variables**: Database URL and API keys configured
- **Static Assets**: Optimized for CDN delivery
- **Database Migration**: Production schema deployment ready
- **Monitoring**: Error tracking and performance monitoring setup

## 🔧 Development Guidelines

### Code Standards
- **TypeScript**: Strict type checking enabled
- **React**: Functional components with hooks
- **Database**: Drizzle ORM with PostgreSQL
- **Styling**: Tailwind CSS with custom sacred color palette

### Cultural Sensitivity
- **Terminology**: Use authentic Yoruba terms (e.g., "Ìwúre" not "Àdúrà")
- **Content**: All spiritual content verified by cultural experts
- **Audio**: Only native speaker recordings accepted
- **Respect**: Maintain sacred context of Ifá tradition

---

> **To contribute or test, fork this Replit and upload your own verified audio into the correct folders. Make sure filenames match those in the map.json file.**

---

**Audio Quality Standards**: This application prioritizes cultural authenticity over technical convenience. The audio system remains disabled until genuine native speaker recordings are available, maintaining the spiritual integrity of the Ifá tradition.

**Testing Protocol**: Use DevTools → Network tab to confirm audio loads (Status 200), validate audio MIME type (`audio/mpeg`), and ensure no synthetic/generated audio is used.