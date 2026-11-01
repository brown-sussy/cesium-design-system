import { defineAsyncComponent, type Component } from 'vue';

/**
 * The four pages the system ships as whole screens. Each one is a real,
 * rendering page — not a description of one — so the docs page and the
 * `?view=full` route show the same file.
 *
 * A slug with no entry falls back to the description view, which is how a new
 * template can be written before its page exists.
 */
export const templateViews: Record<string, Component> = {
  'not-found': defineAsyncComponent(() => import('./NotFound.vue')),
  'sign-in': defineAsyncComponent(() => import('./SignIn.vue')),
  homepage: defineAsyncComponent(() => import('./Homepage.vue')),
  settings: defineAsyncComponent(() => import('./Settings.vue')),
};

export function hasTemplateView(slug: string): boolean {
  return slug in templateViews;
}
