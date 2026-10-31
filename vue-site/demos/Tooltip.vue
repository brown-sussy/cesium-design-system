<script setup lang="ts">
import { Button, Icon, Tooltip } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 26px; justify-items: center">
    <div style="display: flex; gap: 12px">
      <Tooltip content="Above the control">
        <Button variant="secondary" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Below the control" placement="bottom">
        <Button variant="secondary" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="To the left" placement="left">
        <Button variant="secondary" size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="To the right" placement="right">
        <Button variant="secondary" size="sm">Right</Button>
      </Tooltip>
    </div>

    <Tooltip placement="bottom">
      <Button variant="ghost" size="sm">
        <template #icon-left><Icon name="info" :size="13" /></template>
        Rich content
      </Button>
      <template #content>
        <strong style="display: block; margin-bottom: 2px">Terrain exaggeration</strong>
        <span style="opacity: 0.75">Multiplies elevation. 1.0 is true scale.</span>
      </template>
    </Tooltip>

    <Tooltip content="Pinned to the right edge" placement="top" align="end">
      <Button variant="secondary" size="sm">Aligned to end</Button>
    </Tooltip>
  </div>
</template>
