<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
    /** Inherit the surrounding text colour instead of the accent. */
    inherit?: boolean;
  }>(),
  { size: 'md', inherit: false },
);
</script>

<template>
  <span
    role="status"
    aria-label="Loading"
    :class="cx('cs-spinner', size !== 'md' && `cs-spinner--${size}`, inherit && 'cs-spinner--accent')"
  />
</template>
