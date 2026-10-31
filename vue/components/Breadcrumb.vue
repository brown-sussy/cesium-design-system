<script setup lang="ts">
import { cx } from '../lib/cx';
import type { BreadcrumbItem } from '../types';

withDefaults(
  defineProps<{
    items: BreadcrumbItem[];
    separator?: string;
  }>(),
  { separator: '/' },
);

const emit = defineEmits<{ navigate: [BreadcrumbItem, number] }>();
</script>

<template>
  <nav :class="cx('cs-breadcrumb')" aria-label="Breadcrumb">
    <template v-for="(item, i) in items" :key="i">
      <span v-if="i > 0" class="cs-breadcrumb__sep" aria-hidden="true">{{ separator }}</span>
      <a
        v-if="item.href"
        class="cs-breadcrumb__item"
        :href="item.href"
        :data-current="i === items.length - 1 || undefined"
      >
        {{ item.label }}
      </a>
      <button
        v-else-if="i < items.length - 1"
        type="button"
        class="cs-breadcrumb__item"
        :style="{
          background: 'none',
          border: 0,
          padding: 0,
          cursor: 'pointer',
          font: 'inherit',
        }"
        @click="emit('navigate', item, i)"
      >
        {{ item.label }}
      </button>
      <span
        v-else
        class="cs-breadcrumb__item"
        data-current
        aria-current="page"
      >
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>
