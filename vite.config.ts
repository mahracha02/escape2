import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/escape-the-web/',
  css: {
    postcss: './postcss.config.cjs',
  },
})
