// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://meet-up-back.vercel.app', // Point to your live backend
        changeOrigin: true,
        secure: true, // Vercel uses a valid SSL certificate
      }
    }
  }
})