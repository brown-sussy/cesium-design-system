import { cx } from '../lib/cx';

export type SequenceKind = 'dna' | 'protein';

export interface SequenceViewProps {
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
  className?: string;
}

const DNA_CLASS: Record<string, string> = {
  A: 'a',
  C: 'c',
  G: 'g',
  T: 't',
};

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

/**
 * A wrapped sequence with a position ruler. Residues are coloured by chemical
 * class, the way an alignment viewer does it — the colours are the annotation.
 */
export function SequenceView({
  sequence,
  kind = 'dna',
  start = 1,
  perLine = 60,
  highlight,
  colorBy = true,
  label,
  className,
}: SequenceViewProps) {
  const classes = kind === 'dna' ? DNA_CLASS : PROTEIN_CLASS;
  const legend = kind === 'dna' ? DNA_LEGEND : PROTEIN_LEGEND;
  const rows: string[] = [];
  for (let i = 0; i < sequence.length; i += perLine) {
    rows.push(sequence.slice(i, i + perLine));
  }

  return (
    <div className={cx('cs-seq', className)}>
      {rows.map((row, rowIndex) => {
        const offset = rowIndex * perLine;
        return (
          <div className="cs-seq__row" key={offset}>
            <span className="cs-seq__pos">{start + offset}</span>
            <span className="cs-seq__bases">
              {row.split('').map((residue, i) => {
                const position = offset + i;
                const inRange =
                  highlight !== undefined &&
                  position >= highlight.start &&
                  position < highlight.end;
                return (
                  <span
                    key={i}
                    className={cx(
                      'cs-seq__r',
                      colorBy && `cs-seq__r--${classes[residue.toUpperCase()] ?? 'plain'}`,
                    )}
                    data-hl={inRange || undefined}
                  >
                    {residue}
                  </span>
                );
              })}
            </span>
          </div>
        );
      })}

      {label && (
        <div className="cs-seq__legend">
          <span>{label}</span>
          {colorBy &&
            legend.map((entry) => (
              <span key={entry.cls}>
                <b className={`cs-seq__r cs-seq__r--${entry.cls}`}>{entry.letter}</b>
                {'name' in entry ? entry.name : null}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
