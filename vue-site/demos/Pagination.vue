<script setup lang="ts">
import { ref } from 'vue';
import { Pagination } from '../../vue';

const page = ref(4);
const short = ref(1);
</script>

<template>
  <div style="display: grid; gap: 20px; justify-items: start">
    <Pagination v-model:page="page" :page-count="18" :total="216" :page-size="12" show-meta />
    <Pagination v-model:page="short" :page-count="3" />
    <div style="font-size: 12px; color: var(--cs-text-tertiary); font-family: var(--cs-font-mono)">
      page {{ page }} · page {{ short }}
    </div>
  </div>
</template>
