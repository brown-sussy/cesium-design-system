<script setup lang="ts">
import { computed } from 'vue';
import { Sidebar } from '../../vue';
import type { SidebarItem, SidebarSection } from '../../vue/types';
import { componentCount, navByCategory } from '../lib/nav.generated';
import { foundations, patterns, resources, templates } from '../lib/site';

const props = defineProps<{ route: string; open: boolean }>();
const emit = defineEmits<{ navigate: [] }>();

/**
 * The nav is the library's own `Sidebar` — sections, one active row, a
 * travelling tick. That is the point of the demo site: its chrome is made of
 * the thing it documents.
 */
const sections = computed<SidebarSection[]>(() => {
  const route = props.route.split('?')[0];

  const link = (to: string, label: string): SidebarItem => ({
    id: to,
    label,
    href: `#${to}`,
    // A section root stays lit while one of its pages is open.
    active: route === to || (to !== '/' && route.startsWith(`${to}/`)),
  });

  return [
    {
      id: 'overview',
      title: 'Overview',
      items: [link('/', 'Introduction')],
    },
    {
      id: 'foundations',
      title: 'Foundations',
      items: foundations.map((item) => link(item.to, item.label)),
    },
    {
      id: 'components',
      title: 'Components',
      count: String(componentCount).padStart(2, '0'),
      href: '#/components',
      groups: navByCategory.map((group) => ({
        id: group.category,
        title: group.category,
        items: group.docs.map((doc) => link(`/components/${doc.slug}`, doc.name)),
      })),
    },
    {
      id: 'patterns',
      title: 'Patterns',
      items: patterns.map((item) => link(item.to, item.label)),
    },
    {
      id: 'templates',
      title: 'Templates',
      count: String(templates.length).padStart(2, '0'),
      href: '#/templates',
      items: templates.map((item) => link(item.to, item.label)),
    },
    {
      id: 'resources',
      title: 'Resources',
      items: resources.map((item) => link(item.to, item.label)),
    },
  ];
});
</script>

<template>
  <div v-if="open" class="doc-scrim" aria-hidden="true" @click="emit('navigate')" />
  <aside class="doc-sidebar" :data-open="open || undefined">
    <Sidebar
      class="doc-sidebar__inner"
      label="Vue components"
      :sections="sections"
      rail
      @select="emit('navigate')"
    />
  </aside>
</template>
