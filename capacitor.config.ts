import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.cookingassist.app',
  appName: 'دستیار آشپزی',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      backgroundColor: '#0f172a',
      showSpinner: false,
      androidSplashResourceName: 'splash',
    },
    Keyboard: {
      resize: 'body',
    },
  },
}

export default config
