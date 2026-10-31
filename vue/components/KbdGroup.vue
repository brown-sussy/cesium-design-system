<script setup lang="ts">
import Kbd from './Kbd.vue';

defineProps<{ keys: string[] }>();
</script>

<template>
  <span class="cs-kbd-group">
    <template v-for="(key, i) in keys" :key="`${key}-${i}`">
      <span v-if="i > 0" class="cs-kbd-group__sep">+</span>
      <Kbd>{{ key }}</Kbd>
    </template>
  </span>
</template>
