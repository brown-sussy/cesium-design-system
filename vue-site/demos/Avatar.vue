<script setup lang="ts">
import { Avatar } from '../../vue';

const src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop';
</script>

<template>
  <div style="display: grid; gap: 18px">
    <div style="display: flex; gap: 10px; align-items: center">
      <Avatar name="Ada Lovelace" size="xs" />
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Ada Lovelace" />
      <Avatar name="Ada Lovelace" size="lg" />
      <Avatar name="Ada Lovelace" size="xl" />
    </div>

    <div style="display: flex; gap: 10px; align-items: center">
      <Avatar :src="src" name="Grace Hopper" />
      <Avatar :src="src" name="Grace Hopper" square />
      <Avatar name="Grace Hopper" accent />
      <Avatar name="Katherine Johnson" status />
      <Avatar name="Ops" square />
    </div>
  </div>
</template>
