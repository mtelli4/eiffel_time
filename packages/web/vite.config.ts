import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared/src'),
      'react-native': 'react-native-web',
      'react-native-vector-icons': './empty-module.js', // Redirige vers un fichier vide
    },
  },
  optimizeDeps: {
    exclude: [
      'react-native-vector-icons',
      'react-native/Libraries/Utilities/codegenNativeComponent',
      'react-native-dropdown-picker',
      'react-native-mmkv'
    ],
  },
  server: {
    port: 3000,
  },
})
