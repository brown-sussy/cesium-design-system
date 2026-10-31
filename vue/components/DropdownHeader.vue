<script setup lang="ts">
withDefaults(defineProps<{ title: string; hint?: string }>(), {});
</script>

<template>
  <div class="cs-dropdown__header">
    <div class="cs-dropdown__heading">
      <span class="cs-dropdown__title">{{ title }}</span>
      <span v-if="hint" class="cs-dropdown__hint">{{ hint }}</span>
    </div>
    <div v-if="$slots.default" class="cs-dropdown__actions"><slot /></div>
  </div>
</template>
