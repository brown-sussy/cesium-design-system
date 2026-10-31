<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { cx } from '../lib/cx';
import type { SidebarItem, SidebarSection } from '../types';
import Icon from './Icon.vue';

/**
 * The navigation spine of a data product: sections of rows, one active row,
 * optional folding, optional icon-rail mode.
 *
 * Everything is drawn here — the scroll container uses the system's own
 * scrollbar styling, collapsed labels use a teleported flyout rather than the
 * browser's `title` bubble, and the accent tick is measured from the active
 * row so it slides instead of being redrawn.
 */
const props = withDefaults(
  defineProps<{
    sections: SidebarSection[];
    /** Icon rail: 56px, labels hidden, flyout on hover. */
    collapsed?: boolean;
    /** Width in px. Defaults to the `sidebar-w` token. */
    width?: number;
    /** Show the travelling accent tick beside the active row. */
    rail?: boolean;
    /** Accessible name for the nav landmark. */
    label?: string;
  }>(),
  { collapsed: false, rail: true, label: 'Sections' },
);

const uid = useId();
const emit = defineEmits<{ select: [SidebarItem] }>();
const navRef = ref<HTMLElement | null>(null);
const tick = ref<{ top: number; height: number } | null>(null);
const fly = ref<{ top: number; left: number; label: string } | null>(null);

const folded = ref<Record<string, boolean>>(
  Object.fromEntries(
    props.sections.filter((s) => s.collapsible).map((s) => [s.id, s.defaultOpen ?? true]),
  ),
);

const allItems = computed(() =>
  props.sections.flatMap((s) => [
    ...(s.items ?? []),
    ...(s.groups ?? []).flatMap((g) => g.items),
  ]),
);

const activeId = computed(() => allItems.value.find((i) => i.active)?.id ?? '');
const hasIcons = computed(() => allItems.value.some((i) => i.icon));

// Re-measure only when the shape of the nav changes, not on every render.
const signature = computed(() =>
  props.sections
    .map(
      (s) =>
        `${s.id}:${(s.items ?? []).map((i) => `${i.id}${i.active ? '*' : ''}`).join(',')}` +
        `|${(s.groups ?? [])
          .map((g) => g.items.map((i) => `${i.id}${i.active ? '*' : ''}`).join(','))
          .join(';')}`,
    )
    .join('|'),
);

/**
 * The heading that owns a row: its group title, else its section title.
 * Both live as direct children of the wrappers the row sits in.
 */
function headingAbove(row: HTMLElement): HTMLElement | null {
  const group = row.closest<HTMLElement>('.cs-sidebar__group');
  const groupTitle = group?.querySelector<HTMLElement>(':scope > .cs-sidebar__group-title');
  if (groupTitle) return groupTitle;

  const section = row.closest<HTMLElement>('.cs-sidebar__section');
  return section?.querySelector<HTMLElement>(':scope > .cs-sidebar__title') ?? null;
}

// Only reveal the active row when the active row itself changes. Folding a
// section or resizing the window must not yank the nav back.
let revealed: string | null = null;
let cancelled = false;

function measure() {
  const nav = navRef.value;
  if (!nav || !props.rail || cancelled) return;

  const active = nav.querySelector<HTMLElement>('[data-sidebar-item][data-active="true"]');
  if (!active) {
    tick.value = null;
    return;
  }
  const a = active.getBoundingClientRect();
  const s = nav.getBoundingClientRect();
  tick.value = {
    top: a.top - s.top + nav.scrollTop + 7,
    height: Math.max(12, a.height - 14),
  };

  if (revealed === activeId.value) return;
  const first = revealed === null;
  revealed = activeId.value;

  const pad = 12;
  if (first) {
    // First paint parks the heading that owns the active row at the top of the
    // nav. Minimal scrolling would pin the row to the bottom edge and hide the
    // hierarchy it sits in — the reader lands on a stray label.
    const heading = headingAbove(active);
    const anchor = heading ?? active;
    const r = anchor.getBoundingClientRect();
    nav.scrollTop += r.top - s.top - (heading ? pad : (s.height - r.height) / 2);
  } else if (a.top < s.top + pad) {
    nav.scrollTop -= s.top + pad - a.top;
  } else if (a.bottom > s.bottom - pad) {
    nav.scrollTop += a.bottom - s.bottom + pad;
  }
}

let ro: ResizeObserver | undefined;
const onResize = () => measure();

onMounted(() => {
  measure();
  ro = new ResizeObserver(measure);
  if (navRef.value) ro.observe(navRef.value);
  window.addEventListener('resize', onResize);
  document.fonts?.ready.then(measure).catch(() => undefined);
});

onBeforeUnmount(() => {
  cancelled = true;
  ro?.disconnect();
  window.removeEventListener('resize', onResize);
});

watch([() => props.rail, signature, folded, activeId], () => measure());

watch(
  () => props.collapsed,
  (on) => {
    if (!on) fly.value = null;
  },
);

// A fixed flyout would go stale as soon as anything scrolls — the rail itself
// or the page behind it. Scroll doesn't bubble, so listen in the capture phase
// and catch every scroller at once.
function clearFly() {
  fly.value = null;
}

watch(fly, (f) => {
  if (f) {
    window.addEventListener('scroll', clearFly, { capture: true, passive: true });
    window.addEventListener('resize', clearFly);
  } else {
    window.removeEventListener('scroll', clearFly, { capture: true });
    window.removeEventListener('resize', clearFly);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', clearFly, { capture: true });
  window.removeEventListener('resize', clearFly);
});

function rows() {
  return Array.from(
    navRef.value?.querySelectorAll<HTMLElement>('[data-sidebar-item]') ?? [],
  ).filter(
    (el) => el.dataset.disabled !== 'true' && !el.closest('.cs-sidebar__fold[data-open="false"]'),
  );
}

function onKeyDown(e: KeyboardEvent) {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
  const list = rows();
  if (!list.length) return;
  const current = list.indexOf(document.activeElement as HTMLElement);
  let next = current;
  if (e.key === 'ArrowDown') next = current < 0 ? 0 : Math.min(list.length - 1, current + 1);
  else if (e.key === 'ArrowUp') next = current < 0 ? list.length - 1 : Math.max(0, current - 1);
  else if (e.key === 'Home') next = 0;
  else next = list.length - 1;
  e.preventDefault();
  list[next]?.focus();
  list[next]?.scrollIntoView({ block: 'nearest' });
}

function showFly(e: Event, text: string) {
  if (!props.collapsed) return;
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
  fly.value = { top: r.top + r.height / 2, left: r.right + 10, label: text };
}

function onRowClick(item: SidebarItem, e: Event) {
  if (item.disabled) {
    e.preventDefault();
    return;
  }
  emit('select', item);
}

function isOpen(section: SidebarSection) {
  return folded.value[section.id] ?? true;
}

function toggleSection(section: SidebarSection) {
  folded.value = { ...folded.value, [section.id]: !isOpen(section) };
}
</script>

<template>
  <aside
    :class="cx('cs-sidebar')"
    :data-collapsed="collapsed || undefined"
    :style="width ? { width: `${width}px` } : undefined"
  >
    <div v-if="$slots.header" class="cs-sidebar__header"><slot name="header" /></div>

    <nav
      ref="navRef"
      class="cs-sidebar__nav cs-scroll"
      :aria-label="label"
      @keydown="onKeyDown"
    >
      <span
        v-if="rail"
        class="cs-sidebar__tick"
        :data-on="tick ? 'true' : undefined"
        :style="tick ? { top: `${tick.top}px`, height: `${tick.height}px` } : undefined"
        aria-hidden="true"
      />

      <div v-for="section in sections" :key="section.id" class="cs-sidebar__section">
        <button
          v-if="section.title && section.collapsible"
          type="button"
          class="cs-sidebar__title cs-sidebar__title--button"
          :aria-expanded="isOpen(section)"
          :aria-controls="`${uid}-${section.id}`"
          @click="toggleSection(section)"
        >
          <span class="cs-sidebar__title-text">{{ section.title }}</span>
          <span v-if="section.count !== undefined" class="cs-sidebar__count">{{ section.count }}</span>
          <Icon name="chevron-down" :size="12" class="cs-sidebar__chevron" />
        </button>
        <a
          v-else-if="section.title && section.href"
          class="cs-sidebar__title cs-sidebar__title--link"
          :href="section.href"
        >
          <span class="cs-sidebar__title-text">{{ section.title }}</span>
          <span v-if="section.count !== undefined" class="cs-sidebar__count">{{ section.count }}</span>
        </a>
        <div v-else-if="section.title" class="cs-sidebar__title">
          <span class="cs-sidebar__title-text">{{ section.title }}</span>
          <span v-if="section.count !== undefined" class="cs-sidebar__count">{{ section.count }}</span>
        </div>

        <div
          class="cs-sidebar__fold"
          :id="`${uid}-${section.id}`"
          :data-open="!section.collapsible || isOpen(section) ? 'true' : 'false'"
        >
          <div class="cs-sidebar__items">
            <component
              :is="item.href ? 'a' : 'button'"
              v-for="item in section.items ?? []"
              :key="item.id"
              class="cs-sidebar__item"
              data-sidebar-item
              :data-active="item.active || undefined"
              :data-disabled="item.disabled || undefined"
              :aria-label="collapsed ? item.label : undefined"
              :aria-current="item.active ? 'page' : undefined"
              :href="item.href"
              :type="item.href ? undefined : 'button'"
              :disabled="item.href ? undefined : item.disabled"
              @click="onRowClick(item, $event)"
              @pointerenter="showFly($event, item.label)"
              @pointerleave="fly = null"
              @focus="showFly($event, item.label)"
              @blur="fly = null"
            >
              <span v-if="hasIcons || collapsed" class="cs-sidebar__icon" aria-hidden="true">
                <Icon v-if="item.icon" :name="item.icon" :size="15" />
                <span v-else-if="collapsed" class="cs-sidebar__initial">
                  {{ item.label.slice(0, 1) }}
                </span>
              </span>
              <span class="cs-sidebar__label">{{ item.label }}</span>
              <span v-if="item.badge !== undefined" class="cs-sidebar__badge">{{ item.badge }}</span>
            </component>

            <div v-for="group in section.groups ?? []" :key="group.id" class="cs-sidebar__group">
              <div v-if="group.title" class="cs-sidebar__group-title">{{ group.title }}</div>
              <component
                :is="item.href ? 'a' : 'button'"
                v-for="item in group.items"
                :key="item.id"
                class="cs-sidebar__item"
                data-sidebar-item
                :data-active="item.active || undefined"
                :data-disabled="item.disabled || undefined"
                :aria-label="collapsed ? item.label : undefined"
                :aria-current="item.active ? 'page' : undefined"
                :href="item.href"
                :type="item.href ? undefined : 'button'"
                :disabled="item.href ? undefined : item.disabled"
                @click="onRowClick(item, $event)"
                @pointerenter="showFly($event, item.label)"
                @pointerleave="fly = null"
                @focus="showFly($event, item.label)"
                @blur="fly = null"
              >
                <span v-if="hasIcons || collapsed" class="cs-sidebar__icon" aria-hidden="true">
                  <Icon v-if="item.icon" :name="item.icon" :size="15" />
                  <span v-else-if="collapsed" class="cs-sidebar__initial">
                    {{ item.label.slice(0, 1) }}
                  </span>
                </span>
                <span class="cs-sidebar__label">{{ item.label }}</span>
                <span v-if="item.badge !== undefined" class="cs-sidebar__badge">{{ item.badge }}</span>
              </component>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div v-if="$slots.footer" class="cs-sidebar__footer"><slot name="footer" /></div>

    <!-- Teleported: `position: fixed` breaks inside any transformed ancestor,
         and a demo stage with `overflow: hidden` would clip it. -->
    <Teleport v-if="collapsed && fly" to="body">
      <div class="cs-sidebar__flyout" role="tooltip" :style="{ top: `${fly.top}px`, left: `${fly.left}px` }">
        {{ fly.label }}
      </div>
    </Teleport>
  </aside>
</template>
