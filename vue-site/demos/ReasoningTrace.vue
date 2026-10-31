<script setup lang="ts">
import { ReasoningTrace } from '../../vue';
import type { TraceStep } from '../../vue';

const live: TraceStep[] = [
  { id: 'q', label: 'Parsed the question', detail: 'terrain exaggeration, current scene', status: 'done', time: '0.1s' },
  { id: 't', label: 'Called get_scene_state', detail: 'terrainExaggeration = 1.0', status: 'done', time: '0.4s' },
  { id: 'r', label: 'Compared against the spec', detail: 'default 1.0, max 10.0', status: 'done', time: '0.2s' },
  { id: 'a', label: 'Proposed set_terrain_exaggeration', detail: 'awaiting confirmation', status: 'active' },
];

/** The same run, finished. With no step active, the caption falls back to `summary`. */
const settled: TraceStep[] = [
  ...live.slice(0, 3),
  { id: 'a', label: 'Applied set_terrain_exaggeration', detail: 'terrainExaggeration = 2.5', status: 'done', time: '0.1s' },
];

const failed: TraceStep[] = [
  { id: 'q', label: 'Parsed the question', status: 'done', time: '0.1s' },
  { id: 'f', label: 'Called fetch_imagery', detail: '503 Service Unavailable', status: 'failed', time: '5.0s' },
  { id: 'r', label: 'Retrying with the fallback provider', status: 'pending' },
];
</script>

<template>
  <div style="display: grid; gap: 18px; width: 100%; max-width: 480px">
    <ReasoningTrace :steps="live" title="Reasoning" :default-open="true" />
    <ReasoningTrace :steps="settled" title="Reasoning" summary="4 steps · 0.8s" :default-open="false" />
    <ReasoningTrace :steps="failed" title="Reasoning" :default-open="true" />
  </div>
</template>
