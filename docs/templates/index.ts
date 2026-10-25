import type { ComponentType } from 'react';

import { templateMeta, type TemplateMeta } from './meta';
import Homepage from './homepage';
import homepageSource from './homepage.tsx?raw';
import SignIn from './sign-in';
import signInSource from './sign-in.tsx?raw';
import Settings from './settings';
import settingsSource from './settings.tsx?raw';
import NotFound from './not-found';
import notFoundSource from './not-found.tsx?raw';

export type { TemplateCategory, TemplateMeta } from './meta';
export { templateMeta, findTemplateMeta } from './meta';

export interface TemplateDoc extends TemplateMeta {
  component: ComponentType;
  /** Verbatim source of the file above — `?raw`, so it can never drift. */
  source: string;
}

/**
 * The rendered page and its source, keyed by slug. Metadata lives in `./meta`
 * so that listing a template does not import four pages' worth of JSX.
 */
const rendered: Record<string, { component: ComponentType; source: string }> = {
  homepage: { component: Homepage, source: homepageSource },
  'sign-in': { component: SignIn, source: signInSource },
  settings: { component: Settings, source: settingsSource },
  'not-found': { component: NotFound, source: notFoundSource },
};

export const templates: TemplateDoc[] = templateMeta.map((meta) => {
  const impl = rendered[meta.slug];
  // The generator that produces the site fails loudly if a template has no
  // implementation, so this cannot be a silent empty card at runtime.
  if (!impl) throw new Error(`template "${meta.slug}" has no implementation`);
  return { ...meta, ...impl };
});

export const findTemplate = (slug: string) => templates.find((t) => t.slug === slug);
