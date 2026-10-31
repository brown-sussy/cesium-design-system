<script setup lang="ts">
import { ref } from 'vue';
import { ThreadList } from '../../vue';
import type { ThreadItem } from '../../vue';

const threads: ThreadItem[] = [
  {
    id: 'ridge',
    title: 'Western ridge resolution',
    preview: 'Why is the ridge still low resolution?',
    time: '14:02',
    unread: 2,
  },
  {
    id: 'fog',
    title: 'Fog and shadow settings',
    preview: 'Turn the fog off for the hero shot.',
    time: '11:40',
  },
  {
    id: 'crash',
    title: 'Terrain provider 503',
    preview: 'Requests timing out after 5 s.',
    time: 'Yesterday',
  },
  {
    id: 'perf',
    title: 'Frame budget',
    preview: 'Draw calls at 128, target is 96.',
    time: 'Mon',
  },
];

const active = ref('ridge');
</script>

<template>
  <div style="width: 100%; max-width: 320px">
    <ThreadList v-model="active" :items="threads" aria-label="Conversations" />
  </div>
</template>
