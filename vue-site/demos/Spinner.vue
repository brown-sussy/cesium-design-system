<script setup lang="ts">
import { Spinner } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 20px">
    <div style="display: flex; gap: 18px; align-items: center">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </div>

    <div
      style="
        display: flex;
        gap: 10px;
        align-items: center;
        color: var(--cs-success);
        font-size: 13px;
      "
    >
      <Spinner inherit />
      Inherits the surrounding colour
    </div>

    <div style="display: flex; gap: 8px; align-items: center; font-size: 13px">
      <Spinner size="sm" />
      <span style="color: var(--cs-text-secondary)">Loading 3,412 tiles…</span>
    </div>
  </div>
</template>
