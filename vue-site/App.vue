<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type Component,
} from 'vue';
import PageSkeleton from './components/PageSkeleton.vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteSidebar from './components/SiteSidebar.vue';
import { scrollToTop, useRoute } from './lib/router';

/**
 * Every page is its own chunk. The overview is eager — it is the default route,
 * so it is the first paint — and everything else loads on demand. A reader who
 * arrives for one component should not download 53 prop tables to see it.
 */
import Overview from './pages/Overview.vue';

/**
 * `delay` keeps a fast chunk silent: a page that resolves inside 120ms never
 * shows the skeleton, so a warm navigation is a straight swap. Only a genuine
 * wait gets a placeholder — and it is the same three bars the React docs use,
 * so the two sites do not diverge while loading.
 */
function pageChunk(loader: () => Promise<{ default: Component }>) {
  return defineAsyncComponent({
    loader,
    loadingComponent: PageSkeleton,
    delay: 120,
  });
}

const ComponentsIndex = pageChunk(() => import('./pages/ComponentsIndex.vue'));
const ComponentPage = pageChunk(() => import('./pages/ComponentPage.vue'));
const SearchPalette = defineAsyncComponent(() => import('./components/SearchPalette.vue'));

const route = useRoute();
const menuOpen = ref(false);
const searchOpen = ref(false);

/**
 * The pane's entrance animation is for arriving at the site, not for moving
 * around inside it. `<main>` is keyed by route, so it remounts on every
 * navigation; leaving `page-enter` on it would fade a pane whose content is
 * already rendered. Cleared on the first route change and never restored.
 */
const enter = ref(true);

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
  enter.value = false;
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

      <main
        :key="route"
        class="doc-main"
        :class="{ 'doc-main--wide': path === '/', 'page-enter': enter }"
      >
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
