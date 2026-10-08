export interface InViewportOptions {
  /** Additional margin around the viewport in pixels. Default is 0. */
  offset?: number;
  /** If true, requires the entire element to be inside the viewport. Default is false (any partial overlap counts). */
  fullyInView?: boolean;
}

/**
 * Checks if an element is visible within the browser's viewport.
 * Safe for SSR and non-browser environments.
 *
 * @param element The DOM element to check.
 * @param options Options for offset and full visibility requirement.
 * @returns True if element is in viewport, false otherwise.
 */
export const isInViewport = (
  element: Element | null | undefined,
  options: InViewportOptions = {}
): boolean => {
  if (
    typeof window === 'undefined' ||
    typeof document === 'undefined' ||
    !element ||
    typeof element.getBoundingClientRect !== 'function'
  ) {
    return false;
  }

  const { offset = 0, fullyInView = false } = options;
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  if (fullyInView) {
    return (
      rect.top >= -offset &&
      rect.left >= -offset &&
      rect.bottom <= windowHeight + offset &&
      rect.right <= windowWidth + offset
    );
  }

  return (
    rect.top <= windowHeight + offset &&
    rect.bottom >= -offset &&
    rect.left <= windowWidth + offset &&
    rect.right >= -offset
  );
};

export default isInViewport;
