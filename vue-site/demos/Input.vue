<script setup lang="ts">
import { ref } from 'vue';
import { Icon, Input } from '../../vue';

const name = ref('Kessler Ridge');
const email = ref('');
const rate = ref('30');
</script>

<template>
  <div style="display: grid; gap: 12px; width: 280px">
    <Input v-model="name" placeholder="Layer name" />
    <Input v-model="email" type="email" placeholder="you@studio.com" />
    <Input v-model="rate" prefix-text="≤" suffix-text="fps" placeholder="0" />
    <Input size="sm" model-value="Small" />
    <Input size="lg" model-value="Large" />
  </div>

  <div style="display: grid; gap: 12px; width: 280px">
    <Input model-value="/data/tiles" invalid />
    <Input model-value="Locked" disabled />
    <Input placeholder="Search layers">
      <template #prefix><Icon name="search" :size="13" /></template>
    </Input>
    <Input model-value="48.8584" suffix-text="°N">
      <template #suffix><Icon name="map-pin" :size="13" /></template>
    </Input>
  </div>
</template>
