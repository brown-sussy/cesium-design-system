<script setup lang="ts">
import Icon from './Icon.vue';
import { cx } from '../lib/cx';
import { useIndicator } from '../lib/useIndicator';
import type { TabItem } from '../types';

withDefaults(
  defineProps<{
    items: TabItem[];
    variant?: 'underline' | 'enclosed';
    ariaLabel?: string;
  }>(),
  { variant: 'underline' },
);

/**
 * `defineModel` declares the prop and the `update:` emit in one line, so the
 * binding cannot drift out of step with the value the indicator measures.
 */
const model = defineModel<string>({ required: true });
const emit = defineEmits<{ change: [string] }>();

const { ref: rootRef, box } = useIndicator(() => model.value);

function select(id: string) {
  model.value = id;
  emit('change', id);
}
</script>

<template>
  <div
    ref="rootRef"
    role="tablist"
    :data-indicator="variant === 'underline' && box ? 'on' : 'off'"
    :class="cx('cs-tabs', variant === 'enclosed' && 'cs-tabs--enclosed')"
    :aria-label="ariaLabel"
  >
    <span
      v-if="variant === 'underline' && box"
      class="cs-tabs__indicator"
      aria-hidden="true"
      :style="{ transform: `translateX(${box.x}px)`, width: `${box.w}px` }"
    />
    <button
      v-for="item in items"
      :key="item.id"
      role="tab"
      type="button"
      :aria-selected="model === item.id"
      :data-active="model === item.id"
      class="cs-tabs__tab"
      @click="select(item.id)"
    >
      <slot name="icon" :item="item">
        <Icon v-if="item.icon" :name="item.icon" :size="13" />
      </slot>
      {{ item.label }}
      <span v-if="item.count !== undefined" class="cs-tabs__count">{{ item.count }}</span>
    </button>
  </div>
</template>
