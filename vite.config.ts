import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
    resolve: {
        alias: {
            '@shared': path.resolve(__dirname, './src/shared'),
            '@web': path.resolve(__dirname, './src/web'),
            '@mobile': path.resolve(__dirname, './src/mobile'),
        },
    },
})
