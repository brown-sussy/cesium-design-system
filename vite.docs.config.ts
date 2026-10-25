import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Documentation site build
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'docs'),
  base: './',
  resolve: {
    alias: {
      '@cesium-ds/core': resolve(__dirname, 'src/index.ts'),
      '@docs': resolve(__dirname, 'docs'),
    },
  },
  server: {
    port: 5178,
    strictPort: false,
  },
  build: {
    outDir: resolve(__dirname, 'site'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        /**
         * React changes far less often than the docs do, so give it a chunk of
         * its own: a content update then invalidates one small file instead of
         * the whole vendor payload.
         */
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },
});
