<script setup lang="ts">
import { computed, ref } from 'vue';
import { Badge, Icon, Input } from '../../vue';
import { componentCount, navByCategory } from '../lib/nav.generated';

const query = ref('');

const groups = computed(() => {
  const needle = query.value.trim().toLowerCase();
  return navByCategory
    .map((group) => ({
      category: group.category,
      docs: needle
        ? group.docs.filter(
            (doc) =>
              doc.name.toLowerCase().includes(needle) ||
              doc.summary.toLowerCase().includes(needle) ||
              group.category.toLowerCase().includes(needle),
          )
        : group.docs,
    }))
    .filter((group) => group.docs.length > 0);
});

const shown = computed(() => groups.value.reduce((n, g) => n + g.docs.length, 0));
</script>

<template>
  <div class="doc-main__inner">
    <header>
      <div class="doc-eyebrow">Library</div>
      <h1 class="doc-h1">Components</h1>
      <p class="doc-lede">
        {{ componentCount }} typed components, grouped by the job they do — every one of them a
        <code>.vue</code> single-file component with the same props and the same markup as its React
        counterpart.
      </p>
      <div class="doc-meta">
        <Badge tone="accent">{{ componentCount }} components</Badge>
        <Badge>{{ navByCategory.length }} categories</Badge>
        <Badge>0 runtime dependencies</Badge>
      </div>
    </header>

    <div class="filter-bar">
      <Input v-model="query" placeholder="Filter components…">
        <template #prefix><Icon name="search" :size="14" /></template>
      </Input>
      <span class="cs-mono cs-t-xs cs-dimmer">{{ shown }} shown</span>
    </div>

    <div v-for="group in groups" :key="group.category" class="cat-block">
      <div class="cat-block__head">
        <span class="cat-block__name">{{ group.category }}</span>
        <span class="cat-block__count">{{ String(group.docs.length).padStart(2, '0') }}</span>
        <span class="cat-block__line" />
      </div>
      <div class="comp-rows">
        <a
          v-for="doc in group.docs"
          :key="doc.slug"
          class="comp-row"
          :href="`#/components/${doc.slug}`"
        >
          <span class="comp-row__name">
            {{ doc.name }}
            <span v-if="doc.status === 'New'" class="comp-row__new">new</span>
          </span>
          <span class="comp-row__desc">{{ doc.summary }}</span>
          <span class="comp-row__meta">{{ doc.props }} props</span>
        </a>
      </div>
    </div>

    <p v-if="groups.length === 0" class="site-empty">Nothing matches “{{ query }}”.</p>
  </div>
</template>
