# Ifá Daily Reading App

## Overview

The Ifá Daily Reading app is a digital platform offering authentic spiritual guidance through daily Ifá readings with 256 Odu interpretations, interactive 3D Yorùbá Cosmic Realms visualization, and an 8-Orisha healing system with sacred frequency therapy. It integrates authentic audio content, multimedia educational resources, and bilingual Yoruba-English support. The app aims to provide personalized spiritual guidance, preserve Yoruba cultural heritage, and make ancient wisdom accessible to a global audience while maintaining strict authenticity standards. It targets spiritual practitioners, cultural enthusiasts, students, diaspora communities, wellness seekers, and educators.

## User Preferences

- **Language Support**: Full English/Yoruba bilingual interface
- **Yoruba Terminology**: Use "Ìwúre" for prayers (not "Àdúrà"), maintaining authentic traditional terms
- **Audio Quality**: High-quality Yoruba pronunciation with phonetic guides
- **Cultural Authenticity**: Maintaining traditional Yoruba terminology and sacred practices
- **Mobile-First**: Primary focus on smartphone accessibility
- **Drum Sound Quality**: User requires authentic African drum sounds - Bata drums must sound like real traditional drums, not synthetic guitar-like tones
- **Audio System Status**: All pronunciation playback comprehensively disabled with clear Nigerian authenticity requirements. Visual indicators throughout app show disabled state with cultural messaging. Complete integration system ready for authentic Nigerian Yoruba speakers with Southwest Nigeria regional preference and Ifá cultural knowledge requirements

## System Architecture

The application is built on a modern full-stack architecture.

**UI/UX Decisions:**
- Mobile-first responsive design with Tailwind CSS and a custom sacred color palette (amber, emerald, spiritual blue).
- Professional dark theme styling with gray-900 to black gradients and accent colors specific to Orishas (e.g., pink for Òbàtálá, cyan for Yemọja, red for Ṣàngó).
- Glass morphism effects and backdrop blur styling.
- Interactive elements with hover effects, icon scaling, and rotation.
- Bilingual interface with clear language toggle and cultural messaging.
- Authentic Yoruba-themed background images with dynamic transitions.
- Enhanced navigation system with tabbed interfaces and intuitive iconography.
- Professional typography and clear visual hierarchy for content.

**Technical Implementations & Feature Specifications:**
- **Daily Ifá Readings:** Dynamic display of today's authentic Odu, unified card mapping, and comprehensive 256 Odu visualization system with search, filtering, and detailed views.
- **Complete 256 Odu Catalog System:** Client-side catalog (`client/src/data/odu-catalog.ts`) providing all 256 Odu metadata (16 major + 240 combined), with intelligent merging of database records for enhanced content. Implements search by name/Yoruba name/card number, filter by type (All/Major/Minor), and pagination for optimal performance. Available on both `/learn` and `/odu-256` pages with mobile-responsive grid layouts.
- **Orisha Healing Systems:**
    - Yemoja 432Hz Water Healing: Continuous water loop meditation, water crystal visualization, and authentic rituals.
    - Òbàtálá 963Hz Divine Healing: Divine connection frequencies and purification rituals.
    - Ṣàngó 528Hz Thunder & Fire Healing: Transformation frequencies, thunder power integration, and courage cultivation.
    - Èṣù Transformation Healing: Fire frequency generator with 4 transformation frequencies and crossroads healing rituals.
    - Comprehensive 8-Orisha healing system with authentic orchestral frequency tracks and sacred frequency generator.
- **Enhanced Sacred Frequency Audio System:** Advanced Web Audio API implementation generating distinctly different healing sounds for each frequency. Features harmonic-rich soundscapes with multiple oscillators, varied waveforms (sine, triangle, square, sawtooth), and unique audio characteristics: Love & Healing (528Hz) with warm harmonics, Natural Healing (432Hz) with earthy resonance, Transformation (396Hz) with dynamic tremolo, Intuition (741Hz) with crystalline clarity, and Divine Connection (963Hz) with ethereal vibrato. Includes proper audio resource management, real-time volume control, and meditation timer with interval chimes.
- **Interactive 3D Yorùbá Cosmic Realms Visualization:** Interactive canvas with Òrun, Ayé, and Ilẹ̀-Ọkùn realms, featuring 8 floating Orisha spheres and interactive details.
- **Orisha Avatar Creator:** Spiritual assessment, canvas-based avatar generation with sacred geometry, and advanced sharing capabilities.
- **Yorùbá Cosmology Explorer:** Comprehensive learning modules covering realms, spirit classification, cosmic laws, and interactive quizzes.
- **Gregorian-Yoruba Dual Calendar System:** 13-month Odun cycle overlay, Gregorian month correspondences, moon phase calculations, and Orisha associations.
- **Enhanced Profile System:** Spiritual journey tracking, advanced notification preferences, practice tracking, social features, and theme customization.
- **Multimedia Educational Series:** Six progressive video series, authentic audio content, and comprehensive learning framework.
- **Authentic Audio System:** Royalty-free audio support with 3-tier fallback, comprehensive recording workflow, and Nigerian authenticity requirements for all pronunciation.
- **Sacred Divination Practices Audio:** 29-minute authentic audio guide (41.8 MB MP3) exploring Ifá divination and spiritual communication practices. Located on /audio page with prominent direct access link for browser compatibility. File served via Express static middleware at `/static/audio/ifa_divination_priests_spirit_world.mp3`. Includes comprehensive error logging and fallback UI for browsers with strict media policies.
- **Batá Rhythm Visualizer:** Real-time ceremonial rhythm visualization with Web Audio API synthesis and AI-powered rhythm recommendations.
- **Ifá Wisdom Archive:** Searchable repository of past readings, insights, and sacred verses.
- **Personalized Diaspora Spiritual Practice Reminder:** Smart notification system with practice tracking and location-adapted reminders.

**System Design Choices:**
- **Frontend:** React with TypeScript, Radix UI, and Tailwind CSS. Previously, a Python Flask with Jinja2 templates and Alpine.js approach was adopted for a period.
- **Backend:** Node.js with Express for API endpoints, or Python Flask for certain modules and data processing.
- **Database:** PostgreSQL (with Drizzle ORM) for primary data storage, previously SQLite for Flask implementations.
- **Authentication:** Flask-Login for user authentication, password hashing with Werkzeug.
- **Deployment:** Trusted Web App (TWA) for Android, with Google Play Console integration workflow.
- **Performance Optimization:** Code splitting, image optimization (WebP/AVIF), audio compression, visibility-based animation optimization, and progressive asset loading.
- **Accessibility:** WCAG 2.2 AA compliance.

## External Dependencies

- **Databases:** PostgreSQL (primary), SQLite (for Flask modules).
- **ORMs:** Drizzle ORM.
- **APIs:** Google Play Developer API, Firebase Test Lab, AWS Device Farm, Google Translate TTS (fallback for pronunciation).
- **Libraries/Frameworks:**
    - Frontend: React 18.3.1, TypeScript 5.6.3, Radix UI, Tailwind CSS, Vite.
    - Backend: Express 4.21.2 (Node.js), Flask (Python).
    - Audio: Web Audio API, FFmpeg.
    - PDF Generation: ReportLab.
    - Scheduling: APScheduler.
    - Real-time Notifications: Pusher.
    - Deployment Utilities: Drizzle-kit, Flask-Migrate.
- **Hosting/Services:** Firebase Test Lab, AWS Device Farm, GitHub.
- **Content:** YouTube (for educational videos), Pixabay (for royalty-free audio).