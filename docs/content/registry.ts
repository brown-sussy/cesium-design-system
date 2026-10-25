import { actionsForms } from './actions-forms';
import { display } from './display';
import { layoutData } from './layout-data';
import { navOverlayHud } from './nav-overlay-hud';
import type { Category, ComponentDoc } from './types';

export const registry: ComponentDoc[] = [...actionsForms, ...display, ...layoutData, ...navOverlayHud];

export const categoryOrder: Category[] = [
  'Actions',
  'Forms',
  'Display',
  'Layout',
  'Data',
  'Navigation',
  'Overlay',
  'HUD',
];

export const byCategory: Array<{ category: Category; docs: ComponentDoc[] }> = categoryOrder
  .map((category) => ({ category, docs: registry.filter((d) => d.category === category) }))
  .filter((group) => group.docs.length > 0);

export function findDoc(slug: string): ComponentDoc | undefined {
  return registry.find((doc) => doc.slug === slug);
}

export const componentCount = registry.length;
