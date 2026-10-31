<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import type { SequenceKind } from '../types';

/**
 * A wrapped sequence with a position ruler. Residues are coloured by chemical
 * class, the way an alignment viewer does it — the colours are the annotation.
 */
const props = withDefaults(
  defineProps<{
    sequence: string;
    kind?: SequenceKind;
    /** First position in the numbering, 1-based. */
    start?: number;
    perLine?: number;
    /** 0-based range, inclusive start, exclusive end. */
    highlight?: { start: number; end: number };
    /** Colour residues by class. Off gives a plain alignment view. */
    colorBy?: boolean;
    label?: string;
  }>(),
  { kind: 'dna', start: 1, perLine: 60, colorBy: true },
);

const DNA_CLASS: Record<string, string> = { A: 'a', C: 'c', G: 'g', T: 't' };

const PROTEIN_CLASS: Record<string, string> = {
  A: 'hydrophobic',
  V: 'hydrophobic',
  I: 'hydrophobic',
  L: 'hydrophobic',
  M: 'hydrophobic',
  F: 'hydrophobic',
  W: 'hydrophobic',
  Y: 'hydrophobic',
  S: 'polar',
  T: 'polar',
  N: 'polar',
  Q: 'polar',
  C: 'polar',
  K: 'basic',
  R: 'basic',
  H: 'basic',
  D: 'acidic',
  E: 'acidic',
  G: 'special',
  P: 'special',
};

const DNA_LEGEND: Array<{ letter: string; cls: string; name?: string }> = [
  { letter: 'A', cls: 'a' },
  { letter: 'C', cls: 'c' },
  { letter: 'G', cls: 'g' },
  { letter: 'T', cls: 't' },
];

const PROTEIN_LEGEND: Array<{ letter: string; cls: string; name?: string }> = [
  { letter: 'A', cls: 'hydrophobic', name: 'hydrophobic' },
  { letter: 'S', cls: 'polar', name: 'polar' },
  { letter: 'K', cls: 'basic', name: 'basic' },
  { letter: 'D', cls: 'acidic', name: 'acidic' },
  { letter: 'G', cls: 'special', name: 'special' },
];

const classes = computed(() => (props.kind === 'dna' ? DNA_CLASS : PROTEIN_CLASS));
const legend = computed(() => (props.kind === 'dna' ? DNA_LEGEND : PROTEIN_LEGEND));

const rows = computed(() => {
  const out: Array<{
    offset: number;
    pos: number;
    residues: Array<{ char: string; cls: string; hl: boolean }>;
  }> = [];

  for (let offset = 0; offset < props.sequence.length; offset += props.perLine) {
    const chunk = props.sequence.slice(offset, offset + props.perLine);
    out.push({
      offset,
      pos: props.start + offset,
      residues: chunk.split('').map((char, i) => {
        const position = offset + i;
        const hl =
          props.highlight !== undefined &&
          position >= props.highlight.start &&
          position < props.highlight.end;
        return { char, cls: classes.value[char.toUpperCase()] ?? 'plain', hl };
      }),
    });
  }
  return out;
});
</script>

<template>
  <div :class="cx('cs-seq')">
    <div v-for="row in rows" :key="row.offset" class="cs-seq__row">
      <span class="cs-seq__pos">{{ row.pos }}</span>
      <span class="cs-seq__bases">
        <span
          v-for="(residue, i) in row.residues"
          :key="i"
          :class="cx('cs-seq__r', colorBy && `cs-seq__r--${residue.cls}`)"
          :data-hl="residue.hl || undefined"
        >
          {{ residue.char }}
        </span>
      </span>
    </div>

    <div v-if="label" class="cs-seq__legend">
      <span>{{ label }}</span>
      <template v-if="colorBy">
        <span v-for="entry in legend" :key="entry.cls">
          <b :class="`cs-seq__r cs-seq__r--${entry.cls}`">{{ entry.letter }}</b>
          {{ entry.name }}
        </span>
      </template>
    </div>
  </div>
</template>
