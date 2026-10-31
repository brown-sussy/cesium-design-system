<script setup lang="ts">
import type { ButtonVariant } from '../types';
import Button from './Button.vue';

withDefaults(
  defineProps<{
    /** Accessible name — icon-only controls must be labelled. */
    label: string;
    variant?: ButtonVariant;
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  { variant: 'ghost', size: 'md', loading: false, type: 'button' },
);
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :type="type"
    :aria-label="label"
    class="cs-btn--icon"
  >
    <span class="cs-btn__icon"><slot /></span>
  </Button>
</template>
