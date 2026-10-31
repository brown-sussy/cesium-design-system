<script setup lang="ts">
import { Sparkline } from '../../vue';

const rising = [3, 5, 4, 7, 6, 9, 11, 10, 13, 15, 14, 18];
const flat = [8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9];
const spike = [2, 2, 3, 2, 2, 18, 4, 3, 2, 3, 2, 2];
</script>

<template>
  <div style="display: grid; gap: 22px">
    <div style="display: flex; gap: 22px; align-items: flex-end">
      <Sparkline :data="rising" :width="120" :height="34" area show-dot />
      <Sparkline :data="flat" :width="120" :height="34" />
      <Sparkline :data="spike" :width="120" :height="34" area />
    </div>

    <div style="display: flex; gap: 22px; align-items: flex-end">
      <Sparkline :data="rising" :width="90" :height="24" color="var(--cs-success)" />
      <Sparkline :data="spike" :width="90" :height="24" color="var(--cs-danger)" area />
      <Sparkline :data="flat" :width="90" :height="24" color="var(--cs-text-tertiary)" />
    </div>
  </div>
</template>
