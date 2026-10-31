import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

// Vue library build: @cesium-ds/core/vue
//
// The stylesheet is not built here. Both packages ship the same .cs-* class
// names, so dist/cesium-ds.css from the React build is the single stylesheet
// for both — nothing to duplicate, nothing to drift.
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist/vue',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'vue/index.ts'),
      name: 'CesiumVue',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        // The package exports named components plus a default install plugin.
        exports: 'named',
      },
    },
  },
});
