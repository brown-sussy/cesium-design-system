<script setup lang="ts">
import { Skeleton, SkeletonText } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 22px">
    <div style="display: flex; gap: 14px; align-items: center">
      <Skeleton variant="circle" :width="40" :height="40" />
      <div style="width: 220px">
        <SkeletonText :lines="3" />
      </div>
    </div>

    <div style="display: flex; gap: 12px">
      <Skeleton variant="rect" :width="112" :height="72" />
      <Skeleton variant="rect" :width="112" :height="72" />
      <Skeleton variant="rect" :width="112" :height="72" />
    </div>

    <div style="display: grid; gap: 8px; width: 260px">
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="72%" />
    </div>
  </div>
</template>
