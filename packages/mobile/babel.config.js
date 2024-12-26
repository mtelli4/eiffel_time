// babel.config.js
module.exports = {
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    "react-native-reanimated/plugin",
    [
      "module-resolver",
      {
        "root": ["./src"],
        "alias": {
          "@shared": "../../shared/src"
        }
      }
    ]
  ]
}
