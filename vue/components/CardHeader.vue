<script setup lang="ts">
defineProps<{ title?: string; desc?: string }>();
</script>

<template>
  <div class="cs-card__header">
    <slot>
      <div class="cs-card__heading">
        <div v-if="title" class="cs-card__title">{{ title }}</div>
        <div v-if="desc" class="cs-card__desc">{{ desc }}</div>
      </div>
    </slot>
    <slot name="actions" />
  </div>
</template>
