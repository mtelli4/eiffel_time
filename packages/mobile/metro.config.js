const path = require('path');
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  return {
    projectRoot: path.resolve(__dirname),
    watchFolders: [
      path.resolve(__dirname, '../../node_modules'),
      path.resolve(__dirname, '../shared')
    ],
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg', 'ts', 'tsx']
    }
  };
})();
