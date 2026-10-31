<script setup lang="ts">
import { ScaleBar } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 20px; justify-items: start">
    <ScaleBar :distance="10" unit="km" :width="160" />
    <ScaleBar :distance="500" unit="m" :width="120" />
    <ScaleBar :distance="2" unit="km" :width="90" label="2 km at this zoom" />
  </div>
</template>
