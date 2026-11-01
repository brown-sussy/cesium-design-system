<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(
  defineProps<{
    invalid?: boolean;
    mono?: boolean;
    rows?: number;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  { rows: 4, invalid: false, mono: false },
);

/**
 * `defineModel` keeps its own copy of the value, so the separate `inner` ref the
 * port needed for the unbound case is gone: writing to the model updates the
 * field whether or not the caller is listening.
 */
const text = defineModel<string>({ default: '' });
</script>

<template>
  <textarea
    v-model="text"
    :rows="rows"
    :class="cx('cs-textarea', mono && 'cs-textarea--mono')"
    :data-invalid="invalid || undefined"
    :aria-invalid="invalid || undefined"
    :disabled="disabled"
    :placeholder="placeholder"
  />
</template>
