<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';

const props = withDefaults(
  defineProps<{
    name?: string;
    src?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    square?: boolean;
    accent?: boolean;
    status?: boolean;
  }>(),
  { name: '', size: 'md', square: false, accent: false, status: false },
);

function initials(value: string) {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '··';
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const text = computed(() => initials(props.name));
</script>

<template>
  <span
    :class="
      cx(
        'cs-avatar',
        size !== 'md' && `cs-avatar--${size}`,
        square && 'cs-avatar--square',
        accent && 'cs-avatar--accent',
      )
    "
  >
    <img v-if="src" :src="src" :alt="name" />
    <template v-else>{{ text }}</template>
    <span v-if="status" class="cs-avatar__status" aria-hidden="true" />
  </span>
</template>
