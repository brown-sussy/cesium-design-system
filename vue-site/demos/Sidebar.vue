<script setup lang="ts">
import { ref } from 'vue';
import { Avatar, Badge, Sidebar } from '../../vue';
import type { SidebarSection } from '../../vue';

const active = ref('layers');

const sections: SidebarSection[] = [
  {
    id: 'workspace',
    title: 'Workspace',
    items: [
      { id: 'overview', label: 'Overview', icon: 'grid' },
      { id: 'layers', label: 'Layers', icon: 'layers', badge: 12 },
      { id: 'assets', label: 'Assets', icon: 'box' },
    ],
  },
  {
    id: 'scene',
    title: 'Scene',
    count: 3,
    collapsible: true,
    defaultOpen: true,
    items: [
      { id: 'terrain', label: 'Terrain', icon: 'globe' },
      { id: 'lighting', label: 'Lighting', icon: 'sun' },
      { id: 'camera', label: 'Camera', icon: 'compass' },
    ],
  },
  {
    id: 'docs',
    title: 'Reference',
    href: '#/components/sidebar',
    items: [{ id: 'api', label: 'API', icon: 'book' }],
  },
];
</script>

<template>
  <div style="display: flex; gap: 16px; align-items: stretch; height: 420px">
    <Sidebar
      :sections="sections"
      :label="'Project'"
      rail
      :width="212"
      @select="active = $event.id"
    >
      <template #header>
        <div style="display: flex; gap: 8px; align-items: center">
          <Avatar name="Kessler" size="xs" accent />
          <span style="font-size: 12px; font-weight: 500">Kessler Ridge</span>
          <Badge tone="accent" style="margin-left: auto">v4</Badge>
        </div>
      </template>
      <template #footer>
        <div style="font-size: 11px; color: var(--cs-text-tertiary); padding: 0 12px">
          {{ active }}
        </div>
      </template>
    </Sidebar>

    <Sidebar :sections="sections" collapsed label="Collapsed" :width="56" />
  </div>
</template>
