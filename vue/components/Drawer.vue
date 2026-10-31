<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue';
import { cx } from '../lib/cx';
import Icon from './Icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    open: boolean;
    title?: string;
    width?: number;
  }>(),
  { width: 420 },
);

const emit = defineEmits<{ close: [] }>();

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close');
}

let teardown: (() => void) | undefined;

watch(
  () => props.open,
  (open) => {
    teardown?.();
    teardown = undefined;
    if (!open) return;
    document.addEventListener('keydown', onKey);
    teardown = () => document.removeEventListener('keydown', onKey);
  },
  { immediate: true },
);

onBeforeUnmount(() => teardown?.());
</script>

<template>
  <Teleport v-if="open" to="body">
    <div class="cs-overlay cs-overlay--drawer" @mousedown="$event.target === $event.currentTarget && emit('close')">
      <aside
        :class="cx('cs-drawer')"
        role="dialog"
        aria-modal="true"
        :style="{ '--cs-drawer-w': `${width}px` }"
        v-bind="$attrs"
      >
        <div class="cs-drawer__header">
          <div class="cs-drawer__title">{{ title }}</div>
          <button
            type="button"
            class="cs-modal__close"
            aria-label="Close"
            style="position: static"
            @click="emit('close')"
          >
            <Icon name="close" :size="14" />
          </button>
        </div>
        <div class="cs-drawer__body"><slot /></div>
        <div v-if="$slots.footer" class="cs-drawer__footer"><slot name="footer" /></div>
      </aside>
    </div>
  </Teleport>
</template>
