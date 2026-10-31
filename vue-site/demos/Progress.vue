<script setup lang="ts">
import { Progress } from '../../vue';

const mb = (value: number, max: number) => `${value} / ${max} MB`;
</script>

<template>
  <div style="display: grid; gap: 22px; width: 340px">
    <Progress :value="68" :max="100" label="Uploading tiles" show-value />

    <Progress :value="42" :max="100" tone="success" label="Coverage" show-value />

    <Progress :value="88" :max="100" tone="warning" label="Cache pressure" show-value :thin="true" />

    <Progress :value="180" :max="512" tone="danger" label="Memory" show-value :format-value="mb" />

    <Progress :indeterminate="true" label="Re-tiling" :thin="true" />
  </div>
</template>
