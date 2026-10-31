/**
 * Theme and shape preset, held at module scope so the header and every page
 * read the same state. Both persist under the keys the React site uses, so the
 * two sites agree about what the reader chose.
 */
import { readonly, ref } from 'vue';

export type Theme = 'dark' | 'light';
export type StylePreset = 'classic' | 'plus';

const THEME_KEY = 'cesium-theme';
const STYLE_KEY = 'cesium-style';

function stored(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    // Private mode. The visit still works, it just will not be remembered.
    return null;
  }
}

/**
 * `data-theme` is already on `<html>` — the pre-paint script in index.html put
 * it there, from the same key — so it is the authoritative value. Read it as a
 * *value*: `ref(() => …)` stores the function instead of calling it, which
 * silently resets every light-theme reader to dark on boot.
 */
function readTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === 'light' || attr === 'dark') return attr;
  return stored(THEME_KEY) === 'light' ? 'light' : 'dark';
}

function readStyle(): StylePreset {
  const attr = document.documentElement.dataset.style;
  if (attr === 'plus' || attr === 'classic') return attr;
  return stored(STYLE_KEY) === 'plus' ? 'plus' : 'classic';
}

const theme = ref<Theme>(readTheme());
const style = ref<StylePreset>(readStyle());

export const useTheme = () => {
  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme.value;
    try {
      localStorage.setItem(THEME_KEY, theme.value);
    } catch {
      /* private mode — the toggle still works for this visit */
    }
  };
  return { theme: readonly(theme), toggle };
};

export const useStyle = () => {
  const setStyle = (next: StylePreset) => {
    style.value = next;
    if (next === 'classic') delete document.documentElement.dataset.style;
    else document.documentElement.dataset.style = next;
    try {
      localStorage.setItem(STYLE_KEY, next);
    } catch {
      /* ignore */
    }
  };
  return { style: readonly(style), setStyle };
};

/** Apply the restored theme on boot, so `data-theme` is always explicit. */
export function initTheme() {
  document.documentElement.dataset.theme = theme.value;
}
