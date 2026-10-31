<script setup lang="ts">
import { Icon, IconButton, Toolbar, ToolbarSeparator } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
    <Toolbar label="View">
      <IconButton label="Layers" variant="ghost" size="sm">
        <Icon name="layers" :size="14" />
      </IconButton>
      <IconButton label="Compass" variant="ghost" size="sm">
        <Icon name="compass" :size="14" />
      </IconButton>
      <ToolbarSeparator />
      <IconButton label="Zoom in" variant="ghost" size="sm">
        <Icon name="plus" :size="14" />
      </IconButton>
      <IconButton label="Zoom out" variant="ghost" size="sm">
        <Icon name="minus" :size="14" />
      </IconButton>
      <ToolbarSeparator />
      <IconButton label="Settings" variant="ghost" size="sm">
        <Icon name="sliders" :size="14" />
      </IconButton>
    </Toolbar>

    <Toolbar block>
      <IconButton label="Select" variant="subtle" size="sm">
        <Icon name="crosshair" :size="14" />
      </IconButton>
      <IconButton label="Measure" variant="ghost" size="sm">
        <Icon name="ruler" :size="14" />
      </IconButton>
      <IconButton label="Inspect" variant="ghost" size="sm">
        <Icon name="search" :size="14" />
      </IconButton>
      <ToolbarSeparator />
      <span style="font-size: 11px; color: var(--cs-text-tertiary); margin-left: auto">
        Block fills the row
      </span>
    </Toolbar>
  </div>
</template>
