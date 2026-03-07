import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'public_html',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      // Ensure all HTML files in pages/ are included in the build if needed,
      // but for now, we just want to make sure 'public' is copied.
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './public_html'),
    },
  },
  server: {
    port: 3001,
  }
});
