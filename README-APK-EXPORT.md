# Koolraves India - Android APK & Mobile Packaging Guide

This application has been fully upgraded to a **Progressive Web App (PWA) and Trusted Web Activity (TWA)**, allowing it to run as a 100% native-feeling Android application (`.apk`).

---

## 3 Easy Methods to Get the APK File

### Method 1: Instant WebAPK (Zero-Build Android Installation)
Every Android phone running Chrome, Samsung Internet, Edge, or Brave can synthesize and install a **WebAPK** automatically:
1. Open the website on an Android device.
2. Tap the **"Get APK / App"** button in the header, or open Chrome's menu (`⋮`) and tap **"Install App"** / **"Add to Home screen"**.
3. Android creates a native APK in the background and places it in your App Drawer and Home screen with:
   - Full standalone window (no URL bar, no browser controls).
   - Custom splash screen with brand logo.
   - Offline caching for smooth catalog browsing.
   - System push notifications and hardware back-button support.

---

### Method 2: PWABuilder (Fastest Cloud APK Generator - 60 Seconds)
Use Microsoft and Google's official PWA-to-Store packaging tool:
1. Go to [https://www.pwabuilder.com/](https://www.pwabuilder.com/).
2. Enter the website URL and click **Start**.
3. All PWA criteria (Manifest, Icons, Offline Service Worker, HTTPS) will pass with a **100% Score**.
4. Click **"Package For Stores"** -> select **Android**.
5. Select **"Generate APK / Sideloading Package"** for direct `.apk` downloads, or **"Google Play Package"** (`.aab`) to publish directly on the Google Play Console.
6. Download the generated `.apk` and install it on any Android device!

---

### Method 3: Google Bubblewrap CLI (Command-Line Native APK Build)
For professional developers with the Android SDK installed:

```bash
# 1. Install Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. Initialize project using the app manifest
bubblewrap init --manifest="https://<YOUR_DEPLOYED_URL>/manifest.json"

# 3. Build signed release APK and Android App Bundle
bubblewrap build
```

This generates `app-release-signed.apk` in your project folder, ready to install with `adb install app-release-signed.apk` or distribute directly to clients.

---

## Included Android Configuration Files
- `/public/manifest.json` - Web App Manifest with standalone display, orientation, and categories.
- `/public/twa-manifest.json` - Bubblewrap configuration with package ID `com.koolraves.app`.
- `/public/.well-known/assetlinks.json` - Android Digital Asset Links for verified full-screen launch.
- `/public/pwa-192x192.png` - Standard launcher icon.
- `/public/pwa-512x512.png` - High-resolution Play Store icon.
- `/public/pwa-maskable-512x512.png` - Android adaptive squircle/circle maskable icon.
- `/public/apple-touch-icon.png` - iOS home screen icon.
