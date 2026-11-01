<script setup lang="ts">
import { computed } from 'vue';
import { Badge, Button, Icon } from '../../vue';
import { templateMeta, type TemplateMeta } from '../lib/site';
import { navigate } from '../lib/router';
import CodeBlock from '../components/CodeBlock.vue';

const props = defineProps<{ slug?: string; viewFull?: boolean }>();

const currentTemplate = computed<TemplateMeta | undefined>(() => {
  if (!props.slug) return undefined;
  return templateMeta.find((t) => t.slug === props.slug);
});

function openFull(slug: string) {
  window.open(`${location.pathname}#/templates/${slug}?view=full`, '_blank', 'noopener');
}
</script>

<template>
  <!-- Full view mode -->
  <div v-if="viewFull && currentTemplate" class="tpl-full" style="padding: 40px; min-height: 100vh; background: var(--cs-bg-canvas);">
    <div style="max-width: 900px; margin: 0 auto">
      <div class="cs-row" style="justify-content: space-between; margin-bottom: 24px">
        <h1 class="doc-h1">{{ currentTemplate.name }}</h1>
        <Button size="sm" variant="secondary" @click="navigate(`/templates/${currentTemplate.slug}`)">
          Back to docs
        </Button>
      </div>
      <div class="cs-card" style="padding: 32px">
        <p class="doc-lede" style="margin-top: 0">{{ currentTemplate.description }}</p>
        <div class="cs-row" style="gap: 8px; margin-top: 16px">
          <Badge v-for="part in currentTemplate.parts" :key="part">{{ part }}</Badge>
        </div>
      </div>
    </div>
  </div>

  <!-- Detail mode -->
  <div v-else-if="currentTemplate" class="doc-container" style="padding-top: 56px">
    <header>
      <div class="doc-eyebrow">Templates</div>
      <h1 class="doc-h1">{{ currentTemplate.name }}</h1>
      <p class="doc-lede">{{ currentTemplate.description }}</p>
      <div class="doc-meta">
        <Badge tone="accent">{{ currentTemplate.tagline }}</Badge>
        <Badge>Full page</Badge>
        <Badge v-for="p in currentTemplate.parts" :key="p">{{ p }}</Badge>
      </div>
    </header>

    <div class="tpl-toolbar" style="display: flex; align-items: center; gap: 10px; margin-top: 24px">
      <span class="cs-mono cs-t-2xs cs-dimmer">{{ currentTemplate.slug }}.vue</span>
      <span class="cs-grow" />
      <Button size="sm" variant="secondary" @click="openFull(currentTemplate.slug)">
        <template #icon-left><Icon name="external" :size="12" /></template>
        Open full page
      </Button>
    </div>

    <div class="cs-card" style="margin-top: 16px; padding: 32px">
      <div class="site-stage" data-align="stretch">
        <div class="cs-stack" style="gap: 16px; width: 100%">
          <div class="cs-row" style="justify-content: space-between">
            <span class="cs-mono cs-t-xs cs-dimmer">{{ currentTemplate.name }} Preview</span>
            <Badge tone="accent">{{ currentTemplate.tagline }}</Badge>
          </div>
          <p class="cs-t-sm" style="color: var(--cs-text-secondary)">{{ currentTemplate.description }}</p>
        </div>
      </div>
    </div>

    <section class="doc-section">
      <h2 class="doc-h2">What it is doing</h2>
      <div class="prose">
        <ul>
          <li v-for="note in currentTemplate.notes" :key="note">{{ note }}</li>
        </ul>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Usage in Vue</h2>
      <div class="prose">
        <p>Compose with <code>@cesium-ds/core/vue</code> components:</p>
      </div>
      <div style="height: 12px" />
      <CodeBlock
        lang="vue"
        :code="`<script setup lang=&quot;ts&quot;>\nimport { ${currentTemplate.parts.join(', ')} } from '@cesium-ds/core/vue';\n<\/script>\n\n<template>\n  <!-- ${currentTemplate.name} layout -->\n</template>`"
      />
    </section>
  </div>

  <!-- Index mode -->
  <div v-else class="doc-container" style="padding-top: 56px">
    <header>
      <div class="doc-eyebrow">Templates</div>
      <h1 class="doc-h1">Pages, not components</h1>
      <p class="doc-lede">
        Whole screens assembled from the system — a homepage, a sign-in, a settings shell, an error page.
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
        </div>
      </div>
    </div>
  </div>
</template>
