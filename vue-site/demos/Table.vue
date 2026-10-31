<script setup lang="ts">
import { ref } from 'vue';
import { Badge, Table } from '../../vue';
import type { Column } from '../../vue';

/**
 * A type alias, not an `interface` — `Table` constrains its row to
 * `Record<string, unknown>`, and only object *type aliases* get an implicit
 * index signature. An interface would be rejected.
 */
type Site = {
  id: string;
  name: string;
  region: string;
  tiles: number;
  state: 'live' | 'stale' | 'offline';
};

const columns: Column<Site>[] = [
  { key: 'name', header: 'Site', primary: true },
  { key: 'region', header: 'Region' },
  { key: 'tiles', header: 'Tiles', align: 'right', mono: true },
  { key: 'state', header: 'State', width: '96px' },
];

const rows: Site[] = [
  { id: 'ksr', name: 'Kessler Ridge', region: 'Cascades', tiles: 1284, state: 'live' },
  { id: 'nvl', name: 'Nevada Flats', region: 'Basin', tiles: 412, state: 'stale' },
  { id: 'hbr', name: 'Harbour Point', region: 'Coastal', tiles: 0, state: 'offline' },
  { id: 'okv', name: 'Oak Valley', region: 'Piedmont', tiles: 968, state: 'live' },
];

const selected = ref('ksr');
</script>

<template>
  <div style="display: grid; gap: 18px; width: 100%; max-width: 560px">
    <Table
      :columns="columns"
      :rows="rows"
      :row-key="(r) => r.id"
      :selected-key="selected"
      @row-click="selected = $event.id"
    >
      <template #cell-state="{ value }">
        <Badge :tone="value === 'live' ? 'success' : value === 'stale' ? 'warning' : 'danger'" dot>
          {{ value }}
        </Badge>
      </template>
    </Table>

    <Table :columns="columns" :rows="rows" :row-key="(r) => r.id" compact />

    <Table
      :columns="columns"
      :rows="[]"
      :row-key="(r) => r.id"
      empty="No sites match this filter"
    />
  </div>
</template>
