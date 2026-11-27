const webExt = ['.web.tsx', '.web.ts', '.web.js']

/** @type {import('next').NextConfig} */
export default {
  transpilePackages: ['@acme/contracts', '@acme/ui', 'react-native-web'],
  // webpack (default for `next dev`)
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, 'react-native$': 'react-native-web' }
    config.resolve.extensions = [...webExt, ...config.resolve.extensions]
    return config
  },
  // turbopack (`next dev --turbopack`)
  turbopack: {
    resolveAlias: { 'react-native': 'react-native-web' },
    resolveExtensions: [...webExt, '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
}
