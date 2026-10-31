<script setup lang="ts">
import { Badge } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 12px">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <Badge>Neutral</Badge>
      <Badge tone="accent">Accent</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
      <Badge tone="info">Info</Badge>
    </div>

    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <Badge tone="accent" solid>Solid</Badge>
      <Badge tone="success" solid>Stable</Badge>
      <Badge tone="warning" solid>Beta</Badge>
      <Badge tone="danger" solid>Deprecated</Badge>
    </div>

    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <Badge tone="success" dot>Operational</Badge>
      <Badge tone="warning" dot>Degraded</Badge>
      <Badge tone="danger" dot>Offline</Badge>
    </div>
  </div>
</template>
