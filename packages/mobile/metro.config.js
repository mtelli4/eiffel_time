const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return mergeConfig(defaultConfig, {
    resolver: {
      ...defaultConfig.resolver,
      // Assurez-vous que Metro sait où trouver les dépendances globales
      extraNodeModules: {
        ...defaultConfig.resolver.extraNodeModules,
        mobile: path.resolve(__dirname, 'mobile'),
        web: path.resolve(__dirname, 'web'),
        '@babel/runtime': path.resolve(
          __dirname,
          '../../node_modules/@babel/runtime',
        ),
      },
      sourceExts: [
        'native.ts',
        'native.tsx',
        'native.js',
        'web.ts',
        'web.tsx',
        'web.js',
        ...defaultConfig.resolver.sourceExts,
      ],
    },
    watchFolders: [
      // Surveillez les dossiers partagés du monorepo
      path.resolve(__dirname, '../shared'),
      path.resolve(__dirname, '../web'),
      path.resolve(__dirname, '../../node_modules'), // Inclure le node_modules à la racine
    ],
  });
})();
