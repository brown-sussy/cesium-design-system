<script setup lang="ts">
import { ref } from 'vue';
import { Slider } from '../../vue';

const fov = ref(60);
const opacity = ref(0.65);
const zoom = ref(8);

const percent = (v: number) => `${Math.round(v * 100)}%`;
const degrees = (v: number) => `${v}°`;
</script>

<template>
  <div style="display: grid; gap: 22px; width: 340px">
    <Slider v-model="fov" :min="10" :max="120" :step="1" label="Field of view" show-value :format-value="degrees" />
    <Slider
      v-model="opacity"
      :min="0"
      :max="1"
      :step="0.05"
      label="Layer opacity"
      show-value
      :format-value="percent"
    />
    <Slider
      v-model="zoom"
      :min="0"
      :max="20"
      :step="1"
      :ticks="[0, 5, 10, 15, 20]"
      label="Zoom level"
      show-value
    />
    <Slider :model-value="12" :min="0" :max="20" label="Disabled" disabled />
  </div>
</template>
