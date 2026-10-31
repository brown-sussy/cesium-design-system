<script setup lang="ts">
import { CoordinateReadout } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 16px">
    <CoordinateReadout :lat="46.8523" :lon="-121.7603" :alt="4392" />
    <CoordinateReadout :lat="-33.8688" :lon="151.2093" :precision="2" />
    <CoordinateReadout
      :lat="27.9881"
      :lon="86.925"
      :alt="8849"
      alt-unit="ft"
      :accent-alt="false"
    />
  </div>
</template>
