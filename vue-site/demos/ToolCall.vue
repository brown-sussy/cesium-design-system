<script setup lang="ts">
import { ToolCall } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 14px; width: 100%; max-width: 520px">
    <ToolCall
      name="get_scene_state"
      :args="{ layer: 'terrain' }"
      status="done"
      result='{ "terrainExaggeration": 1, "fog": true, "shadows": false }'
      duration="124 ms"
      :default-open="true"
    />

    <ToolCall
      name="search_tiles"
      :args="{ bbox: '46.8,-121.8,46.9,-121.7', zoom: 14 }"
      status="running"
      duration="—"
    />

    <ToolCall
      name="fetch_imagery"
      :args="{ provider: 'sentinel-2' }"
      status="failed"
      result="503 Service Unavailable — retried 3 times."
    />

    <ToolCall name="set_terrain_exaggeration" :args="{ value: 2.5 }" status="done" duration="8 ms">
      <template #result>
        <span style="color: var(--cs-success)">Applied to the active scene.</span>
      </template>
    </ToolCall>
  </div>
</template>
