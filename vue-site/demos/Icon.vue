<script setup lang="ts">
import { Icon, iconPaths } from '../../vue';

const names = Object.keys(iconPaths) as (keyof typeof iconPaths)[];
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(78px, 1fr));
      gap: 4px;
      width: 100%;
    "
  >
    <div
      v-for="name in names"
      :key="name"
      style="
        display: grid;
        justify-items: center;
        gap: 6px;
        padding: 10px 4px;
        border-radius: var(--cs-radius-md);
        color: var(--cs-text-secondary);
      "
    >
      <Icon :name="name" :size="18" />
      <span
        style="
          font-family: var(--cs-font-mono);
          font-size: 9px;
          letter-spacing: 0.02em;
          color: var(--cs-text-tertiary);
          text-align: center;
          word-break: break-word;
        "
      >
        {{ name }}
      </span>
    </div>
  </div>
</template>
