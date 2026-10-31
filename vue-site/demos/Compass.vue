<script setup lang="ts">
import { ref } from 'vue';
import { Button, Compass } from '../../vue';

const heading = ref(38);
</script>

<template>
  <div style="display: grid; gap: 18px; justify-items: center">
    <div style="display: flex; gap: 22px; align-items: center">
      <Compass :heading="heading" :size="96" />
      <Compass :heading="heading" :size="64" :show-heading="false" />
      <Compass :heading="225" :size="48" :show-heading="false" />
    </div>

    <div style="display: flex; gap: 8px">
      <Button variant="secondary" size="sm" @click="heading = (heading + 335) % 360">Turn left</Button>
      <Button variant="secondary" size="sm" @click="heading = (heading + 25) % 360">Turn right</Button>
    </div>

    <div style="font-family: var(--cs-font-mono); font-size: 11px; color: var(--cs-text-tertiary)">
      heading {{ heading }}°
    </div>
  </div>
</template>
