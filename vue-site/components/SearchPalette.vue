<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { paletteItems, type PaletteItem } from '../lib/site';
import { navigate } from '../lib/router';

const emit = defineEmits<{ close: [] }>();

const query = ref('');
const active = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLElement | null>(null);

const results = computed(() => {
  const needle = query.value.trim().toLowerCase();
  if (!needle) return paletteItems;
  return paletteItems.filter(
    (entry) =>
      entry.label.toLowerCase().includes(needle) ||
      entry.group.toLowerCase().includes(needle) ||
      (entry.desc && entry.desc.toLowerCase().includes(needle)),
  );
});

watch(results, () => {
  active.value = 0;
});

onMounted(() => inputRef.value?.focus());

function choose(index: number) {
  const hit = results.value[index];
  if (!hit) return;
  navigate(hit.to);
  emit('close');
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    active.value = Math.min(active.value + 1, results.value.length - 1);
    scrollActiveIntoView();
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    active.value = Math.max(active.value - 1, 0);
    scrollActiveIntoView();
  } else if (event.key === 'Enter') {
    event.preventDefault();
    choose(active.value);
  } else if (event.key === 'Escape') {
    emit('close');
  }
}

function scrollActiveIntoView() {
  const item = listRef.value?.children[active.value] as HTMLElement | undefined;
  item?.scrollIntoView({ block: 'nearest' });
}
</script>

<template>
  <div class="site-palette" role="presentation" @click.self="emit('close')">
    <div class="site-palette__panel" role="dialog" aria-modal="true" aria-label="Search documentation">
      <input
        ref="inputRef"
        v-model="query"
        class="site-palette__input"
        type="text"
        placeholder="Search documentation…"
        aria-label="Search documentation"
        @keydown="onKeydown"
      />
      <div ref="listRef" class="site-palette__list">
        <button
          v-for="(entry, index) in results"
          :key="entry.to"
          type="button"
          class="site-palette__item"
          :data-active="index === active"
          @click="choose(index)"
          @pointerenter="active = index"
        >
          {{ entry.label }}
          <span class="site-palette__cat">{{ entry.group }}</span>
        </button>
        <p v-if="results.length === 0" class="site-palette__empty">No result matches “{{ query }}”.</p>
      </div>
    </div>
  </div>
</template>
