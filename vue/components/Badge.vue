<script setup lang="ts">
import { cx } from '../lib/cx';
import type { Tone } from '../types';

withDefaults(
  defineProps<{
    tone?: Tone;
    dot?: boolean;
    solid?: boolean;
  }>(),
  { tone: 'neutral', dot: false, solid: false },
);
</script>

<template>
  <span
    :class="cx('cs-badge', tone !== 'neutral' && `cs-badge--${tone}`, solid && 'cs-badge--solid')"
  >
    <span v-if="dot" class="cs-badge__dot" aria-hidden="true" />
    <slot />
  </span>
</template>
