<script setup lang="ts">
import { ref } from 'vue';
import { Textarea } from '../../vue';

const notes = ref('Re-tile the western ridge at z14 before the demo.');
const config = ref('{\n  "terrain": "ellipsoid",\n  "fog": false\n}');
</script>

<template>
  <div style="display: grid; gap: 12px; width: 320px">
    <Textarea v-model="notes" :rows="3" placeholder="Release notes" />
    <Textarea v-model="config" mono :rows="4" />
  </div>

  <div style="display: grid; gap: 12px; width: 320px">
    <Textarea model-value="Missing required field" invalid :rows="2" />
    <Textarea model-value="Read-only snapshot" disabled :rows="2" />
  </div>
</template>
