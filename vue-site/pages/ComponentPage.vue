<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef, watch, type Component } from 'vue';
import { Badge, Icon, Tag } from '../../vue';
import CodeBlock from '../components/CodeBlock.vue';
import DemoPreview from '../components/DemoPreview.vue';
import PropTable from '../components/PropTable.vue';
import { findEntry } from '../lib/catalog.generated';
import { loadDemo, loadSource } from '../lib/demos';
import { navigate } from '../lib/router';

const props = defineProps<{ slug: string }>();

const entry = computed(() => findEntry(props.slug));

const demo = shallowRef<Component | null>(null);
const source = ref('');
const demoError = ref('');

/**
 * The demo and its source are fetched together from the same directory: one
 * glob loads the component that runs, another loads the text that is shown.
 * They are the same file, so the code pane cannot go stale.
 */
watch(
  () => props.slug,
  async (slug) => {
    demo.value = null;
    source.value = '';
    demoError.value = '';

    const current = findEntry(slug);
    if (!current) return;

    // `loadDemo` starts the import; `loadSource` starts the raw read. Both are
    // keyed off the same file name, so they always resolve to the same demo.
    const demoPromise = loadDemo(current.name);
    if (!demoPromise) {
      demoError.value = `No demo file for ${current.name} yet.`;
      return;
    }

    const sourcePromise = loadSource(current.name) ?? Promise.resolve('');
    const [mod, text] = await Promise.all([demoPromise, sourcePromise]);
    demo.value = mod.default;
    source.value = text;
  },
  { immediate: true },
);

const importLine = computed(
  () => `import { ${entry.value?.name ?? ''} } from '@cesium-ds/core/vue'`,
);

const sections = computed(() => {
  const list = [{ id: 'examples', label: 'Example' }];
  if (entry.value?.props.length) list.push({ id: 'api', label: 'API' });
  if (entry.value?.a11y.length) list.push({ id: 'accessibility', label: 'Accessibility' });
  if (entry.value?.guidance) list.push({ id: 'guidance', label: 'Guidance' });
  if (entry.value?.related.length) list.push({ id: 'related', label: 'Related' });
  return list;
});

/* --- active section tracking --------------------------------------- */

const active = ref('examples');
let observer: IntersectionObserver | undefined;

function observeSections() {
  observer?.disconnect();
  observer = new IntersectionObserver(
    (records) => {
      const visible = records
        .filter((r) => r.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) active.value = visible.target.id;
    },
    { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
  );
  for (const section of sections.value) {
    const el = document.getElementById(section.id);
    if (el) observer.observe(el);
  }
}

watch(sections, () => requestAnimationFrame(observeSections), { immediate: true, flush: 'post' });
onBeforeUnmount(() => observer?.disconnect());

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
  <div v-if="!entry" class="doc-main__inner">
    <header>
      <div class="doc-eyebrow">404</div>
      <h1 class="doc-h1">Signal lost</h1>
      <p class="doc-lede">
        There is no component at <code>{{ slug }}</code>. The navigation on the left is the
        authoritative map.
      </p>
    </header>
  </div>

  <div v-else class="doc-with-toc">
    <div>
      <header>
        <div class="doc-eyebrow">{{ entry.category }}</div>
        <h1 class="doc-h1">{{ entry.name }}</h1>
        <p class="doc-lede">{{ entry.summary }}</p>
        <div class="doc-meta">
          <Badge v-if="entry.status" :tone="entry.status === 'New' ? 'accent' : 'neutral'">
            {{ entry.status }}
          </Badge>
          <Badge>Vue</Badge>
          <Badge>TypeScript</Badge>
          <span class="doc-meta__code">{{ importLine }}</span>
        </div>
      </header>

      <p v-if="entry.intro" class="doc-sub" style="margin-top: 22px">{{ entry.intro }}</p>

      <section id="examples" class="doc-section">
        <h2 class="doc-h2">Example</h2>
        <p v-if="demoError" class="site-empty">{{ demoError }}</p>
        <DemoPreview v-else :component="demo" :code="source" align="center" :min-height="140" />
        <div v-if="source" style="margin-top: 18px">
          <CodeBlock :code="source" lang="vue" />
        </div>
      </section>

      <section v-if="entry.props.length" id="api" class="doc-section">
        <h2 class="doc-h2">API</h2>
        <PropTable :rows="entry.props" />
      </section>

      <section v-if="entry.a11y.length" id="accessibility" class="doc-section">
        <h2 class="doc-h2">Accessibility</h2>
        <div class="prose">
          <ul>
            <li v-for="item in entry.a11y" :key="item">{{ item }}</li>
          </ul>
        </div>
      </section>

      <section v-if="entry.guidance" id="guidance" class="doc-section">
        <h2 class="doc-h2">Guidance</h2>
        <div class="guidance-grid">
          <div class="guidance guidance--do">
            <div class="guidance__head"><Icon name="check" :size="11" /> Do</div>
            <ul>
              <li v-for="item in entry.guidance.do" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="guidance guidance--dont">
            <div class="guidance__head"><Icon name="close" :size="11" /> Don’t</div>
            <ul>
              <li v-for="item in entry.guidance.dont" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section v-if="entry.related.length" id="related" class="doc-section">
        <h2 class="doc-h2">Related</h2>
        <div class="related-row">
          <Tag
            v-for="slug in entry.related"
            :key="slug"
            accent
            style="cursor: pointer"
            @click="navigate(`/components/${slug}`)"
          >
            {{ findEntry(slug)?.name ?? slug }}
          </Tag>
        </div>
      </section>
    </div>

    <nav class="doc-toc">
      <div class="doc-toc__title">On this page</div>
      <a
        v-for="section in sections"
        :key="section.id"
        class="doc-toc__link"
        :data-active="active === section.id"
        :href="`#${section.id}`"
        @click.prevent="jump(section.id)"
      >
        {{ section.label }}
      </a>
    </nav>
  </div>
</template>
