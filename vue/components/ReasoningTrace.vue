<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue';
import { cx } from '../lib/cx';
import type { TraceStep } from '../types';
import Icon from './Icon.vue';

/**
 * The steps an agent took before it answered. Collapsible, but open while a
 * step is still running — a trace you have to click to watch is a trace nobody
 * watches.
 */
const props = withDefaults(
  defineProps<{
    steps: TraceStep[];
    title?: string;
    /** Right-hand caption. Defaults to the step count. */
    summary?: string;
    /** Controlled open state — `v-model:open`. Omit for uncontrolled. */
    open?: boolean;
    defaultOpen?: boolean;
  }>(),
  { title: 'Reasoning', defaultOpen: true },
);

const emit = defineEmits<{ 'update:open': [boolean] }>();

const instance = getCurrentInstance();
const isBound = () => Boolean(instance?.vnode.props && 'open' in instance.vnode.props);

const inner = ref(props.defaultOpen);
const isOpen = computed(() => (isBound() ? Boolean(props.open) : inner.value));
const running = computed(() => props.steps.some((s) => s.status === 'active'));
const caption = computed(() =>
  running.value ? 'running' : (props.summary ?? `${props.steps.length} steps`),
);

function toggle() {
  const next = !isOpen.value;
  if (!isBound()) inner.value = next;
  emit('update:open', next);
}
</script>

<template>
  <div :class="cx('cs-trace')" :data-open="isOpen">
    <button type="button" class="cs-trace__head" :aria-expanded="isOpen" @click="toggle">
      <Icon name="chevron-right" :size="10" />
      {{ title }}
      <span class="cs-trace__summary">{{ caption }}</span>
    </button>

    <ol v-if="isOpen" class="cs-trace__list">
      <li
        v-for="step in steps"
        :key="step.id"
        class="cs-trace__step"
        :data-status="step.status ?? 'done'"
      >
        <span class="cs-trace__dot" aria-hidden="true" />
        <span class="cs-trace__label">{{ step.label }}</span>
        <span v-if="step.time" class="cs-trace__time">{{ step.time }}</span>
        <span v-if="step.detail" class="cs-trace__detail">{{ step.detail }}</span>
      </li>
    </ol>
  </div>
</template>
