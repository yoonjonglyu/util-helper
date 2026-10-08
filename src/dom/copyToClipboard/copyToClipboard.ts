import isBrowser from '../../typecheck/isBrowser/isBrowser';

/**
 * Copies the given text to the clipboard.
 * Uses navigator.clipboard with fallback to document.execCommand('copy').
 * @param text The text to copy.
 * @returns Promise<boolean> indicating whether the copy operation succeeded.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  if (!isBrowser() || typeof text !== 'string') {
    return false;
  }

  // Modern Clipboard API
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback if clipboard API throws (e.g. permission denied or insecure context)
    }
  }

  // Fallback using temporary textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '-9999px';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');

    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, text.length);

    const successful = document.execCommand('copy');
    textArea.remove();
    return successful;
  } catch {
    return false;
  }
}

export default copyToClipboard;
