# Ifá Daily Readings - React Native Mobile App

A React Native mobile application built with Expo for daily Ifá spiritual readings and guidance.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed globally: `npm install -g @expo/cli` 
- Expo Go app on your mobile device (for testing)

### Installation & Setup

1. **Navigate to mobile app directory:**
   ```bash
   cd ifa-mobile-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoint:**
   Edit `app.json` and update the `extra.apiUrl` to point to your Replit backend:
   ```json
   {
     "expo": {
       "extra": {
         "apiUrl": "https://your-replit-domain.replit.app"
       }
     }
   }
   ```

4. **Start development server:**
   ```bash
   npx expo start
   ```

5. **Test on device:**
   - Scan QR code with Expo Go app (Android) or Camera app (iOS)
   - Or press `a` to run on Android emulator
   - Or press `i` to run on iOS simulator

## 📱 Building for Production

### Create Expo Account & Project
```bash
# Login to Expo
npx expo login

# Initialize EAS (Expo Application Services)
npx eas build:configure
```

### Build APK (for testing)
```bash
npx eas build --platform android --profile preview
```

### Build AAB (for Google Play Store)
```bash
npx eas build --platform android --profile production
```

### Submit to Google Play
```bash
npx eas submit --platform android
```

## 🔧 Configuration Files

### app.json
Main Expo configuration - update:
- `expo.name`: App display name
- `expo.android.package`: Unique package ID (com.yourcompany.ifaapp)
- `expo.extra.apiUrl`: Your backend API URL
- `expo.owner`: Your Expo username

### eas.json
Build configuration for different environments:
- `development`: For testing with Expo Dev Client
- `preview`: Creates APK for distribution testing
- `production`: Creates AAB for Play Store submission

## 📁 Project Structure

```
ifa-mobile-app/
├── src/
│   ├── constants/
│   │   └── Config.ts          # App configuration & API endpoints
│   ├── services/
│   │   └── ApiService.ts      # API integration with your Express backend
│   ├── navigation/
│   │   └── AppNavigator.tsx   # React Navigation setup
│   └── screens/
│       ├── HomeScreen.tsx     # Daily reading display
│       ├── HistoryScreen.tsx  # Reading history
│       ├── LearnScreen.tsx    # Educational content
│       ├── PrayersScreen.tsx  # Daily prayers
│       └── SearchScreen.tsx   # Problem-based Odu search
├── app.json                   # Expo configuration
├── eas.json                   # Build configuration
└── App.tsx                    # Root component
```

## 🔗 API Integration

The app connects to your existing Express.js backend via the `ApiService` class. Key endpoints:

- `GET /api/readings/{date}` - Daily reading
- `GET /api/readings?limit=20` - Reading history  
- `GET /api/odu` - All Odu
- `GET /api/search?problem={query}` - Problem-based search

## 🎨 Theming

Colors and styling are centralized in `src/constants/Config.ts`:
- Primary: `#f59e0b` (Amber)
- Secondary: `#d97706` (Dark Amber)
- Background: `#fef3c7` (Light Amber)

## 📋 Migration Guide

### From Web Components to React Native

1. **Replace HTML elements:**
   - `<div>` → `<View>`
   - `<span>, <p>` → `<Text>`
   - `<button>` → `<TouchableOpacity>`
   - `<input>` → `<TextInput>`

2. **Replace CSS with StyleSheet:**
   ```typescript
   // Web
   className="bg-white p-4 rounded-lg"
   
   // React Native
   style={styles.container}
   
   const styles = StyleSheet.create({
     container: {
       backgroundColor: '#ffffff',
       padding: 16,
       borderRadius: 8,
     }
   });
   ```

3. **Replace Radix UI components:**
   - Use React Native built-in components
   - Or libraries like `react-native-elements`
   - Navigation: Use `@react-navigation/native`

4. **Update API calls:**
   - Use `fetch()` or libraries like `axios`
   - The existing `@tanstack/react-query` works with React Native

## 🚀 Deployment to Google Play Store

### 1. Prepare Store Assets
Create these assets in your project:
- App icon: 512x512px PNG
- Feature graphic: 1024x500px  
- Screenshots: Various device sizes
- Privacy Policy URL

### 2. Update app.json
```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.ifaapp",
      "versionCode": 1,
      "targetSdkVersion": 34
    }
  }
}
```

### 3. Build & Submit
```bash
# Build production AAB
npx eas build --platform android --profile production

# Submit to Play Store
npx eas submit --platform android
```

### 4. Play Console Setup
1. Create Google Play Console account
2. Create new app listing
3. Upload AAB file
4. Fill out store listing details
5. Complete Data Safety form
6. Set up pricing & distribution
7. Submit for review

## 🔒 Environment Variables

For production, set these in Expo:
```bash
npx eas secret:create --name API_URL --value https://your-production-api.com
```

Then reference in `app.json`:
```json
{
  "expo": {
    "extra": {
      "apiUrl": "$API_URL"
    }
  }
}
```

## 📚 Next Steps

1. **Test thoroughly** on real devices
2. **Add error tracking** (Sentry, Bugsnag)
3. **Implement analytics** (Expo Analytics, Firebase)
4. **Add push notifications** (Expo Notifications)
5. **Consider offline functionality** (AsyncStorage, SQLite)
6. **Add automated testing** (Jest, Detox)

## 🆘 Troubleshooting

### Build Failures
- Check `app.json` syntax
- Ensure all dependencies are compatible with Expo
- Clear Expo cache: `npx expo start --clear`

### API Connection Issues
- Verify `apiUrl` in `app.json`
- Check CORS settings on your Express backend
- Test API endpoints with Postman/curl

### Play Store Rejection
- Ensure target SDK 34+
- Complete Data Safety form
- Add privacy policy URL
- Follow Play Store policies

---

**Built with ❤️ for authentic Ifá spiritual guidance**