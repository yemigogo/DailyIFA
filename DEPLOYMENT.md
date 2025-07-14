# Deployment Guide - Ifá Daily Reading App

## 📋 Pre-Deployment Checklist

### ✅ Current Project Status
- [x] Complete 5-Orisha healing platform implemented
- [x] Mobile-first responsive design
- [x] Authentic spiritual content and artwork
- [x] Bilingual Yoruba-English support
- [x] Interactive 3D cosmic realms
- [x] Sacred frequency healing system
- [x] Database integration with PostgreSQL
- [x] Audio system with offline support

### 🔧 Environment Setup Required
- [ ] PostgreSQL database configured
- [ ] Environment variables set
- [ ] Audio files uploaded to static directory
- [ ] Python dependencies for image generation

## 🌐 Replit Deployment (Recommended)

Your app is already configured for Replit deployment:

1. **Click the Deploy button** in your Replit interface
2. **Configure environment variables**:
   - `DATABASE_URL` (automatically provided)
   - Any additional secrets for extended features

3. **Automatic deployment includes**:
   - Express.js backend on port 5000
   - React frontend served by Vite
   - PostgreSQL database
   - Static file serving for audio/images

## 🚀 Manual Deployment Options

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify Deployment
```bash
# Build the project
npm run build

# Deploy to Netlify (drag dist folder or use CLI)
netlify deploy --prod --dir=dist
```

### Docker Deployment
```bash
# Build Docker image
docker build -t ifa-daily-reading .

# Run container
docker run -p 5000:5000 ifa-daily-reading
```

## 🗄️ Database Setup

### PostgreSQL Configuration
```sql
-- Database will be auto-created by Drizzle
-- Tables include:
-- - users (authentication)
-- - sessions (session storage)
-- - odus (spiritual readings)
-- - readings (daily readings)
-- - user_profiles (enhanced profiles)
-- - spiritual_practices (practice tracking)
```

### Environment Variables
```env
DATABASE_URL=postgresql://username:password@host:port/database
SESSION_SECRET=your-session-secret
PGDATABASE=ifa_daily_reading
PGHOST=localhost
PGPASSWORD=your-password
PGPORT=5432
PGUSER=your-username
```

## 📁 Static Assets

### Required Directories
```
static/
├── audio/
│   ├── yemoja_432hz.mp3
│   ├── obatala_963hz.mp3
│   ├── sango_528hz.mp3
│   ├── esu_transformation.mp3
│   └── orunmila_ambience.mp3
├── images/
│   ├── yemoja_water_card.png
│   ├── obatala_divine_card.png
│   ├── sango_thunder_card.png
│   ├── esu_transformation_card.png
│   ├── orunmila_wisdom_card.png
│   └── orunmila_banner.jpg
└── odu-cards/
    └── [256 Odu card images]
```

## 🔊 Audio System Setup

### Royalty-Free Audio Sources
- Pixabay (CC0 License)
- Freesound (CC Attribution)
- User-uploaded authentic recordings

### Audio Format Support
- MP3 (primary)
- WAV (high quality)
- OGG (web optimized)
- M4A (Apple devices)

## 📱 Mobile Optimization

### Performance Features
- Service Worker for offline functionality
- Lazy loading for images and components
- Compressed audio files
- Responsive image serving

### PWA Configuration
```json
{
  "name": "Ifá Daily Reading",
  "short_name": "Ifá Daily",
  "description": "Yoruba Spiritual Guidance",
  "theme_color": "#0a0a0a",
  "background_color": "#161616",
  "display": "standalone",
  "orientation": "portrait"
}
```

## 🔐 Security Considerations

### Authentication
- Session-based authentication
- Secure password hashing
- CSRF protection
- Rate limiting

### Data Protection
- Environment variable encryption
- Database connection security
- HTTPS enforcement
- Secure headers

## 📊 Analytics & Monitoring

### Recommended Tools
- Vercel Analytics
- Google Analytics 4
- Sentry for error tracking
- Uptime monitoring

## 🎯 Performance Optimization

### Frontend
- Code splitting by route
- Image optimization
- CSS optimization
- Bundle size monitoring

### Backend
- Database query optimization
- Connection pooling
- Caching strategies
- CDN for static assets

## 🌍 Multi-Region Deployment

### Global CDN Setup
- Static assets distributed globally
- Regional database replicas
- Edge computing for API responses

## 🔄 Continuous Deployment

### GitHub Actions Workflow
```yaml
name: Deploy Ifá Daily Reading
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

## 🐛 Troubleshooting

### Common Issues
1. **Audio not playing**: Check file paths and CORS headers
2. **Database connection**: Verify environment variables
3. **Mobile layout**: Test responsive breakpoints
4. **3D visualization**: Ensure Canvas API support

### Debug Mode
```bash
NODE_ENV=development npm run dev
```

## 📞 Support

For deployment issues:
1. Check console logs
2. Verify environment variables
3. Test database connectivity
4. Confirm static file serving

---

*Ready for spiritual guidance to reach users worldwide* 🌍