<script setup lang="ts">
import { SequenceView } from '../../vue';

const dna = 'ATGGCTAGCCGTACGTTAGCGGATCCGATCGATTACAGGCCTAGCTAGCTAAGGCTTACGCGATCGATCGGGCTA';
const protein = 'MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSGAEKAVQVKVKA';
</script>

<template>
  <div style="display: grid; gap: 22px; width: 100%; max-width: 560px">
    <SequenceView :sequence="dna" kind="dna" :per-line="30" :highlight="{ start: 12, end: 27 }" label="Amplicon" />
    <SequenceView :sequence="protein" kind="protein" :per-line="40" :start="1" />
    <SequenceView :sequence="dna" kind="dna" :per-line="30" :color-by="false" />
  </div>
</template>
