<script setup lang="ts">
import { cx } from '../lib/cx';
import { classOf, withoutClassStyle } from '../lib/attrs';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
    size?: 'sm' | 'md';
    disabled?: boolean;
  }>(),
  { size: 'md', modelValue: false },
);

const emit = defineEmits<{ 'update:modelValue': [boolean] }>();

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked);
}
</script>

<template>
  <label :class="cx('cs-switch', size === 'sm' && 'cs-switch--sm', classOf($attrs))">
    <input
      type="checkbox"
      role="switch"
      class="cs-switch__input"
      :checked="modelValue"
      :disabled="disabled"
      v-bind="withoutClassStyle($attrs)"
      @change="onChange"
    />
    <span class="cs-switch__track" aria-hidden="true">
      <span class="cs-switch__thumb" />
    </span>
    <span v-if="label">{{ label }}</span>
  </label>
</template>
