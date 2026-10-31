<script setup lang="ts">
import { ref } from 'vue';
import { Alert, Button, Icon } from '../../vue';

const show = ref(true);
const dismissed = ref(0);
</script>

<template>
  <div style="display: grid; gap: 12px; width: 100%; max-width: 480px">
    <Alert tone="accent" title="New renderer">
      WebGL 2 is now the default. Older scenes fall back automatically.
    </Alert>

    <Alert tone="success" title="Upload complete">
      1,284 tiles written to the cache.
    </Alert>

    <Alert tone="warning" title="12 tiles pending">
      The western ridge is still streaming — coverage is incomplete.
    </Alert>

    <Alert tone="danger" title="Terrain provider unreachable" dismissible @close="dismissed += 1">
      Requests are timing out after 5 s. The scene is rendering on the ellipsoid.
    </Alert>

    <Alert v-if="show" tone="neutral" title="Heads up" dismissible @close="show = false">
      Neutral is the quiet one — no colour, no glyph.
    </Alert>

    <Alert tone="accent" title="Custom glyph" :hide-icon="false">
      <template #icon><Icon name="sparkles" :size="15" /></template>
      The icon slot replaces the default tone glyph.
    </Alert>

    <div v-if="!show" style="display: flex; gap: 10px; align-items: center">
      <Button variant="secondary" size="sm" @click="show = true">Bring it back</Button>
      <span style="font-size: 12px; color: var(--cs-text-tertiary)">
        dismissed {{ dismissed }} time(s)
      </span>
    </div>
  </div>
</template>
