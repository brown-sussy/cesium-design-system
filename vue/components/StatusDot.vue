<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(
  defineProps<{
    tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
    label?: string;
    pulse?: boolean;
  }>(),
  { tone: 'neutral', pulse: false },
);
</script>

<template>
  <span
    :class="cx('cs-status', tone !== 'neutral' && `cs-status--${tone}`, pulse && 'cs-status--pulse')"
  >
    <span class="cs-status__dot" aria-hidden="true" />
    <span v-if="label">{{ label }}</span>
  </span>
</template>
