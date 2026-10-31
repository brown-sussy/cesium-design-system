<script setup lang="ts">
import { cx } from '../lib/cx';
import type { KeyValueItem } from '../types';

withDefaults(defineProps<{ items: KeyValueItem[] }>(), { items: () => [] });
</script>

<template>
  <dl :class="cx('cs-kv')">
    <div v-for="(item, i) in items" :key="i" class="cs-kv__row">
      <dt class="cs-kv__key">{{ item.key }}</dt>
      <span class="cs-kv__leader" aria-hidden="true" />
      <dd :class="cx('cs-kv__value', item.dim && 'cs-kv__value--dim')">{{ item.value }}</dd>
    </div>
  </dl>
</template>
