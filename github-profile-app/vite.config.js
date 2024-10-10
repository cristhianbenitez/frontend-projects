import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base public path when served in production
  base: '/',

  // Configure server options
  server: {
    port: 3000,
    open: true // Open browser on server start
  },

  // Configure build options
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },

  // Configure plugins (none needed for basic vanilla JS setup)
  plugins: [],

  // Optimize dependencies
  optimizeDeps: {
    include: [] // Add any dependencies that need pre-bundling
  },

  // CSS configuration
  css: {
    devSourcemap: true
  }
});
