/**
 * Hand a string to the browser as a file.
 *
 * The object URL is revoked on a timer rather than in the same tick as the
 * click: Safari cancels a download whose URL is already gone by the time it
 * starts reading it. The anchor is attached to the document because Firefox
 * ignores a click on a detached node.
 */
export function download(filename: string, text: string): void {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
