/**
 * Removes a class from a DOM element if it exists.
 *
 * @param element - The target DOM element.
 * @param className - The class name to remove.
 */
function removeClass(
  element: HTMLElement | Element,
  ...classNames: string[]
): void {
  if (!element || !element.classList) return;

  for (const name of classNames) {
    if (!name) continue;
    const tokens = name.trim().split(/\s+/).filter(Boolean);
    if (tokens.length > 0) {
      element.classList.remove(...tokens);
    }
  }
}
export default removeClass;
