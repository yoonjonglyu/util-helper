import isBrowser from '../../typecheck/isBrowser/isBrowser';

/**
 * Smoothly or instantly scrolls the window or a container element to the top.
 * @param target Target element or window to scroll (defaults to window).
 * @param smooth Whether to use smooth scrolling behavior (defaults to true).
 */
function scrollToTop(
  target?: Element | Window,
  smooth: boolean = true,
): void {
  if (!isBrowser()) return;

  const behavior: ScrollBehavior = smooth ? 'smooth' : 'auto';

  if (!target || target === window) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  } else if ('scrollTo' in target && typeof (target as Element).scrollTo === 'function') {
    (target as Element).scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  } else {
    (target as Element).scrollTop = 0;
  }
}

export default scrollToTop;
