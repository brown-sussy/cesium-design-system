<script setup lang="ts">
import { cx } from '../lib/cx';
import type { ButtonVariant } from '../types';

/**
 * The label and both icons are slots, not props.
 *
 * React passes `iconLeft={<Icon name="play" />}` because a ReactNode is just a
 * value. In Vue the node *is* a template, so the idiomatic form is
 * `<template #icon-left>`. Carrying it as a prop instead would mean `any`, a
 * runtime `typeof` check and a `<component :is>` fallback that nothing else in
 * the library needs.
 *
 * The wrappers are not decoration: `[data-loading] > :not(.cs-btn__spinner)`
 * dims them, and opacity cannot reach a bare text node.
 */
withDefaults(
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

defineSlots<{
  default?: () => unknown;
  'icon-left'?: () => unknown;
  'icon-right'?: () => unknown;
}>();
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
    <span v-if="$slots.default" class="cs-btn__label"><slot /></span>
    <span v-if="$slots['icon-right']" class="cs-btn__icon"><slot name="icon-right" /></span>
  </button>
</template>
