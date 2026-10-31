<script setup lang="ts" generic="T extends Record<string, unknown>">
import { getCurrentInstance } from 'vue';
import { cx } from '../lib/cx';
import type { Column } from '../types';

/**
 * Cells come from one of two places: `column.render` for formatted text, or a
 * scoped slot named `cell-<key>` for anything that needs markup. The slot wins
 * when both are present, which is how the React `render` that returned JSX
 * ports over.
 */
const props = withDefaults(
  defineProps<{
    columns: Column<T>[];
    rows: T[];
    rowKey: (row: T, index: number) => string;
    compact?: boolean;
    selectedKey?: string;
    empty?: string;
  }>(),
  { compact: false, empty: 'No records' },
);

const emit = defineEmits<{ 'row-click': [T] }>();

/** Only clickable when the parent actually listens — same as the React prop. */
const hasRowClick = () => Boolean(getCurrentInstance()?.vnode.props?.onRowClick);
</script>

<template>
  <div :class="cx('cs-table-wrap')">
    <table :class="cx('cs-table', compact && 'cs-table--compact')">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :style="{ width: col.width }"
            :class="col.align === 'right' ? 'cs-table__num' : undefined"
            scope="col"
          >
            {{ col.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="rows.length === 0">
          <td :colspan="columns.length">
            <div class="cs-table__empty">{{ empty }}</div>
          </td>
        </tr>
        <template v-else>
          <tr
            v-for="(row, i) in rows"
            :key="rowKey(row, i)"
            :data-selected="selectedKey === rowKey(row, i) || undefined"
            :style="hasRowClick() ? { cursor: 'pointer' } : undefined"
            @click="hasRowClick() && emit('row-click', row)"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="
                cx(
                  col.align === 'right' && 'cs-table__num',
                  col.mono && 'cs-table__mono',
                  col.primary && 'cs-table__primary',
                )
              "
            >
              <slot :name="`cell-${col.key}`" :row="row" :index="i" :value="row[col.key]">
                {{ col.render ? col.render(row, i) : row[col.key] }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
