/** Group the integer part: 12845.5 -> "12,845.5". Deterministic, no locale. */
export function fixed(n: number, precision = 0): string {
  const s = n.toFixed(precision);
  const [int, dec] = s.split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return dec ? `${grouped}.${dec}` : grouped;
}

const SUP: Record<string, string> = {
  '-': '⁻',
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
};

/** 10 -> "10", -9 -> "⁻⁹". Used for scientific notation. */
export function superscript(n: number): string {
  return String(n)
    .split('')
    .map((c) => SUP[c] ?? c)
    .join('');
}

/** 38412 -> "38.4k". For meters and counters. */
export function compactCount(n: number): string {
  if (n >= 1000) {
    const v = n / 1000;
    return `${v >= 100 ? v.toFixed(0) : v.toFixed(1)}k`;
  }
  return String(n);
}
