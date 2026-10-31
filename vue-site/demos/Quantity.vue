<script setup lang="ts">
import { Quantity } from '../../vue';
</script>

<template>
  <div style="display: grid; gap: 14px; justify-items: start">
    <Quantity :value="4392" unit="m" />
    <Quantity :value="46.8523" unit="°" :precision="4" />
    <Quantity :value="9.109" :uncertainty="0.003" :exponent="-31" unit="kg" :precision="3" />
    <Quantity :value="1.284" :uncertainty="0.012" unit="km" :precision="3" />
    <Quantity :value="8.4" unit="ms" size="lg" />
    <Quantity :value="12" unit="tiles" size="sm" />
  </div>
</template>
