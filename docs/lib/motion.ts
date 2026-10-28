import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Marks the document as motion-capable and reveals blocks as they enter the
 * viewport. Runs in a layout effect so elements never flash visible first.
 *
 * `key` re-runs the scan when the route changes.
 */
export function useScrollReveal(key: string) {
  useLayoutEffect(() => {
    document.documentElement.classList.add('cs-motion-ready');

    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>('.doc-section, .home-section, .doc-example'),
    );

    if (!('IntersectionObserver' in window)) {
      blocks.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.01 },
    );

    blocks.forEach((el) => {
      el.classList.add('cs-reveal');
      observer.observe(el);
    });

    // Index rows get their own stagger, indexed within each category block.
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.comp-row'));
    cards.forEach((card, i) => {
      card.classList.add('cs-reveal');
      card.style.setProperty('--cs-anim-delay', `${(i % 8) * 35}ms`);
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [key]);
}

/** Document scroll progress, 0 → 1. Used for the header reading line. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      frame.current = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return progress;
}

/**
 * Counts a number up once it mounts. Keeps the digit count stable so the
 * layout does not jitter while it runs.
 */
export function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(target);
  const decimals = String(target).includes('.') ? String(target).split('.')[1].length : 0;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = target * eased;
      setValue(decimals ? Number(next.toFixed(decimals)) : Math.round(next));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, decimals]);

  return value;
}
