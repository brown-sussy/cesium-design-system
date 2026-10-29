import {
  Quantity,
  VectorReadout,
  Histogram,
  EventDisplay,
  SequenceView,
  DoseResponse,
  Panel,
  PanelBody,
  KeyValue,
} from '@cesium-ds/core';
import type { ComponentDoc } from './types';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/** A dimuon invariant-mass spectrum: background plus a Z peak at 91 GeV. */
const spectrum = Array.from({ length: 70 }, (_, i) => {
  const x0 = 60 + i * 2;
  const background = 0.55 * Math.exp(-(x0 - 60) / 70);
  const peak = 0.95 * Math.exp(-((x0 - 91) ** 2) / (2 * 6 ** 2));
  const jitter = ((i * 37) % 13) / 90;
  return { x0, x1: x0 + 2, count: Math.round((background + peak + jitter) * 900) };
});

const dna =
  'ATGGCCTCGGATCCGGTACCGAGCTCGAATTCGTAATCATGGTCATAGCTGTTTCCTGTGTGAAATTGTTATCCGCTCACAATTCCACACAACATACGAGCCGGAAGCATAAAGTG';

const protein =
  'MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRVGDGTQDNLSGAEKAVQVKVKALPDAQFEVVHSLAKWKRQTLGQHDFSAGEGLYTHMKALRPDEDRLSPLHSVYVDQWDWERVMGDGERQFSTLKSTVEAIWAGIKATEAAVSEEFGLAPFLPDQIHFVHSQELLSRYPDLDAKGRERAIAKDLGAVFLVGIGGKLSDGHRHDVRAPDYDDWSTPSELGHAGLNGDILVWNPVLEDAFELSSMGIRVDADTLKHQLALTGDEDRLELEWHQALLRGEMPQTIGGGIGQSRLTMLLLQLPHIGQVQAGVWPAAVRESVPSLL';

function QuantityDemo() {
  return (
    <Panel title="Measured constants">
      <PanelBody>
        <KeyValue
          items={[
            { key: 'Electron mass', value: <Quantity value={9.1093837} exponent={-31} precision={7} unit="kg" size="sm" /> },
            { key: 'Site elevation', value: <Quantity value={1284.5} uncertainty={0.3} precision={1} unit="m" size="sm" /> },
            { key: 'c', value: <Quantity value={299792458} unit="m·s⁻¹" size="sm" /> },
            { key: 'Band gap', value: <Quantity value={0.0231} uncertainty={0.0004} precision={4} unit="eV" size="sm" /> },
          ]}
        />
      </PanelBody>
    </Panel>
  );
}

function QuantitySizes() {
  return (
    <div className="cs-stack" style={{ gap: 10 }}>
      <Quantity value={1.2845} unit="m" precision={4} size="lg" />
      <Quantity value={1.2845} uncertainty={0.0003} precision={4} unit="m" />
      <Quantity value={1.2845} uncertainty={0.0003} precision={4} unit="m" size="sm" />
    </div>
  );
}

function VectorDemo() {
  return (
    <div className="cs-row" style={{ gap: 48, alignItems: 'flex-start' }}>
      <div style={{ width: 190 }}>
        <div className="cs-t-2xs cs-dimmer cs-mono" style={{ marginBottom: 6 }}>
          ECEF · site 04
        </div>
        <VectorReadout x={4210.5} y={-1180.2} z={384.9} unit="m" magnitude={4381.6} />
      </div>
      <div style={{ width: 190 }}>
        <div className="cs-t-2xs cs-dimmer cs-mono" style={{ marginBottom: 6 }}>
          ENU · local tangent
        </div>
        <VectorReadout x={12.4} y={-3.8} z={0.2} unit="m" labels={['e', 'n', 'u']} precision={1} />
      </div>
    </div>
  );
}

function HistogramDemo() {
  return (
    <div style={{ width: 460 }}>
      <Histogram bins={spectrum} marker={91} unit="GeV" height={130} />
    </div>
  );
}

function HistogramLog() {
  return (
    <div style={{ width: 460 }}>
      <Histogram bins={spectrum} log marker={91} unit="GeV" height={130} />
    </div>
  );
}

function EventDemo() {
  return (
    <EventDisplay
      label="RUN 48213 · EVENT 1187 · √s 13 TeV"
      size={320}
      tracks={[
        { angle: 14, length: 0.92, charge: 1 },
        { angle: 38, length: 0.74, charge: -1 },
        { angle: 62, length: 0.86, charge: 1 },
        { angle: 118, length: 0.55, charge: -1 },
        { angle: 141, length: 0.97, charge: 1 },
        { angle: 205, length: 0.68, charge: -1 },
        { angle: 243, length: 0.44, charge: 1 },
        { angle: 300, length: 0.81, charge: 1 },
        { angle: 336, length: 0.35, charge: 0 },
      ]}
      calorimeter={[
        { angle: 14, energy: 0.72 },
        { angle: 38, energy: 0.38 },
        { angle: 62, energy: 0.91 },
        { angle: 118, energy: 0.24 },
        { angle: 141, energy: 0.64 },
        { angle: 205, energy: 0.31 },
        { angle: 243, energy: 0.18 },
        { angle: 300, energy: 0.55 },
      ]}
      hits={[
        { x: 0.62, y: 0.24 },
        { x: -0.41, y: 0.66 },
        { x: 0.18, y: -0.78 },
        { x: 0.84, y: -0.12 },
        { x: -0.72, y: -0.33 },
        { x: 0.05, y: 0.91 },
      ]}
    />
  );
}

function SequenceDemo() {
  return (
    <div style={{ width: 520 }}>
      <SequenceView sequence={dna} kind="dna" start={1} highlight={{ start: 30, end: 60 }} label="pUC19 · MCS" />
    </div>
  );
}

function SequenceProtein() {
  return (
    <div style={{ width: 520 }}>
      <SequenceView sequence={protein.slice(0, 120)} kind="protein" start={1} label="MDH · E. coli" />
    </div>
  );
}

function DoseDemo() {
  return (
    <div style={{ width: 460 }}>
      <DoseResponse
        ic50={12}
        hill={1.1}
        unit="nM"
        xRange={[0.3, 300]}
        points={[
          { x: 0.3, y: 94 },
          { x: 1, y: 91 },
          { x: 3, y: 78 },
          { x: 10, y: 46 },
          { x: 30, y: 21 },
          { x: 100, y: 9 },
          { x: 300, y: 5 },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export const science: ComponentDoc[] = [
  {
    slug: 'quantity',
    name: 'Quantity',
    category: 'Science',
    status: 'New',
    summary: 'A measured value: digits, ± uncertainty, power of ten, unit.',
    intro:
      'Every part is monospace and tabular, so a column of quantities lines up on the decimal point. The exponent is separated into ×10⁻⁹ rather than folded into the digits — that is how the number is written on paper.',
    examples: [
      {
        title: 'In a readout',
        description: 'size="sm" inside KeyValue; the unit and the ± drop to 78–82% of the value size.',
        code: `<Quantity value={9.1093837} exponent={-31} precision={7} unit="kg" />
<Quantity value={1284.5} uncertainty={0.3} precision={1} unit="m" />`,
        render: QuantityDemo,
      },
      {
        title: 'Sizes',
        description: 'lg for a headline number, md in a table, sm in a dense readout.',
        code: `<Quantity value={1.2845} unit="m" precision={4} size="lg" />`,
        render: QuantitySizes,
      },
    ],
    props: [
      { name: 'value', type: 'number | string', default: '—', description: 'The measurement.' },
      { name: 'unit', type: 'ReactNode', default: '—', description: 'Printed after the digits, de-emphasised.' },
      { name: 'uncertainty', type: 'number | string', default: '—', description: 'Absolute uncertainty, printed as ±.' },
      { name: 'precision', type: 'number', default: '0', description: 'Decimal places for a numeric value.' },
      { name: 'exponent', type: 'number', default: '—', description: 'Power of ten, printed as ×10ⁿ.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Type scale.' },
    ],
    a11y: [
      'The exponent carries an aria-label ("times ten to the minus thirty-one") because a superscript is not read out reliably.',
      'Uncertainty and unit are plain text in the same node, so a screen reader reads the whole quantity as one string.',
    ],
    related: ['key-value', 'stat', 'vector-readout'],
  },

  {
    slug: 'vector-readout',
    name: 'VectorReadout',
    category: 'Science',
    status: 'New',
    summary: 'Three components and a magnitude, sharing one decimal column.',
    intro:
      'Each row is its own grid with the value right-aligned, so x, y and z stack on the decimal point instead of drifting with the label width. Labels default to x/y/z and can be swapped for e/n/u or anything else.',
    examples: [
      {
        title: 'ECEF and ENU',
        description: 'The magnitude row is separated by a hairline and reads at secondary contrast.',
        code: `<VectorReadout x={4210.5} y={-1180.2} z={384.9} unit="m" magnitude={4381.6} />
<VectorReadout x={12.4} y={-3.8} z={0.2} unit="m" labels={['e', 'n', 'u']} />`,
        render: VectorDemo,
      },
    ],
    props: [
      { name: 'x', type: 'number', default: '—', description: 'First component.' },
      { name: 'y', type: 'number', default: '—', description: 'Second component.' },
      { name: 'z', type: 'number', default: '—', description: 'Optional third component.' },
      { name: 'unit', type: 'string', default: '—', description: 'Shown on every row.' },
      { name: 'magnitude', type: 'number', default: '—', description: 'Adds the |v| row.' },
      { name: 'precision', type: 'number', default: '1', description: 'Decimal places.' },
      { name: 'labels', type: '[string, string, string]', default: "['x','y','z']", description: 'Axis captions.' },
    ],
    a11y: [
      'Axis labels are text, not icons; the magnitude row is labelled "|v|" rather than a bare number.',
    ],
    related: ['quantity', 'coordinate-readout', 'key-value'],
  },

  {
    slug: 'histogram',
    name: 'Histogram',
    category: 'Science',
    status: 'New',
    summary: 'Binned counts as a static SVG, linear or log, with an optional marker.',
    intro:
      'Static on purpose: a histogram in an instrument panel is read at a glance, and every pixel of interaction is a pixel that can lag behind the data. The bin geometry comes from the data — pass x0/x1/count and the axis follows.',
    examples: [
      {
        title: 'Linear',
        description: 'A dimuon spectrum with the Z peak at 91 GeV marked. Empty bins render as a hairline, not a gap.',
        code: `<Histogram bins={spectrum} marker={91} unit="GeV" />`,
        render: HistogramDemo,
        align: 'stretch',
      },
      {
        title: 'Log counts',
        description: 'Log is the only way a spectrum with a 10⁴ dynamic range reads — the background is visible under the peak.',
        code: `<Histogram bins={spectrum} log marker={91} unit="GeV" />`,
        render: HistogramLog,
        align: 'stretch',
      },
    ],
    props: [
      { name: 'bins', type: 'HistogramBin[]', default: '—', description: 'x0, x1, count per bin.' },
      { name: 'height', type: 'number', default: '120', description: 'View-box height in px.' },
      { name: 'log', type: 'boolean', default: 'false', description: 'Log-scaled counts.' },
      { name: 'unit', type: 'string', default: '—', description: 'Appended to the caption and the aria-label.' },
      { name: 'marker', type: 'number', default: '—', description: 'Dashed vertical line with a value label.' },
    ],
    a11y: [
      'The SVG is role="img" with a label naming the bin count, the total and the unit; the numbers are also printed in the footer.',
    ],
    related: ['sparkline', 'progress', 'stat'],
  },

  {
    slug: 'event-display',
    name: 'EventDisplay',
    category: 'Science',
    status: 'New',
    summary: 'A transverse view of one collision: tracker, tracks and calorimeter towers.',
    intro:
      'Geometry only — no simulation and no randomness, so the same event always draws the same picture. Tracks curve with charge, the calorimeter towers grow from the inner ring by energy, and the vertex is a single filled dot.',
    examples: [
      {
        title: 'One event',
        description:
          'Positive tracks take the accent, negative ones the warning colour, neutral ones a dashed grey. Nine tracks, eight towers.',
        code: `<EventDisplay
  label="RUN 48213 · EVENT 1187 · √s 13 TeV"
  tracks={[{ angle: 14, length: 0.92, charge: 1 }, …]}
  calorimeter={[{ angle: 14, energy: 0.72 }, …]}
  hits={[{ x: 0.62, y: 0.24 }, …]}
/>`,
        render: EventDemo,
      },
    ],
    props: [
      { name: 'tracks', type: 'EventTrack[]', default: '[]', description: 'angle (deg), length (0–1), charge.' },
      { name: 'calorimeter', type: 'EventCalo[]', default: '[]', description: 'angle, energy (0–1).' },
      { name: 'hits', type: 'EventHit[]', default: '[]', description: 'x/y in −1…1 of the detector radius.' },
      { name: 'label', type: 'string', default: '—', description: 'Mono caption in the corner.' },
      { name: 'size', type: 'number', default: '—', description: 'Rendered px; the view-box is 240.' },
    ],
    a11y: [
      'role="img" with a label that states the track count; the caption prop carries the run and event numbers.',
      'Charge is encoded by colour and by stroke style — dashed for neutral — so it survives a greyscale print.',
    ],
    related: ['histogram', 'compass', 'legend'],
  },

  {
    slug: 'sequence-view',
    name: 'SequenceView',
    category: 'Science',
    status: 'New',
    summary: 'A wrapped nucleotide or protein sequence with a position ruler.',
    intro:
      'Residues are coloured by chemical class, the way an alignment viewer does it: for DNA that is one colour per base, for protein it is hydrophobic / polar / basic / acidic / special. Pass colorBy={false} for a plain alignment view.',
    examples: [
      {
        title: 'DNA with a highlighted range',
        description: 'A 0-based half-open range gets an accent wash behind the residues.',
        code: `<SequenceView
  sequence={dna}
  kind="dna"
  highlight={{ start: 30, end: 60 }}
  label="pUC19 · MCS"
/>`,
        render: SequenceDemo,
        align: 'stretch',
      },
      {
        title: 'Protein',
        description: 'Five classes instead of four; the ruler restarts at each line.',
        code: `<SequenceView sequence={protein} kind="protein" label="MDH · E. coli" />`,
        render: SequenceProtein,
        align: 'stretch',
      },
    ],
    props: [
      { name: 'sequence', type: 'string', default: '—', description: 'Residues, one letter each.' },
      { name: 'kind', type: "'dna' | 'protein'", default: "'dna'", description: 'Selects the colour classes.' },
      { name: 'start', type: 'number', default: '1', description: 'First position in the ruler.' },
      { name: 'perLine', type: 'number', default: '60', description: 'Residues per row.' },
      { name: 'highlight', type: '{ start, end }', default: '—', description: '0-based, end exclusive.' },
      { name: 'colorBy', type: 'boolean', default: 'true', description: 'Colour residues by class.' },
      { name: 'label', type: 'string', default: '—', description: 'Caption and legend.' },
    ],
    a11y: [
      'The sequence is real text, so it can be selected and copied; the ruler is a separate span and is not read as part of the sequence.',
      'Colour is an annotation, not the only encoding — every residue letter is still printed.',
    ],
    related: ['table', 'key-value', 'quantity'],
  },

  {
    slug: 'dose-response',
    name: 'DoseResponse',
    category: 'Science',
    status: 'New',
    summary: 'A four-parameter dose–response curve on a log x axis, with IC50 marked.',
    intro:
      'Log scale is not an option here: a linear axis turns every dose–response plot into an L. The curve is drawn from ic50 and hill; measured points are overlaid so you can see the fit against the data.',
    examples: [
      {
        title: 'IC50 with measured points',
        description: 'The vertical rule marks the half-maximal concentration; decades are labelled on the x axis.',
        code: `<DoseResponse
  ic50={12}
  hill={1.1}
  unit="nM"
  xRange={[0.3, 300]}
  points={[{ x: 0.3, y: 94 }, { x: 1, y: 91 }, …]}
/>`,
        render: DoseDemo,
        align: 'stretch',
      },
    ],
    props: [
      { name: 'ic50', type: 'number', default: '—', description: 'Half-maximal concentration.' },
      { name: 'hill', type: 'number', default: '1', description: 'Hill slope.' },
      { name: 'top', type: 'number', default: '100', description: 'Upper asymptote.' },
      { name: 'bottom', type: 'number', default: '0', description: 'Lower asymptote.' },
      { name: 'points', type: 'DosePoint[]', default: '[]', description: 'Measured x/y pairs.' },
      { name: 'xRange', type: '[number, number]', default: 'ic50/100…ic50×100', description: 'Log axis extent.' },
      { name: 'unit', type: 'string', default: '—', description: 'Appended to the IC50 label.' },
    ],
    a11y: [
      'role="img" with a label stating the IC50 and unit; the decade ticks are real text in the SVG.',
    ],
    related: ['histogram', 'sparkline', 'stat'],
  },
];
