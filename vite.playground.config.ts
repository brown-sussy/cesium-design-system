import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

// Verification harness for the Vue package. Not published — it exists so every
// component can be rendered, themed and screenshotted against the React docs.
export default defineConfig({
  root: resolve(__dirname, 'vue/playground'),
  plugins: [vue()],
  build: {
    outDir: resolve(__dirname, 'dist/playground'),
    emptyOutDir: true,
  },
});
