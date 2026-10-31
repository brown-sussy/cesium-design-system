<script setup lang="ts">
import { getCurrentInstance, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import { cx } from '../lib/cx';
import { usePopover, type PopoverAlign, type PopoverSide } from '../lib/usePopover';

/**
 * A trigger with a floating panel of arbitrary content.
 *
 * The distinction from `Menu`: a Menu is a list of actions on one object and
 * owns its own keyboard model. A Dropdown is a surface — it holds whatever you
 * put in it and hands focus to the first control. Use Dropdown for filters,
 * mini forms and detail popovers; use Menu for verbs.
 */
const props = withDefaults(
  defineProps<{
    /** Accessible name for the panel and the trigger. */
    label?: string;
    align?: PopoverAlign;
    side?: PopoverSide;
    /** Minimum panel width in px. */
    width?: number;
    /** Panel takes the trigger's width — use for filter fields that mirror an input. */
    matchWidth?: boolean;
    /** Controlled open state — `v-model:open`. Omit for uncontrolled. */
    open?: boolean;
    /**
     * Any descendant carrying `data-dropdown-close` closes the panel when
     * clicked. Use it on the primary action inside the panel.
     */
    closeOnAction?: boolean;
    disabled?: boolean;
    panelClass?: string;
  }>(),
  { align: 'start', side: 'bottom', closeOnAction: true, disabled: false },
);

const emit = defineEmits<{ 'update:open': [boolean] }>();

const uid = useId();
const panelId = `cs-dropdown-${uid}`;

// `open` is a Boolean prop, so Vue would hand us `false` for an absent one.
// Look at the vnode instead: only a bound prop counts as controlled.
const instance = getCurrentInstance();
const isBound = () => Boolean(instance?.vnode.props && 'open' in instance.vnode.props);

const { open, setOpen, triggerRef, panelRef, panelStyle, box } = usePopover({
  align: props.align,
  side: props.side,
  minWidth: () => props.width,
  matchWidth: props.matchWidth,
  open: () => (isBound() ? props.open : undefined),
  onOpenChange: (value) => emit('update:open', value),
});

const restore = ref(false);

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

// Hand focus to the first control so keyboard users land inside the panel.
watch(
  open,
  async (isOpen) => {
    if (!isOpen) {
      if (restore.value) {
        triggerRef.value?.focus();
        restore.value = false;
      }
      return;
    }
    await nextTick();
    const panel = panelRef.value;
    if (!panel) return;
    const first = panel.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel).focus({ preventScroll: true });
  },
  { flush: 'post' },
);

// Esc closes from anywhere inside the panel, including nested inputs.
function onKey(e: KeyboardEvent) {
  if (e.key !== 'Escape') return;
  e.stopPropagation();
  restore.value = true;
  setOpen(false);
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('keydown', onKey, true);
  else document.removeEventListener('keydown', onKey, true);
});

onBeforeUnmount(() => document.removeEventListener('keydown', onKey, true));

function onPanelClick(e: MouseEvent) {
  if (!props.closeOnAction) return;
  if ((e.target as HTMLElement).closest('[data-dropdown-close]')) {
    restore.value = true;
    setOpen(false);
  }
}

function onTriggerKeyDown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setOpen(true);
  } else if (e.key === 'Escape' && open.value) {
    e.preventDefault();
    restore.value = true;
    setOpen(false);
  }
}
</script>

<template>
  <button
    ref="triggerRef"
    type="button"
    :class="cx('cs-dropdown__trigger')"
    aria-haspopup="dialog"
    :aria-expanded="open"
    :aria-controls="open ? panelId : undefined"
    :aria-label="label"
    :disabled="disabled"
    :data-open="open || undefined"
    @click="setOpen(!open)"
    @keydown="onTriggerKeyDown"
  >
    <slot name="trigger" />
  </button>

  <Teleport v-if="open" to="body">
    <div
      ref="panelRef"
      :id="panelId"
      role="dialog"
      :aria-label="label"
      :tabindex="-1"
      :class="cx('cs-dropdown__panel', 'cs-scroll', panelClass)"
      :data-align="align"
      :data-side="box?.placement"
      :style="panelStyle"
      @click="onPanelClick"
    >
      <slot />
    </div>
  </Teleport>
</template>
