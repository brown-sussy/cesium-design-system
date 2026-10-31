<script setup lang="ts">
import { cx } from '../lib/cx';
</script>

<template>
  <div :class="cx('cs-panel__body')"><slot /></div>
</template>
