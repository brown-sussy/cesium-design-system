<script setup lang="ts">
import { cx } from '../lib/cx';
import { classOf, styleOf, withoutClassStyle } from '../lib/attrs';

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    label?: string;
    size?: 'sm' | 'md';
    disabled?: boolean;
  }>(),
  { size: 'md' },
);

const on = defineModel<boolean>({ default: false });
</script>

<template>
  <label :class="cx('cs-switch', size === 'sm' && 'cs-switch--sm', classOf($attrs))" :style="styleOf($attrs)">
    <input
      type="checkbox"
      role="switch"
      class="cs-switch__input"
      :checked="on"
      :disabled="disabled"
      v-bind="withoutClassStyle($attrs)"
      @change="on = ($event.target as HTMLInputElement).checked"
    />
    <span class="cs-switch__track" aria-hidden="true">
      <span class="cs-switch__thumb" />
    </span>
    <span v-if="label">{{ label }}</span>
  </label>
</template>
