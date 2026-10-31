import { normalizeClass } from 'vue';

/**
 * Attribute splitting for components whose React original spread `...rest`
 * onto an inner control while `className` styled the wrapper.
 *
 * Vue's default fallthrough would put everything on the root, so those
 * components opt out with `inheritAttrs: false` and use these two helpers in
 * the template — called as functions, not computed values, so they re-read
 * `$attrs` on every render.
 */

export function classOf(attrs: Record<string, unknown>): string | undefined {
  const cls = normalizeClass(attrs.class as never);
  return cls || undefined;
}

/** Everything except `class` and `style`. */
export function withoutClassStyle(attrs: Record<string, unknown>): Record<string, unknown> {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
}
