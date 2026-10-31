<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '../../vue';
import CodeBlock from './CodeBlock.vue';

/**
 * Preview / Code pair — the same markup the React docs use, so an example
 * looks identical on both sites and the shared `.preview` styles apply.
 *
 * The component passed in is the demo itself and the string is that demo's own
 * source, so the two panes cannot disagree.
 */
withDefaults(
  defineProps<{
    component?: object | null;
    code: string;
    align?: 'center' | 'start' | 'stretch';
    minHeight?: number;
  }>(),
  { align: 'center' },
);

const view = ref<'preview' | 'code'>('preview');
const grid = ref(true);
</script>

<template>
  <div class="preview">
    <div class="preview__toolbar">
      <span class="preview__toolbar-label">Live</span>
      <div class="preview__toolbar-spacer" />
      <button v-if="view === 'preview'" type="button" class="preview__tab" @click="grid = !grid">
        <Icon name="grid" :size="11" />
        {{ grid ? 'Grid' : 'Plain' }}
      </button>
      <button
        type="button"
        class="preview__tab"
        :data-active="view === 'preview'"
        @click="view = 'preview'"
      >
        Preview
      </button>
      <button
        type="button"
        class="preview__tab"
        :data-active="view === 'code'"
        @click="view = 'code'"
      >
        Code
      </button>
    </div>

    <div
      v-if="view === 'preview'"
      class="preview__stage"
      :data-bg="grid ? 'grid' : 'plain'"
      :data-align="align"
      :style="minHeight ? { minHeight: `${minHeight}px` } : undefined"
    >
      <component :is="component" v-if="component" />
      <span v-else class="site-empty">Demo loading…</span>
    </div>
    <div v-else class="preview__code">
      <CodeBlock :code="code" :show-head="false" />
    </div>
  </div>
</template>
