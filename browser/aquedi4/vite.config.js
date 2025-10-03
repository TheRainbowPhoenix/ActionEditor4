import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: __dirname,
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    // sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  }
});