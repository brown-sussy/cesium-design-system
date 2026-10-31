<script setup lang="ts">
import { Skeleton } from '../../vue';

/**
 * Shown while a page chunk is in flight, and only then — the async page has a
 * 120ms delay, so a warm navigation swaps straight through. The bars match the
 * React docs' `PageFallback` so a slow load looks the same on both sites.
 */
</script>

<template>
  <div class="doc-container page-skeleton">
    <Skeleton :width="132" :height="10" />
    <div class="page-skeleton__gap" />
    <Skeleton :width="280" :height="30" />
    <div class="page-skeleton__gap page-skeleton__gap--wide" />
    <Skeleton width="min(560px, 82%)" :height="13" />
  </div>
</template>
