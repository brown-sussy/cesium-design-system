<script setup lang="ts">
import { ref } from 'vue';
import { Button, ButtonGroup, Icon, IconButton } from '../../vue';

const saved = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function save() {
  saved.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (saved.value = false), 1600);
}
</script>

<template>
  <Button variant="primary">Deploy</Button>
  <Button variant="secondary">Cancel</Button>
  <Button variant="ghost">Dismiss</Button>
  <Button variant="subtle">Inspect</Button>
  <Button variant="danger-ghost">Delete</Button>

  <span style="flex-basis: 100%" />

  <Button size="sm" variant="secondary">Small</Button>
  <Button variant="secondary">Medium</Button>
  <Button size="lg" variant="primary">Large</Button>

  <span style="flex-basis: 100%" />

  <Button variant="primary">
    <template #icon-left><Icon name="play" :size="13" /></template>
    Run simulation
  </Button>
  <Button variant="secondary">
    Next step
    <template #icon-right><Icon name="arrow-right" :size="13" /></template>
  </Button>

  <ButtonGroup aria-label="Zoom">
    <IconButton label="Layers" variant="secondary"><Icon name="layers" :size="15" /></IconButton>
    <IconButton label="Settings" variant="ghost"><Icon name="sliders" :size="15" /></IconButton>
  </ButtonGroup>

  <span style="flex-basis: 100%" />

  <Button variant="primary" loading>Deploying</Button>
  <Button variant="secondary" disabled>Disabled</Button>
  <Button variant="secondary" @click="save">
    {{ saved ? 'Saved' : 'Save' }}
  </Button>
</template>
