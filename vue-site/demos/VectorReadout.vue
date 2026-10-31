<script setup lang="ts">
import { VectorReadout } from '../../vue';
</script>

<template>
  <div style="display: flex; gap: 28px; align-items: flex-start">
    <VectorReadout :x="12.482" :y="-3.19" :z="1.007" unit="m" :magnitude="12.918" :precision="3" />
    <VectorReadout :x="0.42" :y="-0.18" :precision="2" :labels="['E', 'N', 'U']" />
  </div>
</template>
