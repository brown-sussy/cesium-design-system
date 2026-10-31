<script setup lang="ts">
import { cx } from '../lib/cx';

/** Three dots and a mono caption — what the surface does while it waits. */
withDefaults(defineProps<{ label?: string }>(), { label: 'Generating' });
</script>

<template>
  <div :class="cx('cs-typing')" role="status" aria-live="polite">
    <span class="cs-typing__dots" aria-hidden="true">
      <i /><i /><i />
    </span>
    {{ label }}
  </div>
</template>
