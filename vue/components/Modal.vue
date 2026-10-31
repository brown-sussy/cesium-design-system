<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import { cx } from '../lib/cx';
import Icon from './Icon.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    open: boolean;
    title?: string;
    description?: string;
    width?: number;
    hideClose?: boolean;
    closeOnOverlay?: boolean;
  }>(),
  { width: 480, hideClose: false, closeOnOverlay: true },
);

const emit = defineEmits<{ close: [] }>();

const panelRef = ref<HTMLDivElement | null>(null);

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close');
}

// Vue's watch has no return-value cleanup (that is React); the teardown has to
// be held and called by hand, or the scroll lock outlives the dialog.
let teardown: (() => void) | undefined;

watch(
  () => props.open,
  (open) => {
    teardown?.();
    teardown = undefined;
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(() => panelRef.value?.focus());

    teardown = () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  },
  { immediate: true },
);

onBeforeUnmount(() => teardown?.());
</script>

<template>
  <Teleport v-if="open" to="body">
    <div
      class="cs-overlay"
      @mousedown="closeOnOverlay && $event.target === $event.currentTarget && emit('close')"
    >
      <div
        ref="panelRef"
        :class="cx('cs-modal')"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'cs-modal-title' : undefined"
        :tabindex="-1"
        :style="{ '--cs-modal-w': `${width}px` }"
        v-bind="$attrs"
      >
        <div v-if="title || !hideClose" class="cs-modal__header">
          <h2 v-if="title" id="cs-modal-title" class="cs-modal__title">{{ title }}</h2>
          <p v-if="description" class="cs-modal__desc">{{ description }}</p>
          <button v-if="!hideClose" type="button" class="cs-modal__close" aria-label="Close" @click="emit('close')">
            <Icon name="close" :size="14" />
          </button>
        </div>
        <div v-if="$slots.default" class="cs-modal__body"><slot /></div>
        <div v-if="$slots.footer" class="cs-modal__footer"><slot name="footer" /></div>
      </div>
    </div>
  </Teleport>
</template>
