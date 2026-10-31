import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

/**
 * Vue demo site.
 *
 * Built into `site/vue` rather than a sibling folder: the docs deploy publishes
 * `site/`, so one deploy carries both sites and they can never point at
 * different versions of the library.
 *
 * `base: './'` because the whole thing is served from a subpath — absolute
 * `/assets/...` would resolve against the domain root and 404.
 */
export default defineConfig({
  plugins: [vue()],
  root: resolve(__dirname, 'vue-site'),
  base: './',
  // The font binaries live once, in the docs' public directory.
  publicDir: resolve(__dirname, 'docs/public'),
  resolve: {
    alias: {
      '@cesium-ds/core': resolve(__dirname, 'src/index.ts'),
    },
  },
  server: {
    port: 5179,
    strictPort: false,
  },
  build: {
    outDir: resolve(__dirname, 'site/vue'),
    emptyOutDir: true,
  },
});
