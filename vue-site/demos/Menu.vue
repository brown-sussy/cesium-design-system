<script setup lang="ts">
import { ref } from 'vue';
import { Button, Icon, Menu } from '../../vue';
import type { MenuEntry } from '../../vue';

const last = ref('—');

const actions: MenuEntry[] = [
  { header: 'Layer' },
  { id: 'rename', label: 'Rename', icon: 'type', shortcut: 'F2' },
  { id: 'duplicate', label: 'Duplicate', icon: 'copy', shortcut: '⌘D' },
  { id: 'export', label: 'Export as…', icon: 'download' },
  'separator',
  { id: 'labels', label: 'Show labels', checked: true },
  { id: 'wireframe', label: 'Wireframe', checked: false, disabled: true },
  'separator',
  { id: 'delete', label: 'Delete layer', icon: 'close', danger: true },
];

const zoom: MenuEntry[] = [
  { id: 'in', label: 'Zoom in', shortcut: '⌘+' },
  { id: 'out', label: 'Zoom out', shortcut: '⌘−' },
  { id: 'reset', label: 'Reset view', shortcut: '⌘0' },
];
</script>

<template>
  <div style="display: grid; gap: 20px; justify-items: start">
    <div style="display: flex; gap: 12px">
      <Menu :items="actions" label="Layer actions" icon="layers" @select="last = $event.label" />
      <Menu :items="zoom" label="Zoom" align="end" @select="last = $event.label" />
      <Menu :items="zoom" label="Custom trigger" align="start">
        <template #trigger>
          <Icon name="menu" :size="14" />
          <span class="cs-menu__trigger-label">Custom</span>
          <Icon name="chevron-down" :size="12" class="cs-menu__caret" />
        </template>
      </Menu>
      <Menu :items="zoom" label="Disabled" disabled />
    </div>

    <div style="font-size: 12px; color: var(--cs-text-tertiary)">
      Last selected: <strong style="color: var(--cs-text-secondary)">{{ last }}</strong>
    </div>
  </div>
</template>
