<script setup lang="ts">
import { ReasoningTrace } from '../../vue';
import type { TraceStep } from '../../vue';

const steps: TraceStep[] = [
  { id: 'q', label: 'Parsed the question', detail: 'terrain exaggeration, current scene', status: 'done', time: '0.1s' },
  { id: 't', label: 'Called get_scene_state', detail: 'terrainExaggeration = 1.0', status: 'done', time: '0.4s' },
  { id: 'r', label: 'Compared against the spec', detail: 'default 1.0, max 10.0', status: 'done', time: '0.2s' },
  { id: 'a', label: 'Proposed set_terrain_exaggeration', detail: 'awaiting confirmation', status: 'active' },
];
</script>

<template>
  <div style="display: grid; gap: 18px; width: 100%; max-width: 480px">
    <ReasoningTrace :steps="steps" title="Reasoning" :default-open="true" />
    <ReasoningTrace :steps="steps" title="Reasoning" summary="4 steps · 0.7s" />
  </div>
</template>
