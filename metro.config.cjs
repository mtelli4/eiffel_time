// metro.config.js
const { getDefaultConfig } = require('@react-native/metro-config')

module.exports = (async () => {
    const config = await getDefaultConfig(__dirname)

    return {
        ...config,
        transformer: {
            ...config.transformer,
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
    }
})()
