const TOKEN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(import|from|export|default|const|let|var|function|return|if|else|type|interface|extends|new|true|false|null|undefined|async|await|for|of|in|as)\b|(<\/?[A-Za-z][\w.]*)|\b(\d+(?:\.\d+)?)\b/g;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function tokenize(code: string): string {
  // A fresh regex per call: `lastIndex` on a shared global regex is state, and
  // this function is called from render.
  const re = new RegExp(TOKEN.source, 'g');

  let out = '';
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(code)) !== null) {
    out += esc(code.slice(last, match.index));
    if (match[1]) out += `<span class="tok-com">${esc(match[1])}</span>`;
    else if (match[2]) out += `<span class="tok-str">${esc(match[2])}</span>`;
    else if (match[3]) out += `<span class="tok-kw">${esc(match[3])}</span>`;
    else if (match[4]) out += `<span class="tok-tag">${esc(match[4])}</span>`;
    else if (match[5]) out += `<span class="tok-num">${esc(match[5])}</span>`;
    last = match.index + match[0].length;
  }

  out += esc(code.slice(last));
  return out;
}

/**
 * Highlighted HTML is a pure function of the source string, and the same
 * snippets recur across pages — the import block, the variant row, a whole
 * template's 290 lines. Caching by source text means a page with twelve code
 * blocks tokenizes each one once, and revisiting a page costs nothing.
 *
 * The cache is bounded: templates are large, and an unbounded map would keep
 * every snippet the reader has ever scrolled past alive for the session.
 */
const CACHE_LIMIT = 80;
const cache = new Map<string, string>();

export function highlight(code: string): string {
  const cached = cache.get(code);
  if (cached !== undefined) return cached;

  const html = tokenize(code);
  if (cache.size >= CACHE_LIMIT) {
    // Map iterates in insertion order, so this drops the oldest entry.
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(code, html);
  return html;
}
