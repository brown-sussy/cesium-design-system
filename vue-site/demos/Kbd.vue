<script setup lang="ts">
import { Kbd, KbdGroup } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 16px">
    <div style="display: flex; gap: 8px; align-items: center; font-size: 12px; color: var(--cs-text-secondary)">
      Open the palette
      <KbdGroup :keys="['⌘', 'K']" />
    </div>

    <div style="display: flex; gap: 8px; align-items: center; font-size: 12px; color: var(--cs-text-secondary)">
      Search anything
      <Kbd>/</Kbd>
    </div>

    <div style="display: flex; gap: 8px; align-items: center; font-size: 12px; color: var(--cs-text-secondary)">
      Cycle basemap
      <KbdGroup :keys="['Ctrl', 'Shift', 'B']" />
    </div>

    <div style="display: flex; gap: 8px; align-items: center; font-size: 12px; color: var(--cs-text-secondary)">
      <Kbd>Esc</Kbd>
      <span>closes any overlay</span>
    </div>
  </div>
</template>
