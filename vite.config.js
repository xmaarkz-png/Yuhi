import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/tmapi': {
        target: 'http://api.tmapi.top',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tmapi/, ''),
      },
      '/api/serpapi': {
        target: 'https://serpapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/serpapi/, ''),
      },
    },
  },
})
