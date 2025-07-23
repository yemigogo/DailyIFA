# Google Play Porting Checklist - Ifá Daily Reading App
*Complete Pre-Publication Requirements - July 22, 2025*

## 📋 Pre-Publication Status Overview

**Overall Readiness: 🟡 PREPARATION REQUIRED**
- Web app foundation: ✅ Complete
- Android optimization: ⚠️ In Progress  
- Play Store requirements: 🔴 Missing
- Publishing assets: 🔴 Missing

---

## 🏗️ Android Application Setup

### **1. AndroidManifest.xml Configuration**

#### **Required Manifest Structure**
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.ifadaily.yorubawisdom">

    <!-- Required Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" 
        android:maxSdkVersion="28" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" 
        android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.VIBRATE" />
    
    <!-- TWA Specific Permissions -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    
    <!-- Hardware Features -->
    <uses-feature android:name="android.hardware.microphone" android:required="false" />
    <uses-feature android:name="android.hardware.audio.output" android:required="true" />

    <application
        android:name=".IfaDailyApplication"
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:hardwareAccelerated="true"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:label="@string/app_name"
        android:theme="@style/Theme.IfaDaily"
        android:requestLegacyExternalStorage="false"
        android:usesCleartextTraffic="false"
        tools:targetApi="31">

        <!-- TWA Activity -->
        <activity
            android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
            android:exported="true"
            android:theme="@style/Theme.IfaDaily.NoActionBar">
            
            <meta-data android:name="android.support.customtabs.trusted.DEFAULT_URL"
                android:value="https://your-domain.replit.app" />
            
            <meta-data android:name="android.support.customtabs.trusted.STATUS_BAR_COLOR"
                android:resource="@color/spiritual_primary" />
            
            <meta-data android:name="android.support.customtabs.trusted.NAVIGATION_BAR_COLOR"
                android:resource="@color/spiritual_primary" />
            
            <meta-data android:name="android.support.customtabs.trusted.SPLASH_IMAGE_DRAWABLE"
                android:resource="@drawable/splash_screen" />
            
            <meta-data android:name="android.support.customtabs.trusted.SPLASH_SCREEN_BACKGROUND_COLOR"
                android:resource="@color/spiritual_background" />
            
            <meta-data android:name="android.support.customtabs.trusted.SPLASH_SCREEN_FADE_OUT_DURATION"
                android:value="300" />
            
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https"
                    android:host="your-domain.replit.app" />
            </intent-filter>
        </activity>

        <!-- Digital Asset Links Service -->
        <service android:name="com.google.androidbrowserhelper.trusted.DelegationService"
            android:exported="true">
            <intent-filter>
                <action android:name="android.support.customtabs.trusted.TRUSTED_WEB_ACTIVITY_SERVICE" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </service>

    </application>
</manifest>
```

#### **Status: 🔴 MISSING - Create AndroidManifest.xml**

---

### **2. Versioning & SDK Configuration**

#### **build.gradle (Module: app) Requirements**
```gradle
android {
    namespace 'com.ifadaily.yorubawisdom'
    compileSdk 34
    
    defaultConfig {
        applicationId "com.ifadaily.yorubawisdom"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
        
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
    implementation 'androidx.browser:browser:1.6.0'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.9.0'
}
```

#### **Version Strategy**
```
Initial Release: 1.0.0 (versionCode: 1)
Semantic Versioning: MAJOR.MINOR.PATCH
- MAJOR: Breaking changes to spiritual content structure
- MINOR: New Orisha features, educational content
- PATCH: Bug fixes, performance improvements

Update Frequency: Monthly spiritual content updates
```

#### **Status: 🔴 MISSING - Configure build.gradle**

---

### **3. App Icons & Visual Assets**

#### **Required Icon Sizes (All PNG Format)**
```
Launcher Icons:
- mdpi: 48x48px (res/mipmap-mdpi/)
- hdpi: 72x72px (res/mipmap-hdpi/)
- xhdpi: 96x96px (res/mipmap-xhdpi/)
- xxhdpi: 144x144px (res/mipmap-xxhdpi/)
- xxxhdpi: 192x192px (res/mipmap-xxxhdpi/)

Adaptive Icons (Android 8.0+):
- ic_launcher_foreground.xml (108x108dp safe area)
- ic_launcher_background.xml (108x108dp background)

Notification Icons:
- White silhouette versions for status bar
- 24x24dp base size with density variants

Legacy Icons:
- ic_launcher_round.png (for older Android versions)
```

#### **Spiritual Branding Guidelines**
```
Primary Colors:
- Spiritual Gold: #DAA520 (primary brand)
- Sacred Blue: #1E3A8A (wisdom, knowledge)
- Earth Brown: #8B4513 (grounding, tradition)
- Pure White: #FFFFFF (Obatala, purity)

Icon Design Requirements:
- Incorporates traditional Ifa divination symbols
- Bilingual text support (English/Yoruba)
- Cultural authenticity in visual elements
- Accessible contrast ratios (4.5:1 minimum)
```

#### **Status: 🔴 MISSING - Design and implement app icons**

---

### **4. Splash Screen Implementation**

#### **splash_screen.xml Resource**
```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    
    <!-- Background Color -->
    <item android:drawable="@color/spiritual_background" />
    
    <!-- Centered Logo -->
    <item android:gravity="center">
        <bitmap
            android:src="@drawable/ifa_logo_splash"
            android:gravity="center" />
    </item>
    
    <!-- Bottom Text -->
    <item android:gravity="center_horizontal|bottom">
        <inset android:insetBottom="100dp">
            <bitmap
                android:src="@drawable/spiritual_wisdom_text"
                android:gravity="center" />
        </inset>
    </item>
    
</layer-list>
```

#### **Splash Screen Configuration**
```xml
<!-- themes.xml -->
<style name="Theme.IfaDaily.Splash" parent="Theme.SplashScreen">
    <item name="windowSplashScreenBackground">@color/spiritual_background</item>
    <item name="windowSplashScreenAnimatedIcon">@drawable/ifa_animated_logo</item>
    <item name="windowSplashScreenAnimationDuration">1000</item>
    <item name="postSplashScreenTheme">@style/Theme.IfaDaily</item>
</style>
```

#### **Status: 🔴 MISSING - Create splash screen assets and configuration**

---

## 🔐 Security & Signing

### **5. Keystore Setup**

#### **Release Keystore Generation**
```bash
# Generate release keystore (ONE TIME ONLY)
keytool -genkey -v -keystore ifa-daily-release.keystore \
    -alias ifa-daily-key \
    -keyalg RSA \
    -keysize 2048 \
    -validity 25000 \
    -storepass [SECURE_PASSWORD] \
    -keypass [SECURE_KEY_PASSWORD]

# Keystore Details to Configure:
CN=Ifa Daily Reading
OU=Spiritual Technology
O=Your Organization Name
L=Your City
ST=Your State
C=Your Country Code
```

#### **Signing Configuration (gradle.properties)**
```properties
# Release signing configuration
RELEASE_STORE_FILE=../keystores/ifa-daily-release.keystore
RELEASE_STORE_PASSWORD=[SECURE_PASSWORD]
RELEASE_KEY_ALIAS=ifa-daily-key
RELEASE_KEY_PASSWORD=[SECURE_KEY_PASSWORD]
```

#### **build.gradle Signing Configuration**
```gradle
android {
    signingConfigs {
        release {
            storeFile file(RELEASE_STORE_FILE)
            storePassword RELEASE_STORE_PASSWORD
            keyAlias RELEASE_KEY_ALIAS
            keyPassword RELEASE_KEY_PASSWORD
        }
    }
}
```

#### **Security Requirements**
```
✅ SHA-256 fingerprint for Digital Asset Links
✅ ProGuard/R8 code obfuscation enabled
✅ Secure keystore storage (not in version control)
✅ Strong passwords (16+ characters, mixed case, symbols)
✅ Backup keystore storage in secure location
```

#### **Status: 🔴 MISSING - Generate and configure release keystore**

---

## 🏪 Google Play Store Assets

### **6. Store Listing Requirements**

#### **App Title & Description**
```
App Title: "Ifá Daily Reading - Yoruba Spiritual Wisdom"
Short Description: "Authentic daily Ifá readings with 256 Odu system, Orisha healing frequencies, and bilingual Yoruba-English spiritual guidance."

Full Description:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌟 AUTHENTIC YORUBA SPIRITUAL WISDOM 🌟

Discover the ancient wisdom of Ifá divination with our comprehensive spiritual platform featuring authentic Yoruba traditions, daily readings, and transformative healing practices.

✨ CORE FEATURES:
• Complete 256 Odu Ifá system with traditional interpretations
• Daily spiritual readings with personalized guidance
• 8 Orisha healing frequencies (528Hz, 432Hz, 963Hz)
• Interactive 3D Yorùbá Cosmic Realms visualization
• Authentic Oriki praise chants in traditional Yoruba
• Bilingual support (English/Yoruba) throughout

🎵 SPIRITUAL AUDIO EXPERIENCE:
• Sacred frequency healing with orchestral compositions
• Traditional Oriki chants for 9 core Orisha
• Meditation timers with authentic spiritual guidance
• Background audio for extended spiritual practice

📚 EDUCATIONAL PLATFORM:
• Progressive multimedia learning series
• Advanced Orisha personality assessment
• Traditional Yoruba calendar integration
• Cultural heritage documentation and preservation

🔮 DIVINATION & GUIDANCE:
• Daily Ifá readings with 256 authentic Odu
• Problem-focused spiritual guidance search
• Personal divination log with reflection tracking
• Traditional Ẹbọ (ritual) recommendations

This app preserves authentic Yoruba spiritual traditions while making ancient wisdom accessible to modern practitioners worldwide.

Perfect for: Spiritual seekers, Yoruba culture enthusiasts, divination practitioners, meditation practitioners, and anyone interested in African traditional wisdom.

No ads. Cultural authenticity guaranteed. Continuous updates with traditional content.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### **Keywords & Categories**
```
Primary Category: Lifestyle
Secondary Category: Education

Keywords:
Ifa, Ifá, Yoruba, Orisha, Divination, African Spirituality, Traditional Wisdom, 
Spiritual Guidance, Meditation, Healing Frequencies, Cultural Heritage, 
Orunmila, Obatala, Yemoja, Sango, Sacred Geometry, Ancient Wisdom

Target Audience:
- Adults 18+ interested in spirituality
- Yoruba diaspora communities
- Practitioners of African traditional religions
- Cultural education enthusiasts
- Meditation and healing practitioners
```

#### **Status: 🔴 MISSING - Create store listing content**

---

### **7. Visual Assets for Play Store**

#### **Required Screenshots (All PNG format)**
```
Phone Screenshots (2-8 required):
- Size: 1080x1920px or 1440x2560px
- Show: Home screen with daily reading
- Show: 3D Cosmic Realms visualization
- Show: Orisha healing frequency interface
- Show: Audio player with authentic Oriki
- Show: 256 Odu visualization grid
- Show: Learning center with educational content
- Show: Profile page with spiritual assessment

Tablet Screenshots (1-8 optional):
- Size: 1200x1920px or 1600x2560px
- Landscape orientation variants
- Showcase tablet-optimized layouts

7-inch Tablet Screenshots:
- Size: 1024x1600px
- Show responsive design adaptations

10-inch Tablet Screenshots:
- Size: 1280x1920px
- Demonstrate full-screen spiritual experiences
```

#### **Feature Graphic**
```
Size: 1024x500px (PNG or JPEG)
Content Requirements:
- App name "Ifá Daily Reading"
- Key visual elements: Odu patterns, Orisha symbols
- Spiritual color scheme (gold, blue, brown)
- No screenshots or UI elements
- Readable at thumbnail size
- Bilingual text appeal (English/Yoruba)
```

#### **App Icon (High Resolution)**
```
Size: 512x512px (PNG, 32-bit)
Design Requirements:
- Matches adaptive icon design
- Clear at all sizes (16px to 512px)
- Traditional Ifá divination symbols
- Cultural authenticity in colors and symbols
- Accessible contrast ratios
```

#### **Status: 🔴 MISSING - Create all visual assets**

---

### **8. Promotional Video (Optional but Recommended)**

#### **Video Requirements**
```
Duration: 30-120 seconds
Format: MP4, MOV, or AVI
Resolution: 1080p minimum (1920x1080)
Aspect Ratio: 16:9
File Size: Max 100MB

Content Structure:
0-5s: App logo with spiritual music
5-15s: Daily Ifá reading demonstration
15-25s: 3D Cosmic Realms interaction
25-35s: Orisha healing frequencies
35-45s: Authentic audio Oriki playback
45-55s: Educational content showcase
55-60s: App name and "Download Now"

Audio Requirements:
- Traditional Yoruba spiritual music
- Professional voice-over (bilingual)
- Authentic spiritual atmosphere
- No copyrighted content
```

#### **Status: 🟡 OPTIONAL - Create promotional video**

---

## 📄 Legal & Compliance

### **9. Privacy Policy**

#### **Required Privacy Policy Sections**
```
Privacy Policy for Ifá Daily Reading App

Last Updated: [Date]

1. INFORMATION WE COLLECT
   • Personal spiritual preferences and assessment results
   • Divination log entries and reflection notes
   • Audio usage patterns and frequency preferences
   • App usage analytics and performance data
   • Device information for optimization

2. HOW WE USE INFORMATION
   • Provide personalized spiritual guidance
   • Improve educational content recommendations
   • Enhance audio and visual experience
   • Maintain cultural authenticity in content
   • Technical support and app improvements

3. INFORMATION SHARING
   • We do not sell personal spiritual data
   • Anonymous usage statistics for app improvement
   • No sharing with third parties without consent
   • Cultural content sourced from authentic traditions

4. DATA SECURITY
   • Encryption of personal spiritual data
   • Secure storage of divination logs
   • Regular security audits and updates
   • User control over data deletion

5. CULTURAL RESPECT
   • Authentic representation of Yoruba traditions
   • Respectful handling of spiritual content
   • Community feedback integration
   • Cultural consultant review process

6. USER RIGHTS
   • Access to personal data
   • Data correction and deletion
   • Opt-out of analytics
   • Cultural content feedback

7. CONTACT INFORMATION
   Email: privacy@ifadaily.app
   Address: [Your Business Address]

This policy respects both digital privacy and traditional spiritual values.
```

#### **Status: 🔴 MISSING - Create comprehensive privacy policy**

---

### **10. Content Rating**

#### **Google Play Content Rating Questionnaire**
```
App Category: Lifestyle/Religion & Spirituality

Content Elements:
✅ Religion/Spirituality: YES
   - Traditional African spiritual practices
   - Divination and spiritual guidance
   - Religious symbols and terminology
   - Meditation and healing practices

✅ Educational Content: YES
   - Cultural heritage preservation
   - Historical spiritual traditions
   - Language learning (Yoruba)
   - Traditional knowledge systems

❌ Violence: NO
❌ Sexual Content: NO
❌ Profanity: NO
❌ Drugs/Alcohol: NO
❌ Gambling: NO
❌ Horror/Fear: NO

Target Rating: Everyone (PEGI 3, ESRB E)
Reason: Educational spiritual content suitable for all ages
```

#### **Status: 🔴 MISSING - Complete content rating questionnaire**

---

## 🔗 Digital Asset Links Setup

### **11. Domain Verification**

#### **Digital Asset Links JSON**
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.ifadaily.yorubawisdom",
    "sha256_cert_fingerprints":
    ["[SHA256_FINGERPRINT_FROM_RELEASE_KEYSTORE]"]
  }
}]
```

#### **Deployment Requirements**
```
1. Upload digital-asset-links.json to:
   https://your-domain.replit.app/.well-known/assetlinks.json

2. Verify HTTPS access and correct JSON format

3. Ensure SHA256 fingerprint matches release keystore:
   keytool -list -v -keystore ifa-daily-release.keystore

4. Test verification:
   https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://your-domain.replit.app

5. Update AndroidManifest.xml with correct domain
```

#### **Status: 🔴 MISSING - Configure Digital Asset Links**

---

## 🔧 Google Play Console Setup

### **12. Developer Account Configuration**

#### **Required Account Information**
```
Developer Account Type: Individual or Organization
Business Details:
- Developer name: [Your Name/Organization]
- Contact email: [Professional Email]
- Website: https://your-domain.replit.app
- Phone number: [Verified Phone]

Payment Information:
- Google Payments merchant account
- Tax information (required for sales)
- Banking details for revenue

Identity Verification:
- Government-issued ID
- Address verification
- Phone number verification
```

#### **App Release Configuration**
```
Release Track Options:
1. Internal Testing (up to 100 testers)
2. Closed Testing (up to 20,000 testers)
3. Open Testing (unlimited, public opt-in)
4. Production (public release)

Recommended Path:
Week 1-2: Internal Testing with spiritual community
Week 3-4: Closed Testing with Yoruba cultural groups  
Week 5-6: Open Testing for broader feedback
Week 7+: Production release
```

#### **Status: 🔴 MISSING - Set up Google Play Console account and app**

---

## ✅ Pre-Launch Testing Checklist

### **13. Quality Assurance Requirements**

#### **Device Testing Matrix**
```
Minimum Requirements:
✅ Android 7.0+ (API 24+) on low-end device
✅ Android 10+ on mid-range device
✅ Android 13+ on high-end device
✅ Various screen sizes (4", 5.5", 6.5", 10" tablet)
✅ Different RAM configurations (2GB, 4GB, 8GB+)

Functional Testing:
✅ Audio playback across all Orisha frequencies
✅ 3D Cosmic Realms performance on various GPUs
✅ Offline functionality for spiritual content
✅ Bilingual text rendering (English/Yoruba)
✅ Touch interactions and gesture recognition
✅ App lifecycle management (pause/resume)
✅ Network connectivity changes
✅ Storage permissions and file access
```

#### **Performance Benchmarks**
```
Required Metrics:
✅ App startup time: < 3 seconds
✅ Audio loading time: < 2 seconds
✅ 3D animation frame rate: 30+ FPS
✅ Memory usage: < 200MB peak
✅ Battery drain: < 5% per hour of usage
✅ Network data usage: Optimized for cellular

Cultural Accuracy Testing:
✅ Yoruba text pronunciation accuracy
✅ Traditional spiritual content authenticity
✅ Cultural consultant review and approval
✅ Community feedback integration
```

#### **Status: 🟡 PARTIAL - Ongoing testing and optimization**

---

## 📊 Launch Readiness Score

### **Current Status Breakdown**

| Component | Status | Priority | Estimated Time |
|-----------|--------|----------|----------------|
| AndroidManifest.xml | 🔴 Missing | High | 2-3 days |
| Build Configuration | 🔴 Missing | High | 1-2 days |
| App Icons & Assets | 🔴 Missing | High | 3-5 days |
| Keystore & Signing | 🔴 Missing | Critical | 1 day |
| Store Listing | 🔴 Missing | High | 2-3 days |
| Screenshots | 🔴 Missing | High | 2-3 days |
| Privacy Policy | 🔴 Missing | Critical | 1-2 days |
| Content Rating | 🔴 Missing | Medium | 1 day |
| Digital Asset Links | 🔴 Missing | High | 1-2 days |
| Play Console Setup | 🔴 Missing | Critical | 1-2 days |
| Quality Testing | 🟡 Partial | High | 1-2 weeks |

### **Total Estimated Timeline: 3-4 weeks**

---

## 🚀 Recommended Implementation Order

### **Week 1: Foundation**
1. Set up Google Play Console developer account
2. Generate and secure release keystore
3. Create AndroidManifest.xml and build configuration
4. Design and implement app icons and splash screen

### **Week 2: Assets & Content**
1. Create all required store screenshots
2. Write comprehensive privacy policy
3. Complete content rating questionnaire
4. Set up Digital Asset Links verification

### **Week 3: Store Preparation**
1. Write store listing description and metadata
2. Create feature graphic and promotional materials
3. Upload all assets to Google Play Console
4. Configure release tracks and testing groups

### **Week 4: Testing & Launch**
1. Conduct comprehensive device testing
2. Internal testing with spiritual community
3. Address feedback and performance issues
4. Submit for production release review

**This checklist ensures complete compliance with Google Play requirements while maintaining the cultural authenticity and spiritual integrity of the Ifá Daily Reading app.**