<script setup lang="ts">
import { Stat } from '../../vue';

const tiles = [42, 46, 44, 51, 55, 53, 58, 61, 57, 62, 66, 64];
const latency = [38, 36, 41, 35, 33, 30, 31, 28, 29, 26, 27, 24];
</script>

<template>
  <div style="display: grid; gap: 14px; grid-template-columns: 1fr 1fr; width: 100%; max-width: 520px">
    <Stat
      label="Tiles served"
      :value="'1.24'"
      unit="M"
      :delta="{ value: '+8.2%', direction: 'up', label: 'vs last week' }"
      :spark="tiles"
    />
    <Stat
      label="Mean latency"
      :value="24"
      unit="ms"
      :delta="{ value: '−11%', direction: 'down', label: 'vs last week' }"
      :spark="latency"
    />
    <Stat label="Draw calls" :value="128" unit="/frame" size="sm" />
    <Stat
      label="Error rate"
      :value="'0.42'"
      unit="%"
      :delta="{ value: '+0.1', direction: 'up' }"
      size="sm"
    />
  </div>
</template>
