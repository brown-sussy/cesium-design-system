<script setup lang="ts">
import { ref } from 'vue';
import { Icon, Tabs } from '../../vue';
import type { TabItem } from '../../vue';

const tab = ref('layers');
const enclosed = ref('all');

const tabs: TabItem[] = [
  { id: 'layers', label: 'Layers', count: 12 },
  { id: 'scene', label: 'Scene' },
  { id: 'stats', label: 'Stats', count: 3 },
  { id: 'logs', label: 'Logs' },
];

const filters: TabItem[] = [
  { id: 'all', label: 'All', count: 128 },
  { id: 'open', label: 'Open', count: 14 },
  { id: 'closed', label: 'Closed', count: 114 },
];
</script>

<template>
  <div style="display: grid; gap: 24px; width: 100%; max-width: 460px">
    <Tabs v-model="tab" :items="tabs" aria-label="Inspector">
      <template #icon="{ item }">
        <Icon v-if="item.id === 'layers'" name="layers" :size="12" style="margin-right: 5px" />
        <Icon v-else-if="item.id === 'scene'" name="globe" :size="12" style="margin-right: 5px" />
      </template>
    </Tabs>

    <Tabs v-model="enclosed" :items="filters" variant="enclosed" aria-label="Filter" />

    <div style="font-size: 12px; color: var(--cs-text-tertiary); font-family: var(--cs-font-mono)">
      active: {{ tab }} / {{ enclosed }}
    </div>
  </div>
</template>
