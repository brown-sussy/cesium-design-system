<script setup lang="ts">
import { ref } from 'vue';
import { Select } from '../../vue';
import type { SelectOption } from '../../vue';

const projection = ref('ecef');
const layer = ref('');
const size = ref('md');

const projections: SelectOption[] = [
  { value: 'ecef', label: 'Earth-centred, fixed', hint: 'EPSG:4978' },
  { value: 'mercator', label: 'Web Mercator', hint: '3857' },
  { value: 'geographic', label: 'Geographic', hint: '4326' },
  { value: 'utm', label: 'UTM zone 33N', hint: '32633' },
];

const layers: SelectOption[] = [
  { value: 'imagery', label: 'Satellite imagery' },
  { value: 'terrain', label: 'Terrain' },
  { value: 'buildings', label: '3D buildings', disabled: true },
];
</script>

<template>
  <div style="display: grid; gap: 12px; width: 300px">
    <Select v-model="projection" :options="projections" label="Projection" />
    <Select v-model="layer" :options="layers" placeholder="Add a layer" searchable />
    <Select v-model="size" :options="projections" size="sm" />
    <Select :options="layers" placeholder="Invalid" invalid />
    <Select :options="layers" model-value="terrain" disabled />
  </div>
</template>
