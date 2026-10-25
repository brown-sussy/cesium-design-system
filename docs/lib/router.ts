import { useEffect, useState } from 'react';

export function normalize(hash: string): string {
  const path = hash.replace(/^#/, '');
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

export function navigate(to: string) {
  if (normalize(location.hash) === to) return;
  location.hash = to;
}

export function useRoute(): string {
  const [path, setPath] = useState(() => normalize(location.hash));

  useEffect(() => {
    const onHash = () => {
      setPath(normalize(location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return path;
}
