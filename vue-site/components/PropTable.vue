<script setup lang="ts">
import type { CatalogProp } from '../lib/catalog.generated';

defineProps<{ rows: CatalogProp[] }>();
</script>

<template>
  <div class="props-table">
    <table>
      <thead>
        <tr>
          <th style="width: 22%">Prop</th>
          <th style="width: 30%">Type</th>
          <th style="width: 16%">Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td class="props-table__name">{{ row.name }}</td>
          <td class="props-table__type">{{ row.type }}</td>
          <td class="props-table__default">{{ row.default ?? '—' }}</td>
          <td>{{ row.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
