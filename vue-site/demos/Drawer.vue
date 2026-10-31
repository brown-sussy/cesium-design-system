<script setup lang="ts">
import { ref } from 'vue';
import { Button, Divider, Drawer, KeyValue } from '../../vue';
import type { KeyValueItem } from '../../vue';

const open = ref(false);
const narrow = ref(false);

const details: KeyValueItem[] = [
  { key: 'Type', value: 'Quantised mesh' },
  { key: 'Resolution', value: '30 m' },
  { key: 'Tiles', value: '1,284' },
  { key: 'Updated', value: '12 May 2026' },
];
</script>

<template>
  <div style="display: flex; gap: 10px">
    <Button variant="secondary" @click="open = true">Open drawer</Button>
    <Button variant="ghost" @click="narrow = true">Narrow</Button>

    <Drawer :open="open" title="Layer details" :width="380" @close="open = false">
      <div style="display: grid; gap: 16px">
        <KeyValue :items="details" />
        <Divider />
        <div style="font-size: 12px; color: var(--cs-text-secondary); line-height: 1.6">
          A drawer is for detail that would crowd the canvas but must stay tied to
          what is on it. It keeps the scene visible behind.
        </div>
      </div>

      <template #footer>
        <Button variant="ghost" @click="open = false">Close</Button>
        <Button variant="primary" @click="open = false">Open layer</Button>
      </template>
    </Drawer>

    <Drawer :open="narrow" title="Narrow" :width="280" @close="narrow = false">
      <div style="font-size: 13px">280px wide.</div>
    </Drawer>
  </div>
</template>
