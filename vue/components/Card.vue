<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(
  defineProps<{
    interactive?: boolean;
    accent?: boolean;
    flush?: boolean;
  }>(),
  { interactive: false, accent: false, flush: false },
);
</script>

<template>
  <div
    :class="
      cx(
        'cs-card',
        interactive && 'cs-card--interactive',
        accent && 'cs-card--accent',
        flush && 'cs-card--flush',
      )
    "
  >
    <slot />
  </div>
</template>
