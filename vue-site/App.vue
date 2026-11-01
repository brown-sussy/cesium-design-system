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

function pageChunk(loader: () => Promise<{ default: Component }>) {
  return defineAsyncComponent({
    loader,
    loadingComponent: PageSkeleton,
    delay: 120,
  });
}

const ComponentsIndex = pageChunk(() => import('./pages/ComponentsIndex.vue'));
const ComponentPage = pageChunk(() => import('./pages/ComponentPage.vue'));
const Foundations = pageChunk(() => import('./pages/Foundations.vue'));
const Patterns = pageChunk(() => import('./pages/Patterns.vue'));
const Templates = pageChunk(() => import('./pages/Templates.vue'));
const Resources = pageChunk(() => import('./pages/Resources.vue'));
const Skill = pageChunk(() => import('./pages/Skill.vue'));
const SearchPalette = defineAsyncComponent(() => import('./components/SearchPalette.vue'));

const route = useRoute();
const menuOpen = ref(false);
const searchOpen = ref(false);

const enter = ref(true);

const path = computed(() => route.value.split('?')[0]);
const query = computed(() => route.value.split('?')[1] || '');

const isFullTemplate = computed(
  () => path.value.startsWith('/templates/') && query.value === 'view=full',
);

const page = computed(() => {
  if (path.value === '/') return Overview;
  if (path.value === '/components') return ComponentsIndex;
  if (path.value.startsWith('/components/')) return ComponentPage;
  if (path.value.startsWith('/foundations/')) return Foundations;
  if (path.value.startsWith('/patterns/')) return Patterns;
  if (path.value === '/templates' || path.value.startsWith('/templates/')) return Templates;
  if (path.value === '/resources') return Resources;
  if (path.value === '/skill') return Skill;
  return null;
});

const pageProps = computed(() => {
  if (path.value.startsWith('/components/') && path.value !== '/components') {
    return { slug: path.value.slice('/components/'.length) };
  }
  if (path.value.startsWith('/foundations/')) {
    return { id: path.value.slice('/foundations/'.length) };
  }
  if (path.value.startsWith('/patterns/')) {
    return { id: path.value.slice('/patterns/'.length) };
  }
  if (path.value.startsWith('/templates/') && path.value !== '/templates') {
    return {
      slug: path.value.slice('/templates/'.length),
      viewFull: query.value === 'view=full',
    };
  }
  return {};
});

const isWide = computed(() => path.value === '/' || path.value.startsWith('/templates'));

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
  <!-- Full page template view without docs chrome -->
  <div v-if="isFullTemplate">
    <component :is="page" v-if="page" v-bind="pageProps" />
  </div>

  <div v-else class="doc-shell">
    <SiteHeader @search="searchOpen = true" @toggle-menu="menuOpen = !menuOpen" />

    <div class="doc-body">
      <SiteSidebar :route="route" :open="menuOpen" @navigate="menuOpen = false" />

      <main
        :key="route"
        class="doc-main"
        :class="{ 'doc-main--wide': isWide, 'page-enter': enter }"
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
        <span>Vue 3 & React · One unified design system</span>
        <span>v1.0.0</span>
      </div>
    </footer>

    <SearchPalette v-if="searchOpen" @close="searchOpen = false" />
  </div>
</template>
