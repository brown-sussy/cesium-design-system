<script setup lang="ts">
import { IconButton, Icon, Panel, PanelBody, StatusDot } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 16px; width: 100%; max-width: 360px">
    <Panel title="Scene">
      <template #actions>
        <IconButton label="Settings" variant="ghost" size="sm">
          <Icon name="sliders" :size="13" />
        </IconButton>
        <IconButton label="More" variant="ghost" size="sm">
          <Icon name="menu" :size="13" />
        </IconButton>
      </template>
      <PanelBody>
        <div style="display: grid; gap: 10px; font-size: 13px">
          <StatusDot tone="success" label="Terrain streamed" />
          <StatusDot tone="warning" label="12 tiles pending" />
        </div>
      </PanelBody>
    </Panel>

    <Panel title="Accent" accent>
      <PanelBody>
        <div style="font-size: 13px; color: var(--cs-text-secondary)">
          A panel is a floating instrument cluster — a title strip, a body, no card chrome.
        </div>
      </PanelBody>
    </Panel>

    <Panel flush>
      <div style="padding: 14px 16px; font-size: 13px">
        Flush — the body owns its own padding.
      </div>
    </Panel>
  </div>
</template>
