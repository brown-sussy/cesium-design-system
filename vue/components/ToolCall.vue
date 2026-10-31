<script setup lang="ts">
import { computed, ref } from 'vue';
import { cx } from '../lib/cx';
import type { ToolStatus } from '../types';
import Icon from './Icon.vue';

/**
 * One tool invocation. The header carries enough to read the call without
 * expanding it; the body is the raw payload.
 */
const props = withDefaults(
  defineProps<{
    name: string;
    args?: Record<string, string | number | boolean>;
    status?: ToolStatus;
    /** Returned payload — a plain string is printed as-is in the mono body. */
    result?: string;
    duration?: string;
    defaultOpen?: boolean;
  }>(),
  { status: 'done', defaultOpen: false },
);

const open = ref(props.defaultOpen);

const argLine = computed(() =>
  props.args
    ? Object.entries(props.args)
        .map(([k, v]) => `${k}=${typeof v === 'string' ? `"${v}"` : v}`)
        .join(' · ')
    : undefined,
);
</script>

<template>
  <div :class="cx('cs-tool')" :data-status="status" :data-open="open">
    <div class="cs-tool__head">
      <Icon name="terminal" :size="12" class="cs-tool__icon" />
      <span class="cs-tool__name">{{ name }}</span>
      <span v-if="argLine" class="cs-tool__args">{{ argLine }}</span>
      <span class="cs-tool__meta">
        <span v-if="duration">{{ duration }}</span>
        <span class="cs-tool__status" :data-status="status">{{ status }}</span>
        <button
          v-if="result !== undefined || $slots.result"
          type="button"
          class="cs-tool__toggle"
          :aria-expanded="open"
          :aria-label="open ? 'Hide result' : 'Show result'"
          @click="open = !open"
        >
          <Icon name="chevron-down" :size="10" />
        </button>
      </span>
    </div>

    <div v-if="open && (result !== undefined || $slots.result)" class="cs-tool__body">
      <slot name="result">{{ result }}</slot>
    </div>
  </div>
</template>
