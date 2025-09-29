import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: __dirname,
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: resolve(__dirname, 'worldmap.html')
    }
  },
  server: {
    port: 4173,
    open: '/worldmap.html'
  },
  resolve: {
    alias: {
      '@acted/browser': resolve(__dirname, '../src')
    }
  }
});