import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
   plugins: [tailwindcss(), react()],
   server: {
    proxy: {
      '/superhero-api': {
        target: 'https://superheroapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/superhero-api/, ''),
      },
    },
  },
})
