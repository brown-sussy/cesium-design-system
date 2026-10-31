<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue';
import { cx } from '../lib/cx';
import { usePopover } from '../lib/usePopover';
import type { IconName } from '../lib/icons';
import type { MenuEntry, MenuItem } from '../types';
import Icon from './Icon.vue';
import Kbd from './Kbd.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    items: MenuEntry[];
    /** Accessible name. Also the default trigger text. */
    label?: string;
    icon?: IconName;
    /** Which trigger edge the menu aligns to. */
    align?: 'start' | 'end';
    /** Minimum menu width in px. Defaults to the trigger width. */
    width?: number;
    disabled?: boolean;
  }>(),
  { align: 'start', disabled: false },
);

const emit = defineEmits<{ select: [MenuItem] }>();

const uid = useId();
const menuId = `cs-menu-${uid}`;

const active = ref(-1);
const itemRefs = ref<Array<HTMLButtonElement | null>>([]);

const { open, setOpen, box, triggerRef, panelRef, panelStyle } = usePopover({
  align: props.align,
  minWidth: () => props.width,
});

const isItem = (entry: MenuEntry): entry is MenuItem =>
  typeof entry === 'object' && entry !== null && 'id' in entry;

/** Indexes into `items` that can receive focus, in order. */
const nav = computed(() =>
  props.items.reduce<number[]>((acc, entry, i) => {
    if (isItem(entry) && !entry.disabled) acc.push(i);
    return acc;
  }, []),
);

function close(refocus = true) {
  setOpen(false);
  active.value = -1;
  if (refocus) triggerRef.value?.focus();
}

function setItemRef(el: unknown, i: number) {
  itemRefs.value[i] = el as HTMLButtonElement | null;
}

watch(open, (isOpen) => {
  if (!isOpen) active.value = -1;
});

watch([open, active], async () => {
  if (!open.value) return;
  await nextTick();
  const target = nav.value[active.value] ?? nav.value[0];
  if (target !== undefined) itemRefs.value[target]?.focus();
});

function move(step: 1 | -1) {
  const list = nav.value;
  if (!list.length) return;
  const current = active.value >= 0 && active.value < list.length ? active.value : -1;
  active.value =
    current === -1 ? (step === 1 ? 0 : list.length - 1) : (current + step + list.length) % list.length;
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    move(1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    move(-1);
  } else if (e.key === 'Home') {
    e.preventDefault();
    active.value = 0;
  } else if (e.key === 'End') {
    e.preventDefault();
    active.value = nav.value.length - 1;
  } else if (e.key === 'Escape') {
    e.preventDefault();
    close();
  } else if (e.key === 'Tab') {
    close(false);
  }
}

function onTriggerKeyDown(e: KeyboardEvent) {
  if (props.disabled) return;
  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setOpen(true);
    active.value = 0;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    setOpen(true);
    active.value = nav.value.length - 1;
  } else if (e.key === 'Escape' && open.value) {
    e.preventDefault();
    close();
  }
}

function pick(item: MenuItem) {
  emit('select', item);
  close();
}
</script>

<template>
  <button
    ref="triggerRef"
    type="button"
    :class="cx('cs-menu__trigger')"
    aria-haspopup="menu"
    :aria-expanded="open"
    :aria-controls="open ? menuId : undefined"
    :aria-label="label ?? ($slots.trigger ? 'Menu' : undefined)"
    :disabled="disabled"
    :data-open="open || undefined"
    v-bind="$attrs"
    @click="open ? close() : (setOpen(true), (active = 0))"
    @keydown="onTriggerKeyDown"
  >
    <slot name="trigger">
      <Icon v-if="icon" :name="icon" :size="14" />
      <span v-if="label" class="cs-menu__trigger-label">{{ label }}</span>
      <Icon name="chevron-down" :size="12" class="cs-menu__caret" />
    </slot>
  </button>

  <Teleport v-if="open" to="body">
    <div
      ref="panelRef"
      :id="menuId"
      role="menu"
      :aria-label="label"
      class="cs-menu__list cs-scroll"
      :data-up="box?.placement === 'top' || undefined"
      :data-align="align"
      :style="panelStyle"
      @keydown="onKeyDown"
    >
      <template v-for="(entry, i) in items" :key="isItem(entry) ? entry.id : `entry-${i}`">
        <div v-if="entry === 'separator'" class="cs-menu__sep" role="separator" />
        <div v-else-if="!isItem(entry)" class="cs-menu__header" role="presentation">
          {{ entry.header }}
        </div>
        <button
          v-else
          :ref="(el) => setItemRef(el, i)"
          type="button"
          :role="entry.checked === undefined ? 'menuitem' : 'menuitemcheckbox'"
          :aria-checked="entry.checked"
          :tabindex="-1"
          :disabled="entry.disabled"
          class="cs-menu__item"
          :data-danger="entry.danger || undefined"
          :data-active="nav[active] === i || undefined"
          @click="pick(entry)"
          @pointerenter="!entry.disabled && (active = nav.indexOf(i))"
        >
          <span class="cs-menu__icon" aria-hidden="true">
            <Icon v-if="entry.checked" name="check" :size="13" />
            <Icon v-else-if="entry.icon" :name="entry.icon" :size="13" />
          </span>
          <span class="cs-menu__label">{{ entry.label }}</span>
          <Kbd v-if="entry.shortcut" class="cs-menu__shortcut">{{ entry.shortcut }}</Kbd>
        </button>
      </template>
    </div>
  </Teleport>
</template>
