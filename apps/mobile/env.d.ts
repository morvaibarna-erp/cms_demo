// Expo inlines EXPO_PUBLIC_* variables at bundle time.
declare const process: {
  env: {
    EXPO_PUBLIC_SANITY_PROJECT_ID?: string
    EXPO_PUBLIC_SANITY_DATASET?: string
  }
}
