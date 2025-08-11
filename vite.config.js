import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),      // Shortcut for src folder
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@validators': path.resolve(__dirname, './src/validators'),
      '@Views': path.resolve(__dirname, './src/Views')
    }
  }
})
