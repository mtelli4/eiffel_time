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
        '@babel/runtime': path.resolve(
          __dirname,
          '../../node_modules/@babel/runtime',
        ),
      },
    },
    watchFolders: [
      // Surveillez les dossiers partagés du monorepo
      path.resolve(__dirname, '../shared'),
      path.resolve(__dirname, '../../node_modules'), // Inclure le node_modules à la racine
    ],
  });
})();
