<script setup lang="ts">
import { StatusDot } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 12px">
    <StatusDot label="Neutral" />
    <StatusDot tone="accent" label="Syncing" />
    <StatusDot tone="success" label="Operational" />
    <StatusDot tone="warning" label="Degraded" />
    <StatusDot tone="danger" label="Offline" />
    <StatusDot tone="success" pulse label="Live" />
  </div>
</template>
