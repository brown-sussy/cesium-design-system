<script setup lang="ts">
import { computed } from 'vue';
import { Badge, Button, Icon } from '../../vue';
import { templateMeta, type TemplateMeta } from '../lib/site';
import { navigate } from '../lib/router';
import { hasTemplateView, templateViews } from '../templates';
import CodeBlock from '../components/CodeBlock.vue';

const props = defineProps<{ slug?: string; viewFull?: boolean }>();

const current = computed<TemplateMeta | undefined>(() =>
  props.slug ? templateMeta.find((t) => t.slug === props.slug) : undefined,
);

const live = computed(() => (props.slug ? templateViews[props.slug] : undefined));

const usage = computed(() => {
  const t = current.value;
  if (!t) return '';
  return `<script setup lang="ts">
import { ${t.parts.join(', ')} } from '@cesium-ds/core/vue';
<\/script>

<template>
  <!-- ${t.name}: ${t.tagline} -->
</template>`;
});

function openFull(slug: string) {
  window.open(`${location.pathname}#/templates/${slug}?view=full`, '_blank', 'noopener');
}
</script>

<template>
  <!-- The page on its own: no chrome, no frame, the full viewport. -->
  <div v-if="viewFull && live" class="tpl-full">
    <component :is="live" />
  </div>

  <div v-else-if="current" class="doc-container">
    <header>
      <div class="doc-eyebrow">Templates</div>
      <h1 class="doc-h1">{{ current.name }}</h1>
      <p class="doc-lede">{{ current.description }}</p>
      <div class="doc-meta">
        <Badge tone="accent">{{ current.tagline }}</Badge>
        <Badge>Full page</Badge>
        <Badge v-for="p in current.parts" :key="p">{{ p }}</Badge>
      </div>
    </header>

    <div class="tpl-toolbar">
      <span class="cs-mono cs-t-2xs cs-dimmer">{{ current.slug }}.vue</span>
      <span class="tpl-toolbar__spacer" />
      <Button v-if="live" size="sm" variant="secondary" @click="openFull(current.slug)">
        <template #icon-left><Icon name="external" :size="12" /></template>
        Open full page
      </Button>
    </div>

    <!-- The template itself, at 1:1 — the same file as the full-page route,
         in the same frame the React docs use. -->
    <div v-if="live" class="tpl-frame cs-scroll">
      <component :is="live" />
    </div>
    <p v-else class="site-empty">This template has no page yet — only its description.</p>

    <section class="doc-section">
      <h2 class="doc-h2">What it is doing</h2>
      <div class="prose">
        <ul>
          <li v-for="note in current.notes" :key="note">{{ note }}</li>
        </ul>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Composed from</h2>
      <div class="prose">
        <p>
          Every element on this page is a component from the library — nothing here is bespoke
          markup you would have to copy.
        </p>
      </div>
      <div class="cs-row" style="gap: 6px; margin-top: 14px; flex-wrap: wrap">
        <Badge v-for="p in current.parts" :key="p">{{ p }}</Badge>
      </div>
      <div style="height: 16px" />
      <CodeBlock lang="vue" :code="usage" />
    </section>
  </div>

  <div v-else class="doc-container">
    <header>
      <div class="doc-eyebrow">Templates</div>
      <h1 class="doc-h1">Pages, not components</h1>
      <p class="doc-lede">
        Whole screens assembled from the system — a homepage, a sign-in, a settings shell, an error
        page. Each one renders here, and opens full-screen from its own page.
      </p>
      <div class="doc-meta">
        <Badge tone="accent">{{ templateMeta.length }} templates</Badge>
        <Badge>Single file</Badge>
        <Badge>Both themes</Badge>
        <Badge>One stylesheet</Badge>
      </div>
    </header>

    <div class="site-cards" style="margin-top: 32px">
      <div
        v-for="t in templateMeta"
        :key="t.slug"
        class="site-card"
        style="cursor: pointer"
        @click="navigate(`/templates/${t.slug}`)"
      >
        <span class="site-card__title">{{ t.name }}</span>
        <span class="site-card__desc">{{ t.tagline }} — {{ t.description }}</span>
        <div class="cs-row" style="gap: 6px; margin-top: 12px; flex-wrap: wrap">
          <Badge v-for="p in t.parts" :key="p">{{ p }}</Badge>
          <Badge v-if="hasTemplateView(t.slug)" tone="accent">Live</Badge>
        </div>
      </div>
    </div>
  </div>
</template>
