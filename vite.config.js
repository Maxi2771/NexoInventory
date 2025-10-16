import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  //base: 'https://Maxi2771.github.io/NexoInventory/',
  build: {
    outDir: 'docs'
  }
})
