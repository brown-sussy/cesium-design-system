import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copy a string to the clipboard, and flip a flag for a moment afterwards.
 *
 * The flag is the whole point: a copy control that gives no feedback is
 * indistinguishable from one that failed. The reset timer lives in a ref so a
 * second click restarts the window instead of stacking timers that fire out of
 * order.
 */
export function useCopy(resetAfter = 1600) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), resetAfter);
      } catch {
        // The clipboard is unavailable in insecure contexts and can be denied
        // outright. Say nothing rather than reporting a success that did not
        // happen — the text is still selectable by hand.
        setCopied(false);
      }
    },
    [resetAfter],
  );

  return { copied, copy };
}
