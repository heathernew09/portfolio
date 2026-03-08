import { defineConfig } from 'vite';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import { globSync } from 'glob';

// Get all HTML files in public_html and its subdirectories
const pages = globSync('public_html/**/*.html').reduce((acc, file) => {
  // Create a relative path from public_html to the file
  const relativePath = path.relative('public_html', file);
  // Skip index.html as it's handled separately as 'main'
  if (relativePath === 'index.html') return acc;
  
  // Use the relative path as the key (e.g., 'pages/about' or '404')
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
