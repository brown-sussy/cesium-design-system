import { createApp } from 'vue';
import '../src/styles/index.css';
import '../docs/docs.css';
import './site.css';
import { initTheme } from './lib/theme';
import App from './App.vue';

// The stylesheet is the library's own: the Vue build emits the same `.cs-*`
// markup as the React one, so there is nothing to override. `docs.css` is the
// shared docs chrome, imported here so both sites look like one system.
initTheme();

createApp(App).mount('#app');
