<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue';
import { cx } from '../lib/cx';
import { usePopover } from '../lib/usePopover';
import { useValue } from '../lib/useValue';
import type { SelectOption } from '../types';
import Icon from './Icon.vue';

/**
 * A listbox drawn by the system, not by the operating system.
 *
 * The native `<select>` popup is the one surface a design system cannot style:
 * macOS and Windows each render their own menu, ignore tokens, and drop the
 * caret animation entirely. This replaces it with a teleported listbox that
 * keeps the parts that matter — `role="combobox"`, `aria-activedescendant`,
 * typeahead, form submission through a hidden input — and owns the rest.
 */
const props = withDefaults(
  defineProps<{
    options: SelectOption[];
    modelValue?: string;
    defaultValue?: string;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    invalid?: boolean;
    /** Adds a filter field at the top of the list. */
    searchable?: boolean;
    /** Posts the value with a native form via a hidden input. */
    name?: string;
    id?: string;
    /** Accessible name, when there is no visible Field label. */
    label?: string;
    emptyText?: string;
  }>(),
  { placeholder: 'Select…', size: 'md', emptyText: 'No matches' },
);

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const uid = useId();
const listId = `cs-select-list-${uid}`;
const optId = (i: number) => `cs-select-opt-${uid}-${i}`;

const { current, set } = useValue(
  () => props.modelValue,
  (value) => emit('update:modelValue', value),
  props.defaultValue ?? '',
);

const query = ref('');
const active = ref(-1);
const searchRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLDivElement | null>(null);
const typeahead = ref({ buf: '', at: 0 });

const { open, setOpen, triggerRef, panelRef, panelStyle } = usePopover({
  align: 'start',
  side: 'bottom',
  matchWidth: true,
  offset: 4,
});

const selected = computed(() => props.options.find((o) => o.value === current.value));
const needle = computed(() => query.value.trim().toLowerCase());
const visible = computed(() =>
  needle.value
    ? props.options.filter((o) => o.label.toLowerCase().includes(needle.value))
    : props.options,
);

const pickable = computed(() =>
  visible.value.reduce<number[]>((acc, o, i) => {
    if (!o.disabled) acc.push(i);
    return acc;
  }, []),
);

const activeId = computed(() =>
  active.value >= 0 && visible.value[active.value] ? optId(active.value) : undefined,
);

function commit(option: SelectOption) {
  if (option.disabled) return;
  set(option.value);
  setOpen(false);
  query.value = '';
  triggerRef.value?.focus();
}

function openList() {
  if (props.disabled) return;
  setOpen(true);
  const start = visible.value.findIndex((o) => o.value === current.value && !o.disabled);
  active.value = start >= 0 ? start : (pickable.value[0] ?? -1);
}

function move(step: 1 | -1) {
  const list = pickable.value;
  if (!list.length) return;
  const at = list.indexOf(active.value);
  active.value =
    at === -1
      ? step === 1
        ? list[0]
        : list[list.length - 1]
      : list[(at + step + list.length) % list.length];
}

function onKeyDown(e: KeyboardEvent) {
  if (!open.value) {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      openList();
    }
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    move(1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    move(-1);
  } else if (e.key === 'Home') {
    e.preventDefault();
    active.value = pickable.value[0] ?? -1;
  } else if (e.key === 'End') {
    e.preventDefault();
    active.value = pickable.value[pickable.value.length - 1] ?? -1;
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const option = visible.value[active.value];
    if (option) commit(option);
  } else if (e.key === 'Escape') {
    e.preventDefault();
    setOpen(false);
    triggerRef.value?.focus();
  } else if (e.key === 'Tab') {
    setOpen(false);
  } else if (e.key.length === 1 && !props.searchable && /\S/.test(e.key)) {
    // Typeahead — jump to the first label starting with the typed run.
    const now = Date.now();
    const t = typeahead.value;
    t.buf = now - t.at > 600 ? e.key : t.buf + e.key;
    t.at = now;
    const hit = visible.value.findIndex(
      (o) => !o.disabled && o.label.toLowerCase().startsWith(t.buf.toLowerCase()),
    );
    if (hit >= 0) active.value = hit;
  }
}

// Focus the filter field when the list opens in search mode.
watch(
  open,
  (isOpen) => {
    if (!isOpen) {
      query.value = '';
      return;
    }
    if (props.searchable) nextTick(() => searchRef.value?.focus({ preventScroll: true }));
  },
  { flush: 'post' },
);

// Keep the active row in view inside the panel.
watch([open, active], () => {
  if (!open.value || active.value < 0) return;
  const el = listRef.value?.querySelector<HTMLElement>(`[data-idx="${active.value}"]`);
  el?.scrollIntoView({ block: 'nearest' });
});

function onFilter(e: Event) {
  query.value = (e.target as HTMLInputElement).value;
  // The active index has to be measured against the *filtered* list — an index
  // into `options` points past the end of a narrowed list and Enter does
  // nothing.
  active.value = visible.value.findIndex((o) => !o.disabled);
}
</script>

<template>
  <div
    :class="cx('cs-selectbox')"
    :data-size="size"
    :data-open="open || undefined"
    :data-invalid="invalid || undefined"
    :data-disabled="disabled || undefined"
  >
    <input v-if="name" type="hidden" :name="name" :value="current" />

    <button
      ref="triggerRef"
      type="button"
      :id="id"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-controls="open ? listId : undefined"
      :aria-activedescendant="open ? activeId : undefined"
      :aria-label="label"
      :aria-invalid="invalid || undefined"
      :disabled="disabled"
      class="cs-selectbox__trigger"
      @click="open ? setOpen(false) : openList()"
      @keydown="onKeyDown"
    >
      <span class="cs-selectbox__value" :data-placeholder="!selected || undefined">
        {{ selected ? selected.label : placeholder }}
      </span>
      <span v-if="selected?.hint !== undefined" class="cs-selectbox__hint">{{ selected.hint }}</span>
      <Icon name="chevron-down" :size="13" class="cs-selectbox__caret" />
    </button>

    <Teleport v-if="open" to="body">
      <div
        ref="panelRef"
        class="cs-selectbox__panel"
        :data-size="size"
        :style="panelStyle"
        @keydown="onKeyDown"
      >
        <div v-if="searchable" class="cs-selectbox__search">
          <Icon name="search" :size="13" />
          <input
            ref="searchRef"
            :value="query"
            :placeholder="'Filter…'"
            aria-label="Filter options"
            :aria-controls="listId"
            :aria-activedescendant="activeId"
            class="cs-selectbox__input"
            @input="onFilter"
          />
        </div>

        <div
          ref="listRef"
          :id="listId"
          role="listbox"
          :aria-label="label"
          class="cs-selectbox__list cs-scroll"
          :tabindex="-1"
        >
          <div v-if="visible.length === 0" class="cs-selectbox__empty">{{ emptyText }}</div>
          <div
            v-for="(option, i) in visible"
            :id="optId(i)"
            :key="option.value"
            :data-idx="i"
            role="option"
            :aria-selected="option.value === current"
            :aria-disabled="option.disabled || undefined"
            :data-active="i === active || undefined"
            :data-selected="option.value === current || undefined"
            class="cs-selectbox__option"
            @pointerenter="!option.disabled && (active = i)"
            @pointerdown.prevent
            @click="commit(option)"
          >
            <span class="cs-selectbox__check" aria-hidden="true">
              <Icon v-if="option.value === current" name="check" :size="12" />
            </span>
            <span class="cs-selectbox__option-label">{{ option.label }}</span>
            <span v-if="option.hint !== undefined" class="cs-selectbox__option-hint">
              {{ option.hint }}
            </span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
