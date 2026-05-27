import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/serpapi': {
        target: 'https://serpapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/serpapi/, ''),
      },
      '/api/elimapi': {
        target: 'https://api.elim.asia',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/elimapi/, ''),
      },
    },
  },
})
