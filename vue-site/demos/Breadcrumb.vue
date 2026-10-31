<script setup lang="ts">
import { ref } from 'vue';
import { Breadcrumb } from '../../vue';
import type { BreadcrumbItem } from '../../vue';

const trail: BreadcrumbItem[] = [
  { label: 'Workspace', href: '#/components/breadcrumb' },
  { label: 'Projects' },
  { label: 'Kessler Ridge' },
  { label: 'Layers' },
];

const crumb: BreadcrumbItem[] = [
  { label: 'Sites', href: '#/components/breadcrumb' },
  { label: 'Cascades', href: '#/components/breadcrumb' },
  { label: 'Terrain' },
];

const last = ref('—');
</script>

<template>
  <div style="display: grid; gap: 18px; justify-items: start">
    <Breadcrumb :items="trail" @navigate="last = $event.label" />
    <Breadcrumb :items="crumb" separator="›" />
    <Breadcrumb :items="[{ label: 'Home' }, { label: 'Here' }]" separator="/" />

    <div style="font-size: 12px; color: var(--cs-text-tertiary)">
      Last navigated: <strong style="color: var(--cs-text-secondary)">{{ last }}</strong>
    </div>
  </div>
</template>
