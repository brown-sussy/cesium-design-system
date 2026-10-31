<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteSidebar from './components/SiteSidebar.vue';
import { scrollToTop, useRoute } from './lib/router';

/**
 * Every page is its own chunk. The overview is eager — it is the default route,
 * so it is the first paint — and everything else loads on demand. A reader who
 * arrives for one component should not download 53 prop tables to see it.
 */
import Overview from './pages/Overview.vue';

const ComponentsIndex = defineAsyncComponent(() => import('./pages/ComponentsIndex.vue'));
const ComponentPage = defineAsyncComponent(() => import('./pages/ComponentPage.vue'));
const SearchPalette = defineAsyncComponent(() => import('./components/SearchPalette.vue'));

const route = useRoute();
const menuOpen = ref(false);
const searchOpen = ref(false);

const path = computed(() => route.value.split('?')[0]);

const page = computed(() => {
  if (path.value === '/') return Overview;
  if (path.value === '/components') return ComponentsIndex;
  if (path.value.startsWith('/components/')) return ComponentPage;
  return null;
});

const pageProps = computed(() =>
  path.value.startsWith('/components/') && path.value !== '/components'
    ? { slug: path.value.slice('/components/'.length) }
    : {},
);

watch(path, () => {
  menuOpen.value = false;
  scrollToTop();
});

function onKey(event: KeyboardEvent) {
  const inField = (event.target as HTMLElement)?.closest('input, textarea');
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchOpen.value = !searchOpen.value;
  } else if (event.key === '/' && !inField) {
    event.preventDefault();
    searchOpen.value = true;
  } else if (event.key === 'Escape') {
    menuOpen.value = false;
    searchOpen.value = false;
  }
}

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <div class="doc-shell">
    <SiteHeader @search="searchOpen = true" @toggle-menu="menuOpen = !menuOpen" />

    <div class="doc-body">
      <SiteSidebar :route="route" :open="menuOpen" @navigate="menuOpen = false" />

      <main :key="route" class="doc-main page-enter" :class="{ 'doc-main--wide': path === '/' }">
        <component :is="page" v-if="page" v-bind="pageProps" />
        <div v-else class="doc-main__inner">
          <header>
            <div class="doc-eyebrow">404</div>
            <h1 class="doc-h1">Signal lost</h1>
            <p class="doc-lede">
              This route does not exist. The navigation on the left is the authoritative map of the
              system.
            </p>
          </header>
        </div>
      </main>
    </div>

    <footer class="doc-footer">
      <div class="doc-container doc-footer__inner">
        <span>Cesium Design System · MIT</span>
        <span>Vue 3 · same stylesheet as React</span>
        <span>v1.0.0</span>
      </div>
    </footer>

    <SearchPalette v-if="searchOpen" @close="searchOpen = false" />
  </div>
</template>
