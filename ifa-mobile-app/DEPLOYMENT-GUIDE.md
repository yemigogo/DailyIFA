# 📱 Complete React Native Deployment Guide

## Step 1: Setup Your Development Environment

### Install Expo CLI
```bash
npm install -g @expo/cli
npm install -g eas-cli
```

### Navigate to mobile app
```bash
cd ifa-mobile-app
npm install
```

## Step 2: Test Your App Locally

### Start development server
```bash
npx expo start
```

### Test on your phone
1. Install **Expo Go** app from Google Play Store
2. Scan the QR code displayed in your terminal
3. Test all screens and API connectivity

## Step 3: Configure for Production

### Update app.json with your details
```json
{
  "expo": {
    "name": "Ifá Daily Readings",
    "slug": "ifa-daily-app", 
    "android": {
      "package": "com.yourcompany.ifaapp",
      "versionCode": 1
    },
    "extra": {
      "apiUrl": "https://your-actual-replit-domain.replit.app"
    },
    "owner": "your-expo-username"
  }
}
```

### Create Expo account
1. Visit https://expo.dev
2. Create account
3. Run `npx expo login`

## Step 4: Setup EAS Build

### Initialize EAS
```bash
npx eas build:configure
```

This creates `eas.json` with build configurations.

## Step 5: Create App Icons & Assets

### Required assets for `/assets/` folder:
- `icon.png` - 1024x1024px app icon
- `adaptive-icon.png` - 1024x1024px Android adaptive icon
- `splash.png` - 1284x2778px splash screen

### Quick asset generation:
```bash
npx expo install expo-splash-screen
```

## Step 6: Build APK for Testing

### Build preview APK
```bash
npx eas build --platform android --profile preview
```

This creates an APK file you can install directly on Android devices.

## Step 7: Build AAB for Google Play

### Build production AAB
```bash
npx eas build --platform android --profile production
```

This creates the `.aab` file needed for Google Play Store.

## Step 8: Setup Google Play Console

### Create Google Play Console Account
1. Visit https://play.google.com/console
2. Pay $25 registration fee
3. Complete developer profile

### Create New App
1. Click "Create app"
2. Choose app name: "Ifá Daily Readings"
3. Select "App" as app type
4. Choose "Free" for pricing
5. Confirm declarations

## Step 9: Complete Store Listing

### App Information
- **App name**: Ifá Daily Readings
- **Short description**: Daily spiritual guidance through authentic Ifá wisdom
- **Full description**:
```
Discover daily spiritual guidance through the ancient wisdom of Ifá. This authentic app provides:

• Daily Odu readings with traditional patterns
• Bilingual content in English and Yoruba
• Historical timeline of Ifá tradition
• Problem-based spiritual guidance search
• Daily prayers and reflections

Connect with centuries-old wisdom while respecting cultural authenticity. Each reading includes traditional Odu patterns, sacred verses (Ese Ifa), and practical spiritual guidance for modern life.

Features:
- Authentic Yoruba terminology and pronunciation
- Traditional vertical Odu pattern displays
- Comprehensive prayer collection
- Educational content about Ifá tradition
- Clean, respectful interface design

Perfect for spiritual seekers, Yoruba culture enthusiasts, and anyone interested in traditional African wisdom traditions.
```

### Graphics & Screenshots
Create these in your mobile app:
- **App icon**: 512x512px PNG (high-res version)
- **Feature graphic**: 1024x500px showcasing app interface
- **Screenshots**: At least 2 screenshots showing main features

### Content Rating
1. Complete content rating questionnaire
2. Select appropriate age ratings
3. Usually rated "Everyone" for spiritual content

### Data Safety
Complete the Data Safety form:
- **Data collection**: None (if you don't collect personal data)
- **Data sharing**: None
- **Security practices**: Data is encrypted in transit

## Step 10: Upload Your AAB

### Release Management
1. Go to "Production" → "Releases"
2. Click "Create new release"
3. Upload the `.aab` file from EAS build
4. Add release notes:
```
Initial release of Ifá Daily Readings app.

Features:
- Daily spiritual readings with authentic Odu patterns
- Bilingual English/Yoruba content
- Traditional prayers and guidance
- Problem-based search functionality
- Educational content about Ifá tradition

This app provides respectful, authentic access to traditional Yoruba spiritual wisdom.
```

## Step 11: Complete Review & Publish

### Final Checklist
- [ ] All store listing information complete
- [ ] Screenshots uploaded
- [ ] Content rating complete
- [ ] Data safety form complete
- [ ] Privacy policy URL added (if collecting data)
- [ ] AAB file uploaded successfully
- [ ] App pricing set (Free)
- [ ] Countries/regions selected

### Submit for Review
1. Click "Send for review"
2. Review can take 1-7 days
3. Google will test your app automatically

## Step 12: Post-Launch Monitoring

### Monitor Your Release
1. Check Google Play Console for crash reports
2. Monitor user reviews and ratings
3. Update app based on feedback

### Future Updates
```bash
# Increment version in app.json
"version": "1.1.0",
"android": { "versionCode": 2 }

# Build new version
npx eas build --platform android --profile production

# Upload to Google Play Console
```

## 📋 Troubleshooting Common Issues

### Build Failures
- **Node version**: Ensure Node.js 18+
- **Dependencies**: Run `npm install` to update packages
- **Cache**: Clear with `npx expo start --clear`

### API Connection Issues
- **URL**: Verify your Replit app URL in `app.json`
- **CORS**: Check your Express backend allows mobile requests
- **Network**: Test API endpoints with Postman first

### Play Store Rejections
- **Content Policy**: Ensure app follows Google Play policies
- **Functionality**: App must work without crashes
- **Metadata**: Store listing must accurately describe app

### Common Fixes
```bash
# Clear Expo cache
npx expo start --clear

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for Expo updates
npx expo install --check
```

## 🎯 Success Metrics

### Your app is ready when:
- ✅ Builds successfully with EAS
- ✅ Runs on real Android devices via Expo Go
- ✅ All API endpoints connect properly
- ✅ All screens display correctly
- ✅ Navigation works smoothly
- ✅ No crashes during testing
- ✅ Store assets look professional
- ✅ Passes Google Play review

### Timeline Estimate
- **Setup & Testing**: 4-6 hours
- **Asset Creation**: 2-3 hours  
- **Store Listing**: 2-3 hours
- **Google Review**: 1-7 days
- **Total**: ~2 weeks from start to publish

---

**Your Ifá Daily Readings app is now ready for the Google Play Store!**