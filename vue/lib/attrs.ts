import { normalizeClass } from 'vue';
import type { StyleValue } from 'vue';

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

/**
 * `style` on its own. Paired with `classOf` on the wrapper: a width written as
 * an inline style has to reach the box that draws the border, not the `<input>`
 * inside it, or `style="width: 260px"` silently does nothing.
 */
export function styleOf(attrs: Record<string, unknown>): StyleValue | undefined {
  return attrs.style as StyleValue | undefined;
}

/** Everything except `class` and `style`. */
export function withoutClassStyle(attrs: Record<string, unknown>): Record<string, unknown> {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
}
