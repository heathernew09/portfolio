import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'public_html',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
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
