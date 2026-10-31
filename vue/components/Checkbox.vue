<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { cx } from '../lib/cx';
import { classOf, withoutClassStyle } from '../lib/attrs';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    label?: string;
    indeterminate?: boolean;
    disabled?: boolean;
  }>(),
  { modelValue: false, indeterminate: false },
);

const emit = defineEmits<{ 'update:modelValue': [boolean] }>();

const inputRef = ref<HTMLInputElement | null>(null);

// `indeterminate` is a DOM property with no attribute equivalent. It has to be
// written after the input exists, and again whenever the prop changes.
function syncIndeterminate() {
  if (inputRef.value) inputRef.value.indeterminate = Boolean(props.indeterminate);
}

onMounted(syncIndeterminate);
watch(() => props.indeterminate, syncIndeterminate, { flush: 'post' });

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).checked);
}
</script>

<template>
  <label :class="cx('cs-check', classOf($attrs))">
    <input
      ref="inputRef"
      type="checkbox"
      class="cs-check__input"
      :checked="modelValue"
      :disabled="disabled"
      v-bind="withoutClassStyle($attrs)"
      @change="onChange"
    />
    <span class="cs-check__box" aria-hidden="true" />
    <span v-if="label" class="cs-check__label">{{ label }}</span>
  </label>
</template>
