<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '../../vue';

const fog = ref(true);
const shadows = ref(false);
const fxaa = ref(true);
</script>

<template>
  <div style="display: grid; gap: 12px">
    <Switch v-model="fog" label="Atmospheric fog" />
    <Switch v-model="shadows" label="Shadow maps" />
    <Switch v-model="fxaa" size="sm" label="Small" />
    <Switch :model-value="true" label="Locked on" disabled />
    <Switch :model-value="false" label="Locked off" disabled />
  </div>
</template>
