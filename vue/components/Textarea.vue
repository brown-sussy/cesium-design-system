<script setup lang="ts">
import { computed, ref } from 'vue';
import { cx } from '../lib/cx';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    invalid?: boolean;
    mono?: boolean;
    rows?: number;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  { rows: 4, invalid: false, mono: false },
);

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const inner = ref('');
const text = computed(() => props.modelValue ?? inner.value);

function onInput(e: Event) {
  const next = (e.target as HTMLTextAreaElement).value;
  if (props.modelValue === undefined) inner.value = next;
  emit('update:modelValue', next);
}
</script>

<template>
  <textarea
    :rows="rows"
    :class="cx('cs-textarea', mono && 'cs-textarea--mono')"
    :data-invalid="invalid || undefined"
    :aria-invalid="invalid || undefined"
    :value="text"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="onInput"
  />
</template>
