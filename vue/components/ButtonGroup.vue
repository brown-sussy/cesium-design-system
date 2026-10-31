<script setup lang="ts">
defineProps<{ ariaLabel?: string }>();
</script>

<template>
  <div class="cs-btn-group" role="group" :aria-label="ariaLabel">
    <slot />
  </div>
</template>
