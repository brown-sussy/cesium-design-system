<script setup lang="ts">
import { cx } from '../lib/cx';
import type { RadioOption } from '../types';
import Radio from './Radio.vue';

withDefaults(
  defineProps<{
    name: string;
    options: RadioOption[];
    direction?: 'row' | 'column';
  }>(),
  { direction: 'column' },
);

/** The group owns the value; each `Radio` only reports its own. */
const selected = defineModel<string>();
</script>

<template>
  <div
    role="radiogroup"
    :class="cx('cs-stack')"
    :style="{ gap: 'var(--cs-space-8)', flexDirection: direction }"
  >
    <Radio
      v-for="opt in options"
      :key="opt.value"
      :name="name"
      :value="opt.value"
      :label="opt.label"
      :disabled="opt.disabled"
      v-model="selected"
    />
  </div>
</template>
