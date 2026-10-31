/**
 * Hash router — the same shape the React docs use, so a deep link can be
 * pasted between the two sites with only the path prefix changed.
 *
 *   #/                     overview
 *   #/components           index
 *   #/components/<slug>    one component
 *
 * No history API: the site is published as a static folder under a subpath,
 * and a hash route never asks the server for a file it does not have.
 */
import { readonly, ref } from 'vue';

function currentPath(): string {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

const route = ref(currentPath());

window.addEventListener('hashchange', () => {
  route.value = currentPath();
});

export const useRoute = () => readonly(route);

export function navigate(to: string) {
  if (window.location.hash === `#${to}`) return;
  window.location.hash = to;
}

/** Scroll the content pane back to the top — the shell scrolls, not the window. */
export function scrollToTop() {
  const main = document.querySelector('.doc-main');
  if (main) main.scrollTop = 0;
  window.scrollTo(0, 0);
}
