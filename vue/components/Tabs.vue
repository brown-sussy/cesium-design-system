<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import { useIndicator } from '../lib/useIndicator';
import type { TabItem } from '../types';

const props = withDefaults(
  defineProps<{
    items: TabItem[];
    modelValue: string;
    variant?: 'underline' | 'enclosed';
    ariaLabel?: string;
  }>(),
  { variant: 'underline' },
);

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const underline = computed(() => props.variant === 'underline');
const { ref: rootRef, box } = useIndicator(() => props.modelValue);
</script>

<template>
  <div
    ref="rootRef"
    role="tablist"
    :data-indicator="underline && box ? 'on' : 'off'"
    :class="cx('cs-tabs', variant === 'enclosed' && 'cs-tabs--enclosed')"
    :aria-label="ariaLabel"
  >
    <span
      v-if="underline && box"
      class="cs-tabs__indicator"
      aria-hidden="true"
      :style="{ transform: `translateX(${box.x}px)`, width: `${box.w}px` }"
    />
    <button
      v-for="item in items"
      :key="item.id"
      role="tab"
      type="button"
      :aria-selected="modelValue === item.id"
      :data-active="modelValue === item.id"
      class="cs-tabs__tab"
      @click="emit('update:modelValue', item.id)"
    >
      <slot name="icon" :item="item" />
      {{ item.label }}
      <span v-if="item.count !== undefined" class="cs-tabs__count">{{ item.count }}</span>
    </button>
  </div>
</template>
