<script setup lang="ts">
import { cx } from '../lib/cx';
import Icon from './Icon.vue';

withDefaults(
  defineProps<{
    accent?: boolean;
    /** Renders the dismiss control. Listen for `@remove`. */
    removable?: boolean;
  }>(),
  { accent: false, removable: false },
);

const emit = defineEmits<{ remove: [] }>();
</script>

<template>
  <span :class="cx('cs-tag', accent && 'cs-tag--accent')">
    <slot name="icon" />
    <slot />
    <button
      v-if="removable"
      type="button"
      class="cs-tag__remove"
      aria-label="Remove"
      @click.stop="emit('remove')"
    >
      <Icon name="close" :size="10" :stroke-width="2" />
    </button>
  </span>
</template>
