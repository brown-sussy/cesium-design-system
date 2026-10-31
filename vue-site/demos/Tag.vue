<script setup lang="ts">
import { ref } from 'vue';
import { Icon, Tag } from '../../vue';

const tags = ref(['Imagery', 'Terrain', 'Vector']);
</script>

<template>
  <div style="display: grid; gap: 14px">
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <Tag>Imagery</Tag>
      <Tag accent>Terrain</Tag>
      <Tag>Vector</Tag>
    </div>

    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <Tag><template #icon><Icon name="globe" :size="11" /></template>Global</Tag>
      <Tag><template #icon><Icon name="zap" :size="11" /></template>Real-time</Tag>
    </div>

    <div style="display: flex; gap: 8px; flex-wrap: wrap; min-height: 24px">
      <Tag v-for="tag in tags" :key="tag" removable @remove="tags = tags.filter((t) => t !== tag)">
        {{ tag }}
      </Tag>
      <span v-if="tags.length === 0" style="font-size: 12px; color: var(--cs-text-tertiary)">
        All removed — reload to reset.
      </span>
    </div>
  </div>
</template>
