<script setup lang="ts">
import { cx } from '../lib/cx';
import type { ButtonVariant } from '../types';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: 'sm' | 'md' | 'lg';
    block?: boolean;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  { variant: 'secondary', size: 'md', block: false, loading: false, type: 'button' },
);
</script>

<template>
  <button
    :type="type"
    :class="
      cx(
        'cs-btn',
        `cs-btn--${variant}`,
        size !== 'md' && `cs-btn--${size}`,
        block && 'cs-btn--block',
      )
    "
    :disabled="disabled || loading"
    :data-loading="loading || undefined"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="cs-btn__spinner" aria-hidden="true" />
    <span v-if="$slots['icon-left']" class="cs-btn__icon"><slot name="icon-left" /></span>
    <slot />
    <span v-if="$slots['icon-right']" class="cs-btn__icon"><slot name="icon-right" /></span>
  </button>
</template>
