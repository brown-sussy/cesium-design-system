<script setup lang="ts">
import { cx } from '../lib/cx';
import Sparkline from './Sparkline.vue';

withDefaults(
  defineProps<{
    label: string;
    value: string | number;
    unit?: string;
    delta?: { value: string; direction?: 'up' | 'down' | 'flat'; label?: string };
    spark?: number[];
    size?: 'sm' | 'md';
  }>(),
  { size: 'md' },
);
</script>

<template>
  <div :class="cx('cs-stat', size === 'sm' && 'cs-stat--sm')">
    <div class="cs-stat__label">{{ label }}</div>
    <div class="cs-stat__value">
      {{ value }}
      <span v-if="unit" class="cs-stat__unit">{{ unit }}</span>
    </div>
    <div v-if="delta || spark" class="cs-stat__foot">
      <span
        v-if="delta"
        :class="
          cx(
            'cs-stat__delta',
            (delta.direction ?? 'flat') === 'up' && 'cs-stat__delta--up',
            (delta.direction ?? 'flat') === 'down' && 'cs-stat__delta--down',
          )
        "
      >
        <span v-if="(delta.direction ?? 'flat') !== 'flat'" class="cs-stat__arrow" aria-hidden="true">
          {{ delta.direction === 'up' ? '▲' : '▼' }}
        </span>
        {{ delta.value }}
        <span v-if="delta.label" class="cs-dimmer">{{ delta.label }}</span>
      </span>
      <Sparkline
        v-if="spark"
        :data="spark"
        :width="72"
        :height="18"
        :area="false"
        class="cs-grow"
      />
    </div>
  </div>
</template>
