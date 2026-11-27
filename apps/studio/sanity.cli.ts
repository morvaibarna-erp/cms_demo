import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // The shared components are written with React Native primitives; in the browser they run on react-native-web.
  vite: (config) => {
    const existing = config.resolve?.alias
    const list = Array.isArray(existing)
      ? existing
      : Object.entries(existing ?? {}).map(([find, replacement]) => ({ find, replacement: replacement as string }))
    return {
      ...config,
      define: { ...config.define, __DEV__: JSON.stringify(true) },
      resolve: {
        ...config.resolve,
        extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.mjs', '.json'],
        alias: [{ find: /^react-native$/, replacement: 'react-native-web' }, ...list],
      },
    }
  },
})
