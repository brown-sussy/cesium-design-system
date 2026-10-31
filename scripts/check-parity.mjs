/**
 * Prop-surface parity between the React and Vue builds.
 *
 *   node scripts/check-parity.mjs [--verbose] [--dump=Name]
 *
 * File counts prove nothing about API parity: a component can exist twice and
 * still be missing a prop on one side. This lifts the declared prop names and
 * their types out of both sources — the `XProps` interface on the React side,
 * `defineProps<{…}>` + `<slot>` on the Vue side — and reports what does not
 * line up.
 *
 * Only the React → Vue direction is checked. The reverse would flag every prop
 * Vue declares explicitly and React inherits from `ButtonHTMLAttributes` &co,
 * which is noise, not a gap: a Vue consumer can pass more, never less.
 *
 * Differences that are intentional live in REPLACED / NODE_SLOTS below, so
 * whatever this prints is either a missing prop or a rule that belongs there.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const verbose = process.argv.includes('--verbose');
const dumpArg = process.argv.find((a) => a.startsWith('--dump='));
const dump = dumpArg ? dumpArg.slice('--dump='.length) : null;

/* ------------------------------------------------------------------ */
/* Member extraction                                                   */
/* ------------------------------------------------------------------ */

/**
 * Top-level members of the first `{ … }` block at or after `from`, as
 * `{ name, type }`. Multi-line members (a callback whose parameters wrap) stay
 * one member: separators only count at bracket depth 1.
 *
 * Block comments are blanked first, at equal length so offsets survive. Two
 * reasons: a doc comment's commas split the member it documents in half, and an
 * apostrophe in prose ("the group's current value") opens a string literal that
 * never closes, silently eating the rest of the interface.
 */
function members(text, from) {
  const src = text.replace(/\/\*[\s\S]*?\*\//g, (m) => ' '.repeat(m.length));

  const open = src.indexOf('{', from);
  if (open === -1) return [];

  // The opening brace was consumed by indexOf, so the body is already one deep.
  let depth = 1;
  let quote = null;
  let chunk = '';
  const out = [];

  const flush = () => {
    const match = chunk
      .trim()
      .match(/^(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*\??\s*:?([\s\S]*)$/);
    if (match) out.push({ name: match[1] ?? match[2] ?? match[3], type: (match[4] ?? '').trim() });
    chunk = '';
  };

  for (let i = open + 1; i < src.length; i += 1) {
    const ch = src[i];

    if (quote) {
      chunk += ch;
      if (ch === '\\') {
        chunk += src[i + 1] ?? '';
        i += 1;
      } else if (ch === quote) quote = null;
      continue;
    }

    if (ch === '{') {
      depth += 1;
      chunk += ch;
      continue;
    }
    if (ch === '}') {
      if (depth === 1) {
        flush();
        return out;
      }
      depth -= 1;
      chunk += ch;
      continue;
    }

    if (depth === 1 && (ch === ';' || ch === ',' || ch === '\n')) {
      flush();
      continue;
    }

    if (ch === "'" || ch === '"') quote = ch;
    chunk += ch;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* React side                                                          */
/* ------------------------------------------------------------------ */

const reactDir = join(root, 'src/components');
const vueDir = join(root, 'vue/components');

const react = new Map();

for (const file of readdirSync(reactDir).filter((f) => f.endsWith('.tsx'))) {
  const text = readFileSync(join(reactDir, file), 'utf8');

  for (const m of text.matchAll(/export (?:function|const) ([A-Z]\w*)/g)) {
    const name = m[1];

    // Prefer the explicit `XProps` interface. Without one the component either
    // declares an inline object type or is a thin wrapper over HTMLAttributes —
    // in which case it has no props of its own and the function body must not
    // be scanned for them.
    const iface = new RegExp(`export interface ${name}Props\\b`).exec(text);
    if (iface) {
      react.set(name, members(text, iface.index));
      continue;
    }

    const decl = new RegExp(`export (?:function|const) ${name}\\s*\\(?`).exec(text);
    if (!decl) continue;

    const paramOpen = text.indexOf('(', decl.index);
    const paramClose = paramOpen === -1 ? -1 : text.indexOf(')', paramOpen);
    const param = paramOpen === -1 || paramClose === -1 ? '' : text.slice(paramOpen, paramClose);

    // `: { … }` is an inline prop type; anything else is inherited or absent.
    const inline = param.match(/:\s*\{/);
    react.set(name, inline ? members(text, paramOpen + inline.index + inline[0].length - 1) : []);
  }
}

/* ------------------------------------------------------------------ */
/* Vue side                                                            */
/* ------------------------------------------------------------------ */

const vue = new Map();

for (const file of readdirSync(vueDir).filter((f) => f.endsWith('.vue'))) {
  const name = file.replace(/\.vue$/, '');
  const text = readFileSync(join(vueDir, file), 'utf8');

  const propsAt = text.indexOf('defineProps<');
  const props = propsAt === -1 ? [] : members(text, propsAt + 'defineProps<'.length);

  const emitsAt = text.indexOf('defineEmits<');
  const emits = emitsAt === -1 ? [] : members(text, emitsAt + 'defineEmits<'.length);

  const slots = [...text.matchAll(/<slot(?:\s+name="([^"]+)")?/g)].map((m) => m[1] ?? 'default');

  vue.set(name, {
    file,
    props: props.map((p) => p.name),
    emits: emits.map((e) => e.name),
    slots,
  });
}

/* ------------------------------------------------------------------ */
/* Signed-off translations                                             */
/* ------------------------------------------------------------------ */

/** React prop → the Vue mechanism that replaces it, for every component. */
const REPLACED = {
  className: 'attrs fallthrough',
  style: 'attrs fallthrough',
  children: 'default slot',
  value: 'v-model',
  defaultValue: 'v-model',
};

/** `Component.prop` → why this one component diverges. */
const SIGNED_OFF = {
  'Divider.label': 'rendered through the default slot',
  'Alert.icon': '`#icon` slot, or `hide-icon` for `icon={false}`',
  'Tooltip.content': '`#content` slot',
};

/**
 * Spelling differences that are not gaps. `aria-label` stays hyphenated in React
 * because it is a DOM attribute there; Vue names props camelCase, so the prop is
 * `ariaLabel`. `panelClassName` → `panelClass` follows the same `className` →
 * `class` convention as the root prop.
 */
const ALIASES = {
  'aria-label': 'ariaLabel',
  panelClassName: 'panelClass',
};

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** `onFooBar` → `foo-bar`, `onSelect` → `select`. */
const eventName = (prop) => kebab(prop.replace(/^on(?=[A-Z])/, ''));

const isNode = (type) => /\bReactNode\b|\bReactElement\b|\bReactPortal\b/.test(type);

/**
 * Returns why `prop` is accounted for, or null. Order matters: the specific
 * rules (an explicit `update:x` emit) run before the loose one.
 */
function accountedFor(prop, type, vue) {
  if (prop in REPLACED) return REPLACED[prop];
  if (vue.props.has(prop)) return 'same name';

  const alias = ALIASES[prop];
  if (alias && vue.props.has(alias)) return `renamed ${alias}`;

  if (prop.startsWith('on') && /^on[A-Z]/.test(prop)) {
    const event = eventName(prop);
    if (vue.emits.has(event)) return `@${event}`;
    // onOpenChange → v-model:open
    const change = prop.match(/^on([A-Z]\w*?)Change$/);
    if (change) {
      const model = kebab(change[1]);
      if (vue.emits.has(`update:${model}`)) return `v-model:${model}`;
    }
    // onChange / onValueChange on a bound field → whichever prop is v-modelled.
    if (/^on\w*ValueChange$/.test(prop) && vue.props.has('modelValue')) return 'v-model';
    if (prop === 'onChange' && [...vue.emits].some((e) => e.startsWith('update:'))) {
      return 'v-model';
    }
    return null;
  }

  // A node prop can be a slot — but only one that carries its name, in either
  // spelling, otherwise the caller has nowhere to put the node.
  if (isNode(type) && (vue.slots.has(prop) || vue.slots.has(kebab(prop)))) {
    return `#${kebab(prop)} slot`;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Diff                                                                */
/* ------------------------------------------------------------------ */

const problems = [];
let checked = 0;

for (const [name, reactProps] of [...react].sort()) {
  const other = vue.get(name);
  if (!other) {
    problems.push({ name, issue: 'no Vue component' });
    continue;
  }
  checked += 1;

  const vueProps = new Set(other.props);
  const vueEmits = new Set(other.emits);
  const vueSlots = new Set(other.slots);

  for (const { name: prop, type } of reactProps) {
    if (SIGNED_OFF[`${name}.${prop}`]) continue;
    if (accountedFor(prop, type, { props: vueProps, emits: vueEmits, slots: vueSlots })) continue;
    problems.push({ name, issue: `prop \`${prop}\` missing (${type.slice(0, 40) || 'no type'})` });
  }

  if (dump === name) {
    console.log(`${name}`);
    console.log('  react:', reactProps.map((p) => `${p.name}${isNode(p.type) ? '*' : ''}`).join(', ') || '(none)');
    console.log('  vue  :', other.props.join(', ') || '(none)');
    console.log('  emits:', other.emits.join(', ') || '(none)');
    console.log('  slots:', other.slots.join(', ') || '(none)');
  }

  if (verbose) {
    console.log(
      `${name.padEnd(18)} react[${reactProps.length}] vue[${other.props.length}] slots[${other.slots.length}]`,
    );
  }
}

for (const name of [...vue.keys()].sort()) {
  if (!react.has(name)) problems.push({ name, issue: 'no React component' });
}

console.log(`checked ${checked} components against ${vue.size} Vue SFCs`);

if (problems.length) {
  console.error(`\n✗ ${problems.length} unresolved difference(s)`);
  for (const p of problems) console.error(`  ${p.name.padEnd(18)} ${p.issue}`);
  process.exit(1);
}
console.log('✓ prop surfaces match, modulo the signed-off translations');
