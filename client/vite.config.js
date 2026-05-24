import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'


// https://vite.dev/config/
export default defineConfig({
  base: '/admin/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
"@": path.resolve(fileURLToPath(new URL("./src", import.meta.url))),
    },
  },
  build: {
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        codeSplitting: true,
      },
    },
  },
})

