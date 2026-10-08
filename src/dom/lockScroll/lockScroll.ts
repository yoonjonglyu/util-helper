let originalOverflow: string | null = null;

/**
 * Locks or unlocks scrolling on document body or a specified target element.
 * Useful for modal dialogs and overlay drawers to prevent background page scrolling.
 * Safe for SSR and non-browser environments.
 *
 * @param lock Whether to lock scrolling (true) or restore scrolling (false).
 * @param target Optional custom element to lock/unlock scroll on (defaults to document.body).
 */
export const lockScroll = (lock: boolean = true, target?: HTMLElement): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const el = target || document.body;
  if (!el || !el.style) {
    return;
  }

  if (lock) {
    if (originalOverflow === null) {
      originalOverflow = el.style.overflow || '';
    }
    el.style.overflow = 'hidden';
  } else {
    if (originalOverflow !== null) {
      el.style.overflow = originalOverflow;
      originalOverflow = null;
    } else {
      el.style.overflow = '';
    }
  }
};

export default lockScroll;
