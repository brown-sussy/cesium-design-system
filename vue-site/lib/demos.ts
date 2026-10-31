/**
 * Demo resolution.
 *
 * Every demo is a real `.vue` file under `vue-site/demos/`. Two globs point at
 * the same files: one loads the component that runs, the other loads the source
 * that is displayed. They cannot disagree, which is the whole point — a code
 * sample that was typed into a string by hand is a sample that stops compiling
 * the day the API changes.
 */
import type { Component } from 'vue';

const modules = import.meta.glob('../demos/*.vue') as Record<
  string,
  () => Promise<{ default: Component }>
>;

const sources = import.meta.glob('../demos/*.vue', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

const key = (name: string) => `../demos/${name}.vue`;

export function hasDemo(name: string): boolean {
  return key(name) in modules;
}

export function loadDemo(name: string): Promise<{ default: Component }> | undefined {
  return modules[key(name)]?.();
}

export function loadSource(name: string): Promise<string> | undefined {
  return sources[key(name)]?.();
}

export const demoCount = Object.keys(modules).length;
