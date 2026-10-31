<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import Icon from './Icon.vue';

const props = withDefaults(
  defineProps<{
    page: number;
    pageCount: number;
    showMeta?: boolean;
    total?: number;
    pageSize?: number;
  }>(),
  { showMeta: false },
);

const emit = defineEmits<{ 'update:page': [number] }>();

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const pages = computed<Array<number | 'gap'>>(() => {
  const { page, pageCount } = props;
  if (pageCount <= 7) return range(1, pageCount);
  if (page <= 4) return [...range(1, 5), 'gap', pageCount];
  if (page >= pageCount - 3) return [1, 'gap', ...range(pageCount - 4, pageCount)];
  return [1, 'gap', page - 1, page, page + 1, 'gap', pageCount];
});
</script>

<template>
  <nav :class="cx('cs-pagination')" aria-label="Pagination">
    <button
      type="button"
      class="cs-pagination__btn"
      aria-label="Previous page"
      :disabled="page <= 1"
      @click="emit('update:page', page - 1)"
    >
      <Icon name="chevron-left" :size="12" />
    </button>
    <template v-for="(p, i) in pages" :key="`${p}-${i}`">
      <span v-if="p === 'gap'" class="cs-pagination__gap">…</span>
      <button
        v-else
        type="button"
        class="cs-pagination__btn"
        :aria-current="p === page ? 'page' : undefined"
        :data-active="p === page"
        @click="emit('update:page', p)"
      >
        {{ p }}
      </button>
    </template>
    <button
      type="button"
      class="cs-pagination__btn"
      aria-label="Next page"
      :disabled="page >= pageCount"
      @click="emit('update:page', page + 1)"
    >
      <Icon name="chevron-right" :size="12" />
    </button>
    <span v-if="showMeta && total !== undefined" class="cs-pagination__meta">
      {{ total.toLocaleString('en-US') }} records{{ pageSize ? ` · ${pageSize}/page` : '' }}
    </span>
  </nav>
</template>
