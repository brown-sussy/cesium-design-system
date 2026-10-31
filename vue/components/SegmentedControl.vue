<script setup lang="ts">
import { cx } from '../lib/cx';
import { useIndicator } from '../lib/useIndicator';
import type { SegmentedOption } from '../types';

const props = withDefaults(
  defineProps<{
    options: SegmentedOption[];
    modelValue: string;
    accent?: boolean;
    block?: boolean;
  }>(),
  { accent: false, block: false },
);

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const { ref: rootRef, box } = useIndicator(() => props.modelValue);
</script>

<template>
  <div
    ref="rootRef"
    role="tablist"
    :data-indicator="box ? 'on' : 'off'"
    :class="cx('cs-segmented', accent && 'cs-segmented--accent', block && 'cs-segmented--block')"
  >
    <span
      v-if="box"
      class="cs-segmented__thumb"
      aria-hidden="true"
      :style="{ transform: `translateX(${box.x}px)`, width: `${box.w}px` }"
    />
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      role="tab"
      :aria-selected="modelValue === opt.value"
      :data-active="modelValue === opt.value"
      :disabled="opt.disabled"
      class="cs-segmented__item"
      @click="emit('update:modelValue', opt.value)"
    >
      <slot name="icon" :option="opt" />
      {{ opt.label }}
    </button>
  </div>
</template>
