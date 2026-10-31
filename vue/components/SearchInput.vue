<script setup lang="ts">
import { computed, ref } from 'vue';
import Icon from './Icon.vue';
import Input from './Input.vue';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    invalid?: boolean;
    disabled?: boolean;
  }>(),
  { placeholder: 'Search…', size: 'md' },
);

const emit = defineEmits<{ 'update:modelValue': [string]; clear: [] }>();

const inner = ref('');
const text = computed(() => props.modelValue ?? inner.value);

function onUpdate(next: string) {
  if (props.modelValue === undefined) inner.value = next;
  emit('update:modelValue', next);
}

function clear() {
  if (props.modelValue === undefined) inner.value = '';
  emit('update:modelValue', '');
  emit('clear');
}
</script>

<template>
  <Input
    type="search"
    :size="size"
    :invalid="invalid"
    :disabled="disabled"
    :placeholder="placeholder"
    :model-value="text"
    @update:model-value="onUpdate"
  >
    <template #prefix><Icon name="search" :size="14" /></template>
    <template v-if="text" #suffix>
      <button
        type="button"
        aria-label="Clear search"
        :style="{
          display: 'inline-flex',
          background: 'none',
          border: 0,
          color: 'inherit',
          cursor: 'pointer',
        }"
        @click="clear"
      >
        <Icon name="close" :size="12" />
      </button>
    </template>
  </Input>
</template>
