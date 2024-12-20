import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@api': '/src/api',
      '@components': '/src/components'
    }
  }
});
