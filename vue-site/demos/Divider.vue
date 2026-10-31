<script setup lang="ts">
import { Divider } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 20px; width: 380px">
    <div>
      <div style="font-size: 13px">Horizontal</div>
      <Divider />
      <div style="font-size: 13px; color: var(--cs-text-secondary)">Separates stacked content.</div>
    </div>

    <Divider>Section break</Divider>

    <div style="display: flex; gap: 14px; align-items: center; height: 40px">
      <span style="font-size: 13px">Zoom</span>
      <Divider orientation="vertical" />
      <span style="font-size: 13px">Pan</span>
      <Divider orientation="vertical" />
      <span style="font-size: 13px">Tilt</span>
    </div>
  </div>
</template>
