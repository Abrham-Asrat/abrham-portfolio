import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('@mui') ||
              id.includes('@emotion') ||
              id.includes('styled-components')
            ) {
              return 'vendor-core';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (
              id.includes('framer-motion') ||
              id.includes('@react-spring') ||
              id.includes('gsap') ||
              id.includes('aos')
            ) {
              return 'vendor-animation';
            }
            return 'vendor-utils';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
})
