<script setup lang="ts">
import { ref } from 'vue';
import { Icon, SegmentedControl } from '../../vue';
import type { SegmentedOption } from '../../vue';

const basemap = ref('imagery');
const mode = ref('3d');
const density = ref('comfortable');

const basemaps: SegmentedOption[] = [
  { value: 'imagery', label: 'Imagery' },
  { value: 'terrain', label: 'Terrain' },
  { value: 'vector', label: 'Vector' },
  { value: 'none', label: 'None', disabled: true },
];

const modes: SegmentedOption[] = [
  { value: '3d', label: '3D' },
  { value: '2d', label: '2D' },
  { value: 'columbus', label: 'Columbus' },
];

const densities: SegmentedOption[] = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];
</script>

<template>
  <div style="display: grid; gap: 14px; justify-items: start">
    <SegmentedControl v-model="basemap" :options="basemaps" aria-label="Basemap" />
    <SegmentedControl v-model="mode" :options="modes" accent aria-label="View mode">
      <template #icon="{ option }">
        <Icon v-if="option.value === '3d'" name="globe" :size="12" />
        <Icon v-else-if="option.value === '2d'" name="grid" :size="12" />
      </template>
    </SegmentedControl>
    <div style="width: 300px">
      <SegmentedControl v-model="density" :options="densities" block aria-label="Density" />
    </div>
  </div>
</template>
