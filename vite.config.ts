import { defineConfig } from 'vite';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import { globSync } from 'glob';

// Get all HTML files in public_html/pages
const pages = globSync('public_html/pages/**/*.html').reduce((acc, file) => {
  // Create a relative path from public_html to the file
  const relativePath = path.relative('public_html', file);
  // Use the relative path as the key (e.g., 'pages/about.html')
  // but remove .html extension for the key
  const name = relativePath.replace(/\.html$/, '');
  acc[name] = path.resolve(__dirname, file);
  return acc;
}, {});

export default defineConfig({
  root: 'public_html',
  publicDir: '../public',
  plugins: [
    injectHTML({
      tagName: 'load',
      sourceAttr: 'src',
    }),
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'public_html/index.html'),
        ...pages
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './public_html'),
      '@partials': path.resolve(__dirname, './src/partials'),
    },
  },
  server: {
    port: 3001,
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  }
});
