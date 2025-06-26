# Ifá Daily – Yoruba Sound & Wisdom App

## 📌 Project Overview

**Purpose**: Deliver authentic daily Ifá Odu readings, Yoruba wisdom, traditional Oríkì (praise poetry), and spiritual guidance through a modern web application that bridges ancient Yoruba wisdom with contemporary digital accessibility.

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

## ✅ Setup Instructions

### Environment Setup
```bash
# Python Flask environment (already configured)
npm run dev  # Starts both backend and frontend on port 5000
```

### Project Architecture
- **Frontend**: React with TypeScript, Vite build system
- **Backend**: Node.js/Express with PostgreSQL database
- **Styling**: Tailwind CSS with sacred color palette
- **Audio**: Static file serving with HTML5 audio controls

### Folder Structure
```
/client/src/components/     # React components
/server/                    # Backend API routes
/static/audio/             # Audio files directory
  ├── pronunciation/       # Yoruba word pronunciations
  └── ambient/            # Spiritual soundscapes
/shared/schema.ts          # Database models
/templates/                # Static templates
```

### Audio File Requirements
- **Format**: MP3, 22050Hz sample rate, mono channel
- **Size**: Minimum 10KB for authentic recordings
- **Naming**: ASCII-safe filenames (e.g., `sango.mp3` for `ṣàngó`)
- **Quality**: Native speaker recordings only - no synthetic audio

## 🧩 Components Overview

### Core Application Files
- **`server/index.ts`**: Express server and API routing
- **`client/src/App.tsx`**: Main React application entry point
- **`server/routes.ts`**: Backend API endpoints for readings, Odus, prayers
- **`shared/schema.ts`**: Database schema and TypeScript types
- **`server/storage.ts`**: Database interaction layer

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

## 📂 Audio Checklist

### Pronunciation Audio Requirements
- [ ] **Native Speaker Recordings**: Only authentic Yoruba speakers from Nigeria/Benin/Togo
- [ ] **File Naming**: ASCII-safe names matching map.json entries
- [ ] **Quality Standards**: Clear enunciation with proper tonal patterns
- [ ] **Cultural Context**: Speakers who understand spiritual terminology
- [ ] **Format**: MP3, 22050Hz, mono, minimum 10KB file size

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

## 🐛 Bug Fix Workflow

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

## 📦 Database and API Structure

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

### Mobile Preparation
- [ ] **JSON Mapping**: Unicode-safe filename mapping complete
- [ ] **API Endpoints**: RESTful design for mobile app consumption
- [ ] **Caching Headers**: Static audio files properly cached
- [ ] **CORS Configuration**: Cross-origin requests handled
- [ ] **Error Handling**: Graceful fallbacks for missing content

## 🔄 Ready for Mobile?

### Frontend Requirements
- [x] **Mobile-Responsive Design**: Tailwind CSS with mobile-first approach
- [x] **Touch-Friendly Interface**: Large touch targets and intuitive navigation
- [x] **Fast Loading**: Optimized images and efficient API calls
- [x] **Offline Capability**: Core functionality works without network

### Audio System Status
- [ ] **Authentic Audio**: Currently disabled - awaiting native speaker recordings
- [x] **Clean Fallbacks**: Proper error handling for missing files
- [x] **Mobile Audio**: HTML5 audio controls work on mobile browsers
- [ ] **No Synthetic Audio**: Removed all Google TTS and generated content

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

> **To contribute or test, fork this Replit and upload your own verified authentic audio recordings into the correct folders. Ensure filenames match the pronunciation mapping system and that all recordings are from native Yoruba speakers who understand the spiritual context of these sacred terms.**

---

**Note**: This application prioritizes cultural authenticity over technical convenience. The audio system remains disabled until genuine native speaker recordings are available, maintaining the spiritual integrity of the Ifá tradition.