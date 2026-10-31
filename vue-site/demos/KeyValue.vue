<script setup lang="ts">
import { KeyValue } from '../../vue';
import type { KeyValueItem } from '../../vue';

const scene: KeyValueItem[] = [
  { key: 'Renderer', value: 'WebGL 2' },
  { key: 'Terrain', value: 'QM 30 m' },
  { key: 'Imagery', value: 'Sentinel-2' },
  { key: 'Projection', value: 'EPSG:4978' },
  { key: 'Frame', value: '8.4 ms' },
  { key: 'Cache', value: 'empty', dim: true },
];
</script>

<template>
  <div style="width: 100%; max-width: 320px">
    <KeyValue :items="scene" />
  </div>
</template>
