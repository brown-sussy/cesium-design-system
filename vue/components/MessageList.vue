<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(defineProps<{ label?: string }>(), { label: 'Conversation' });
</script>

<template>
  <ol :class="cx('cs-thread')" role="log" :aria-label="label">
    <slot />
  </ol>
</template>
