<script setup lang="ts">
import { computed, ref } from 'vue';
import { Checkbox } from '../../vue';

const imagery = ref(true);
const terrain = ref(false);
const labels = ref(false);

const all = computed({
  get: () => imagery.value && terrain.value && labels.value,
  set: (on: boolean) => {
    imagery.value = on;
    terrain.value = on;
    labels.value = on;
  },
});

const partial = computed(() => !all.value && (imagery.value || terrain.value || labels.value));
</script>

<template>
  <div style="display: grid; gap: 10px">
    <Checkbox v-model="all" :indeterminate="partial" label="All layers" />
    <div style="display: grid; gap: 10px; padding-left: 24px">
      <Checkbox v-model="imagery" label="Satellite imagery" />
      <Checkbox v-model="terrain" label="Terrain" />
      <Checkbox v-model="labels" label="Place labels" />
    </div>
    <Checkbox :model-value="true" label="Disabled, checked" disabled />
    <Checkbox :model-value="false" label="Disabled" disabled />
  </div>
</template>
