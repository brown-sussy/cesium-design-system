<script setup lang="ts">
import { Histogram } from '../../vue';
import type { HistogramBin } from '../../vue';

/** A gamma spectrum: a Compton shelf and a sharp 662 keV photopeak. */
const bins: HistogramBin[] = Array.from({ length: 40 }, (_, i) => {
  const x0 = 300 + i * 20;
  const x1 = x0 + 20;
  const compton = 240 * Math.exp(-((x0 - 520) ** 2) / (2 * 90 ** 2));
  const peak = 900 * Math.exp(-((x0 - 662) ** 2) / (2 * 14 ** 2));
  return { x0, x1, count: Math.round(compton + peak + 18) };
});

const flat: HistogramBin[] = Array.from({ length: 16 }, (_, i) => ({
  x0: i,
  x1: i + 1,
  count: 20 + ((i * 7) % 11),
}));
</script>

<template>
  <div style="display: grid; gap: 22px; width: 100%; max-width: 520px">
    <Histogram :bins="bins" :height="140" unit="keV" :marker="662" aria-label="Gamma spectrum" />
    <Histogram :bins="bins" :height="120" log unit="keV" aria-label="Gamma spectrum, log counts" />
    <Histogram :bins="flat" :height="80" />
  </div>
</template>
