<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(defineProps<{ label?: string; block?: boolean }>(), { block: false });
</script>

<template>
  <div :class="cx('cs-toolbar', block && 'cs-toolbar--block')" role="toolbar">
    <span v-if="label" class="cs-toolbar__label">{{ label }}</span>
    <slot />
  </div>
</template>
