<script setup lang="ts">
import { cx } from '../lib/cx';
import type { ThreadItem } from '../types';

/** Conversations, as rows. The active one is marked by an accent edge. */
withDefaults(
  defineProps<{
    items: ThreadItem[];
    modelValue?: string;
    ariaLabel?: string;
  }>(),
  { ariaLabel: 'Conversations' },
);

const emit = defineEmits<{ 'update:modelValue': [string]; select: [ThreadItem] }>();
</script>

<template>
  <ul :class="cx('cs-threads')" :aria-label="ariaLabel">
    <li v-for="item in items" :key="item.id">
      <button
        type="button"
        class="cs-threads__item"
        :data-active="item.id === modelValue || undefined"
        :aria-current="item.id === modelValue || undefined"
        @click="emit('update:modelValue', item.id), emit('select', item)"
      >
        <span class="cs-threads__title">
          {{ item.title }}
          <span v-if="item.unread" class="cs-threads__unread">{{ item.unread }}</span>
        </span>
        <span v-if="item.time" class="cs-threads__time">{{ item.time }}</span>
        <span v-if="item.preview" class="cs-threads__preview">{{ item.preview }}</span>
      </button>
    </li>
  </ul>
</template>
