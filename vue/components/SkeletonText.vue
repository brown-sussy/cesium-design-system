<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(defineProps<{ lines?: number }>(), { lines: 3 });
</script>

<template>
  <span :class="cx('cs-stack')" :style="{ gap: 'var(--cs-space-8)' }" aria-hidden="true">
    <span
      v-for="i in lines"
      :key="i"
      class="cs-skeleton cs-skeleton--text"
      :style="{ width: i === lines ? '62%' : '100%' }"
    />
  </span>
</template>
