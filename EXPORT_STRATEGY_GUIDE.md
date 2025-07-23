# Export Strategy Guide - Ifá Daily Reading App
*Complete APK/AAB Generation & Publishing Workflow - July 22, 2025*

## 🏗️ Build System Setup

### **1. Trusted Web App (TWA) Project Structure**

#### **Required Project Structure**
```
ifa-daily-android/
├── android/
│   ├── app/
│   │   ├── build.gradle
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── AndroidManifest.xml
│   │   │       ├── java/com/ifadaily/yorubawisdom/
│   │   │       │   └── MainActivity.java
│   │   │       └── res/
│   │   │           ├── mipmap-*/ic_launcher*.png
│   │   │           ├── drawable/splash_screen.xml
│   │   │           └── values/
│   │   │               ├── strings.xml
│   │   │               ├── colors.xml
│   │   │               └── themes.xml
│   │   └── release/
│   │       └── output-metadata.json
│   ├── gradle/
│   │   └── wrapper/
│   │       ├── gradle-wrapper.jar
│   │       └── gradle-wrapper.properties
│   ├── build.gradle
│   ├── gradle.properties
│   ├── settings.gradle
│   └── local.properties
├── keystores/
│   └── ifa-daily-release.keystore
└── scripts/
    ├── build-debug.sh
    ├── build-release.sh
    └── deploy-play-store.sh
```

#### **Initial TWA Setup Commands**
```bash
# Create new TWA project
npx @bubblewrap/cli init --manifest https://your-domain.replit.app/manifest.json

# Customize for Ifá Daily Reading app
cd ifa-daily-android

# Update package name
sed -i 's/com.example.twa/com.ifadaily.yorubawisdom/g' android/app/build.gradle
sed -i 's/com.example.twa/com.ifadaily.yorubawisdom/g' android/app/src/main/AndroidManifest.xml

# Set proper app name
sed -i 's/TWA/Ifá Daily Reading/g' android/app/src/main/res/values/strings.xml
```

---

## 🔨 Build Scripts & Automation

### **2. Debug Build Script**

#### **scripts/build-debug.sh**
```bash
#!/bin/bash

# Ifá Daily Reading - Debug Build Script
# Usage: ./scripts/build-debug.sh

set -e

echo "🔮 Building Ifá Daily Reading Debug APK..."

# Set environment variables
export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
cd android
./gradlew clean

# Verify web app is accessible
echo "🌐 Verifying web app accessibility..."
curl -f https://your-domain.replit.app/manifest.json || {
    echo "❌ Error: Web app manifest not accessible"
    exit 1
}

# Build debug APK
echo "🔧 Building debug APK..."
./gradlew assembleDebug

# Verify APK was created
DEBUG_APK="app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$DEBUG_APK" ]; then
    echo "✅ Debug APK created successfully: $DEBUG_APK"
    
    # Get APK info
    APK_SIZE=$(du -h "$DEBUG_APK" | cut -f1)
    echo "📦 APK Size: $APK_SIZE"
    
    # Verify APK signature
    $ANDROID_HOME/build-tools/34.0.0/aapt dump badging "$DEBUG_APK" | grep "package:"
    
    echo "🚀 Debug build complete! Install with:"
    echo "   adb install -r $DEBUG_APK"
else
    echo "❌ Error: Debug APK not found"
    exit 1
fi
```

### **3. Release Build Script**

#### **scripts/build-release.sh**
```bash
#!/bin/bash

# Ifá Daily Reading - Release Build Script
# Usage: ./scripts/build-release.sh

set -e

echo "🔮 Building Ifá Daily Reading Release AAB/APK..."

# Check required environment variables
if [ -z "$RELEASE_STORE_PASSWORD" ] || [ -z "$RELEASE_KEY_PASSWORD" ]; then
    echo "❌ Error: Release keystore passwords not set"
    echo "   Set RELEASE_STORE_PASSWORD and RELEASE_KEY_PASSWORD environment variables"
    exit 1
fi

# Set build environment
export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools"

# Pre-build checks
echo "🔍 Running pre-build checks..."

# Verify keystore exists
KEYSTORE_PATH="../keystores/ifa-daily-release.keystore"
if [ ! -f "$KEYSTORE_PATH" ]; then
    echo "❌ Error: Release keystore not found at $KEYSTORE_PATH"
    exit 1
fi

# Verify web app accessibility and performance
echo "🌐 Verifying web app performance..."
MANIFEST_URL="https://your-domain.replit.app/manifest.json"
curl -f "$MANIFEST_URL" || {
    echo "❌ Error: Web app manifest not accessible"
    exit 1
}

# Check web app load time
LOAD_TIME=$(curl -w "@curl-format.txt" -o /dev/null -s "$MANIFEST_URL" | grep time_total)
echo "⏱️  Web app load time: $LOAD_TIME seconds"

# Verify Digital Asset Links
echo "🔗 Verifying Digital Asset Links..."
curl -f https://your-domain.replit.app/.well-known/assetlinks.json || {
    echo "❌ Error: Digital Asset Links not configured"
    exit 1
}

# Clean and prepare
echo "🧹 Cleaning previous builds..."
cd android
./gradlew clean

# Generate release builds
echo "🔧 Building release AAB (recommended for Play Store)..."
./gradlew bundleRelease

echo "🔧 Building release APK (for testing)..."
./gradlew assembleRelease

# Verify builds
RELEASE_AAB="app/build/outputs/bundle/release/app-release.aab"
RELEASE_APK="app/build/outputs/apk/release/app-release.apk"

if [ -f "$RELEASE_AAB" ] && [ -f "$RELEASE_APK" ]; then
    echo "✅ Release builds created successfully!"
    
    # Get build info
    AAB_SIZE=$(du -h "$RELEASE_AAB" | cut -f1)
    APK_SIZE=$(du -h "$RELEASE_APK" | cut -f1)
    
    echo "📦 AAB Size: $AAB_SIZE (for Play Store)"
    echo "📦 APK Size: $APK_SIZE (for testing)"
    
    # Verify signatures
    echo "🔐 Verifying signatures..."
    jarsigner -verify -verbose -certs "$RELEASE_AAB"
    jarsigner -verify -verbose -certs "$RELEASE_APK"
    
    # Create release directory with timestamp
    RELEASE_DIR="../releases/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$RELEASE_DIR"
    
    # Copy builds to release directory
    cp "$RELEASE_AAB" "$RELEASE_DIR/"
    cp "$RELEASE_APK" "$RELEASE_DIR/"
    
    # Generate checksums
    cd "$RELEASE_DIR"
    sha256sum *.aab *.apk > checksums.txt
    
    echo "✅ Release builds available in: $RELEASE_DIR"
    echo "🚀 Ready for Google Play Console upload!"
    
else
    echo "❌ Error: Release builds failed"
    exit 1
fi
```

### **4. Automated Testing Script**

#### **scripts/test-release.sh**
```bash
#!/bin/bash

# Ifá Daily Reading - Automated Testing Script
# Usage: ./scripts/test-release.sh

set -e

echo "🧪 Testing Ifá Daily Reading Release Build..."

# Check if emulator is running
if ! adb devices | grep -q "emulator"; then
    echo "❌ Error: No Android emulator detected"
    echo "   Start an emulator first: $ANDROID_HOME/emulator/emulator -avd Pixel_6_API_34"
    exit 1
fi

# Install release APK on emulator
RELEASE_APK="android/app/build/outputs/apk/release/app-release.apk"
if [ ! -f "$RELEASE_APK" ]; then
    echo "❌ Error: Release APK not found. Run build-release.sh first"
    exit 1
fi

echo "📱 Installing release APK on emulator..."
adb install -r "$RELEASE_APK"

# Launch app and run basic tests
echo "🚀 Launching Ifá Daily Reading app..."
adb shell am start -n com.ifadaily.yorubawisdom/.LauncherActivity

# Wait for app to load
sleep 5

# Check if app is running
if adb shell pidof com.ifadaily.yorubawisdom > /dev/null; then
    echo "✅ App launched successfully"
    
    # Basic functionality tests
    echo "🔮 Running spiritual content tests..."
    
    # Test 1: Check if web content loads
    adb shell input tap 500 1000  # Tap on main content area
    sleep 3
    
    # Test 2: Check if audio functionality works
    adb shell input tap 300 800   # Tap on audio section
    sleep 2
    
    # Test 3: Navigation test
    adb shell input tap 200 200   # Navigation menu
    sleep 2
    
    echo "✅ Basic functionality tests passed"
    
    # Performance monitoring
    echo "📊 Checking performance metrics..."
    
    # Memory usage
    MEMORY=$(adb shell dumpsys meminfo com.ifadaily.yorubawisdom | grep TOTAL | awk '{print $2}')
    echo "🧠 Memory Usage: ${MEMORY}KB"
    
    # CPU usage
    CPU=$(adb shell top -n 1 | grep com.ifadaily.yorubawisdom | awk '{print $9}')
    echo "⚡ CPU Usage: ${CPU}%"
    
    # Battery info
    BATTERY=$(adb shell dumpsys battery | grep level | awk '{print $2}')
    echo "🔋 Battery Level: ${BATTERY}%"
    
    echo "✅ Release testing completed successfully!"
    
else
    echo "❌ Error: App failed to launch"
    exit 1
fi
```

---

## 🧪 Testing Strategy & Tools

### **5. Local Testing Environment**

#### **Android Studio Emulator Setup**
```bash
# Create AVD for testing different Android versions
$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager create avd \
  -n "Ifa_Android_10" \
  -k "system-images;android-29;google_apis;x86_64" \
  -d "pixel_3"

$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager create avd \
  -n "Ifa_Android_12" \
  -k "system-images;android-31;google_apis;x86_64" \
  -d "pixel_5"

$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager create avd \
  -n "Ifa_Android_14" \
  -k "system-images;android-34;google_apis;x86_64" \
  -d "pixel_7"

# Launch emulators for testing
$ANDROID_HOME/emulator/emulator -avd Ifa_Android_10 &
$ANDROID_HOME/emulator/emulator -avd Ifa_Android_12 &
$ANDROID_HOME/emulator/emulator -avd Ifa_Android_14 &
```

#### **Device Testing Matrix**
```yaml
# testing-matrix.yml
test_devices:
  - device: "Pixel 6"
    api_level: 31
    ram: "8GB"
    screen: "1080x2400"
    tests: ["basic_functionality", "audio_performance", "3d_rendering"]
    
  - device: "Galaxy S21"
    api_level: 30
    ram: "6GB" 
    screen: "1080x2400"
    tests: ["samsung_specific", "edge_cases", "performance"]
    
  - device: "OnePlus 9"
    api_level: 33
    ram: "8GB"
    screen: "1080x2400"
    tests: ["oxygenOS_compatibility", "battery_optimization"]
    
  - device: "Budget Android"
    api_level: 28
    ram: "2GB"
    screen: "720x1280"
    tests: ["low_end_performance", "memory_constraints"]

testing_scenarios:
  spiritual_content:
    - daily_reading_load
    - odu_visualization_performance  
    - audio_playback_quality
    - 3d_cosmic_realms_rendering
    
  performance:
    - app_startup_time
    - memory_usage_monitoring
    - battery_drain_measurement
    - network_connectivity_handling
    
  accessibility:
    - screen_reader_compatibility
    - high_contrast_mode
    - font_size_scaling
    - color_blind_accessibility
```

### **6. Firebase Test Lab Integration**

#### **Firebase Test Lab Configuration**
```yaml
# firebase-test-lab.yml
testMatrix:
  - testType: 'robo'
    timeout: '15m'
    devices:
      - model: 'Pixel2'
        version: '28'
        locale: 'en'
        orientation: 'portrait'
      - model: 'Pixel3'
        version: '30'
        locale: 'en'
        orientation: 'portrait'
      - model: 'Pixel4'
        version: '31'
        locale: 'en'
        orientation: 'portrait'
        
  - testType: 'instrumentation'
    testApk: 'app-debug-androidTest.apk'
    timeout: '10m'
    devices:
      - model: 'Pixel6'
        version: '33'
        locale: 'en'
        orientation: 'portrait'

roboScript:
  - action: 'click'
    elementType: 'text'
    text: 'Daily Reading'
  - action: 'wait'
    timeout: '3000'
  - action: 'click'
    elementType: 'text'
    text: 'Orisha Healing'
  - action: 'wait'
    timeout: '5000'
  - action: 'click'
    elementType: 'text'
    text: 'Audio'
```

#### **Firebase Test Lab Execution Script**
```bash
#!/bin/bash

# Firebase Test Lab Execution
echo "🔥 Running Firebase Test Lab tests..."

# Upload and test release build
gcloud firebase test android run \
  --type=robo \
  --app=android/app/build/outputs/apk/release/app-release.apk \
  --device=model=Pixel6,version=33,locale=en,orientation=portrait \
  --device=model=Pixel4,version=30,locale=en,orientation=portrait \
  --device=model=walleye,version=28,locale=en,orientation=portrait \
  --timeout=15m \
  --results-bucket=ifa-daily-test-results \
  --results-dir=release-tests-$(date +%Y%m%d_%H%M%S)

# Run specific spiritual content tests
gcloud firebase test android run \
  --type=instrumentation \
  --app=android/app/build/outputs/apk/release/app-release.apk \
  --test=android/app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk \
  --device=model=Pixel6,version=33 \
  --timeout=20m \
  --test-targets="class com.ifadaily.yorubawisdom.SpiritualContentTest"
```

### **7. Device Farm Testing**

#### **AWS Device Farm Configuration**
```json
{
  "name": "Ifa Daily Reading Test Suite",
  "type": "ANDROID_APP",
  "platform": "ANDROID",
  "rules": [
    {
      "attribute": "MANUFACTURER",
      "operator": "IN",
      "value": "[\"Samsung\", \"Google\", \"OnePlus\", \"Xiaomi\"]"
    },
    {
      "attribute": "OS_VERSION",
      "operator": "GREATER_THAN_OR_EQUAL",
      "value": "\"7.0\""
    },
    {
      "attribute": "RAM",
      "operator": "GREATER_THAN_OR_EQUAL", 
      "value": "\"2048\""
    }
  ],
  "maxDevices": 10,
  "tests": [
    {
      "name": "Spiritual Content Navigation",
      "type": "APPIUM_JAVA_JUNIT",
      "testPackage": "spiritual-navigation-tests.zip"
    },
    {
      "name": "Audio Performance Test", 
      "type": "APPIUM_JAVA_JUNIT",
      "testPackage": "audio-performance-tests.zip"
    },
    {
      "name": "3D Rendering Performance",
      "type": "APPIUM_JAVA_JUNIT", 
      "testPackage": "3d-rendering-tests.zip"
    }
  ]
}
```

---

## 🏪 Google Play Console Publishing Workflow

### **8. Play Console Setup & Configuration**

#### **Initial App Creation**
```bash
# Step 1: Create new app in Play Console
# - Go to https://play.google.com/console
# - Click "Create app"
# - App name: "Ifá Daily Reading"
# - Default language: English (United States)
# - App type: App
# - Category: Lifestyle
# - Is your app free?: Yes/No (based on monetization strategy)

# Step 2: Set up app content
# - Privacy Policy: https://your-domain.replit.app/privacy-policy
# - App access: All functionality available without restrictions
# - Content rating: Everyone (religious/spiritual content)
# - Target audience: 13+
# - Ads: Contains ads (if applicable)
```

#### **App Signing Configuration**
```bash
# Upload signing key to Google Play Console
# 1. Go to Release > Setup > App signing
# 2. Choose "Use Google Play app signing"
# 3. Upload release keystore certificate

# Generate upload keystore (different from release keystore)
keytool -genkey -v \
  -keystore ifa-daily-upload.keystore \
  -alias ifa-daily-upload-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 25000 \
  -storepass [UPLOAD_STORE_PASSWORD] \
  -keypass [UPLOAD_KEY_PASSWORD]

# Extract certificate for Play Console
keytool -export -rfc \
  -keystore ifa-daily-upload.keystore \
  -alias ifa-daily-upload-key \
  -file ifa-daily-upload-certificate.pem
```

### **9. Release Track Management**

#### **Internal Testing Track**
```bash
# Deploy to Internal Testing
echo "🧪 Deploying to Internal Testing track..."

# Upload AAB to Internal Testing
# This can be done via Play Console UI or Google Play Developer API

# Internal testing configuration:
# - Max testers: 100
# - Test duration: 1-2 weeks
# - Focus: Core functionality, spiritual content accuracy
# - Feedback channels: Internal team email, Slack #ifa-testing

# Internal test checklist:
# ✅ App launches successfully
# ✅ Daily readings load correctly
# ✅ Audio playback works across all Orisha content  
# ✅ 3D cosmic realms render properly
# ✅ Offline functionality works
# ✅ Performance meets requirements (<3s startup, <200MB memory)
```

#### **Closed Testing Track**
```bash
# Deploy to Closed Testing (Alpha)
echo "🔒 Deploying to Closed Testing track..."

# Closed testing configuration:
# - Max testers: 20,000
# - Test duration: 2-3 weeks
# - Audience: Yoruba community, spiritual practitioners
# - Geographic focus: Nigeria, US, UK, Brazil (Yoruba diaspora)

# Testers recruitment:
# - Email lists of Yoruba cultural organizations
# - Social media outreach in spiritual communities
# - University African Studies departments
# - Cultural centers and Orisha temples

# Feedback collection:
# - In-app feedback system
# - Google Play Console reviews
# - Survey forms for cultural accuracy
# - Performance metrics monitoring
```

#### **Open Testing Track**
```bash
# Deploy to Open Testing (Beta)
echo "🌍 Deploying to Open Testing track..."

# Open testing configuration:
# - Unlimited testers
# - Test duration: 4-6 weeks  
# - Global availability
# - Opt-in via Play Store

# Marketing for open testing:
# - Blog posts about preserving Yoruba culture
# - Social media campaigns
# - Press releases to African cultural publications
# - University partnerships for research

# Success metrics:
# - Download rate > 1000/week
# - Retention rate > 70% after 7 days
# - Average rating > 4.0 stars
# - Cultural accuracy feedback > 90% positive
```

### **10. Production Release Strategy**

#### **Staged Rollout Plan**
```bash
# Production Release with Staged Rollout
echo "🚀 Initiating production release..."

# Week 1: 1% rollout
# - Monitor crash rates, ANRs, performance
# - Watch for critical issues
# - Target: <0.5% crash rate, <1% ANR rate

# Week 2: 5% rollout
# - Expand monitoring
# - Collect user feedback
# - Cultural accuracy validation

# Week 3: 25% rollout  
# - Performance optimization based on real usage
# - Server capacity validation
# - Audio streaming optimization

# Week 4: 50% rollout
# - Full feature validation
# - Localization testing
# - Community engagement monitoring

# Week 5: 100% rollout
# - Complete global availability
# - Marketing campaign launch
# - Press release and media outreach
```

#### **Release Deployment Script**
```bash
#!/bin/bash

# scripts/deploy-play-store.sh
# Google Play Store Deployment Script

set -e

echo "🏪 Deploying to Google Play Store..."

# Verify prerequisites
if [ ! -f "android/app/build/outputs/bundle/release/app-release.aab" ]; then
    echo "❌ Error: Release AAB not found. Run build-release.sh first"
    exit 1
fi

# Verify Google Play Developer API setup
if [ -z "$GOOGLE_PLAY_SERVICE_ACCOUNT_KEY" ]; then
    echo "❌ Error: Google Play service account key not configured"
    exit 1
fi

# Upload to Play Console using API
echo "📤 Uploading AAB to Google Play Console..."

# Using Google Play Developer API v3
curl -X POST \
  "https://androidpublisher.googleapis.com/androidpublisher/v3/applications/com.ifadaily.yorubawisdom/edits" \
  -H "Authorization: Bearer $GOOGLE_PLAY_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'

EDIT_ID=$(echo $RESPONSE | jq -r '.id')

# Upload AAB
curl -X POST \
  "https://androidpublisher.googleapis.com/upload/androidpublisher/v3/applications/com.ifadaily.yorubawisdom/edits/$EDIT_ID/bundles" \
  -H "Authorization: Bearer $GOOGLE_PLAY_ACCESS_TOKEN" \
  -H "Content-Type: application/octet-stream" \
  --data-binary @android/app/build/outputs/bundle/release/app-release.aab

# Assign to track
curl -X PUT \
  "https://androidpublisher.googleapis.com/androidpublisher/v3/applications/com.ifadaily.yorubawisdom/edits/$EDIT_ID/tracks/production" \
  -H "Authorization: Bearer $GOOGLE_PLAY_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "track": "production",
    "releases": [{
      "versionCodes": ["1"],
      "status": "inProgress",
      "userFraction": 0.01,
      "releaseNotes": [{
        "language": "en-US",
        "text": "Initial release of Ifá Daily Reading - Authentic Yoruba spiritual wisdom with daily readings, 256 Odu system, and Orisha healing frequencies."
      }]
    }]
  }'

# Commit the edit
curl -X POST \
  "https://androidpublisher.googleapis.com/androidpublisher/v3/applications/com.ifadaily.yorubawisdom/edits/$EDIT_ID:commit" \
  -H "Authorization: Bearer $GOOGLE_PLAY_ACCESS_TOKEN"

echo "✅ Successfully deployed to Google Play Store!"
echo "🎯 Release Status: 1% staged rollout active"
echo "📊 Monitor at: https://play.google.com/console/developer/app-analytics"
```

---

## 📊 Release Management & Monitoring

### **11. Post-Release Monitoring**

#### **Key Metrics Dashboard**
```yaml
# monitoring-config.yml
metrics:
  performance:
    - app_startup_time: "<3000ms"
    - memory_usage: "<200MB" 
    - crash_rate: "<0.5%"
    - anr_rate: "<1%"
    
  engagement:
    - daily_active_users: "target: 1000+"
    - session_duration: "target: >5min"
    - retention_day_1: "target: >80%"
    - retention_day_7: "target: >70%"
    
  spiritual_content:
    - daily_reading_completion: "target: >60%"
    - audio_play_rate: "target: >40%"
    - odu_exploration_depth: "target: >10 odu/session"
    - orisha_healing_usage: "target: >30%"
    
  quality:
    - play_store_rating: "target: >4.0"
    - cultural_accuracy_feedback: "target: >90% positive"
    - audio_quality_satisfaction: "target: >85%"
    - ui_accessibility_score: "target: >AA compliance"

alerts:
  critical:
    - crash_rate > 1%
    - anr_rate > 2%
    - play_store_rating < 3.5
    
  warning:
    - startup_time > 4000ms
    - memory_usage > 250MB
    - retention_day_1 < 70%
```

#### **Rollback Strategy**
```bash
#!/bin/bash

# scripts/emergency-rollback.sh
# Emergency rollback for critical issues

echo "🚨 Initiating emergency rollback..."

# Check current release status
CURRENT_VERSION=$(gcloud firebase test android releases list --limit=1 --format="value(versionCode)")

# Rollback to previous version
if [ "$CURRENT_VERSION" -gt 1 ]; then
    PREVIOUS_VERSION=$((CURRENT_VERSION - 1))
    
    echo "📉 Rolling back from version $CURRENT_VERSION to $PREVIOUS_VERSION"
    
    # Halt current rollout
    curl -X PUT \
      "https://androidpublisher.googleapis.com/androidpublisher/v3/applications/com.ifadaily.yorubawisdom/edits/$EDIT_ID/tracks/production" \
      -H "Authorization: Bearer $GOOGLE_PLAY_ACCESS_TOKEN" \
      -d '{
        "track": "production", 
        "releases": [{
          "versionCodes": ["'$PREVIOUS_VERSION'"],
          "status": "completed"
        }]
      }'
    
    echo "✅ Rollback completed to version $PREVIOUS_VERSION"
    echo "📧 Sending notification to development team..."
    
else
    echo "❌ Error: No previous version available for rollback"
fi
```

### **12. Version Management Strategy**

#### **Semantic Versioning for Spiritual Content**
```
Version Format: MAJOR.MINOR.PATCH.SPIRITUAL

Examples:
- 1.0.0.0 - Initial release
- 1.1.0.0 - New Orisha healing frequency added
- 1.1.1.0 - Bug fixes and performance improvements  
- 1.1.1.1 - Spiritual content updates (new Odu interpretations)
- 2.0.0.0 - Major feature addition (e.g., community features)

Version Code Mapping:
- Version 1.0.0.0 = versionCode 1000000
- Version 1.1.0.0 = versionCode 1010000
- Version 1.1.1.1 = versionCode 1010101
```

#### **Release Notes Template**
```markdown
# Ifá Daily Reading v1.1.0 - New Orisha Healing Frequencies

## 🌟 New Features
- Added Òrúnmìlà wisdom healing with 741Hz frequency
- Enhanced 3D cosmic realms with improved performance
- New Yoruba calendar integration with lunar phases

## 🎵 Audio Enhancements  
- Authentic Oriki recordings for 3 additional Orisha
- Improved audio quality with mobile optimization
- Background audio support for extended meditation

## 🔧 Performance Improvements
- Reduced app startup time by 40%
- Optimized memory usage for older devices
- Enhanced battery life with smart animation controls

## 🌍 Cultural Authenticity
- Verified pronunciations with native Yoruba speakers
- Updated Odu interpretations with traditional accuracy
- Enhanced bilingual support for spiritual terms

## 🐛 Bug Fixes
- Fixed 3D rendering on low-end devices
- Resolved audio playback issues on Samsung devices
- Improved accessibility for screen readers

## 🙏 Àṣẹ
This update preserves and honors traditional Yoruba spiritual wisdom while embracing modern technology to serve our global community.

---
For support: support@ifadaily.app
Cultural consultation: cultural@ifadaily.app
```

This comprehensive export strategy provides a complete workflow from development to Google Play Store publication, ensuring the Ifá Daily Reading app maintains its spiritual authenticity while meeting all technical requirements for successful Android deployment.