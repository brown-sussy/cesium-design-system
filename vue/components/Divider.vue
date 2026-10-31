<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(defineProps<{ orientation?: 'horizontal' | 'vertical' }>(), {
  orientation: 'horizontal',
});
</script>

<template>
  <div v-if="$slots.default" :class="cx('cs-divider cs-divider--label')" role="separator">
    <slot />
  </div>
  <div
    v-else
    role="separator"
    :aria-orientation="orientation"
    :class="cx('cs-divider', orientation === 'vertical' && 'cs-divider--vertical')"
  />
</template>
