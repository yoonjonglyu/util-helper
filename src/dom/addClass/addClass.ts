/**
 * Adds a class to a DOM element if it doesn't already have it.
 * @param element - The DOM element to which the class will be added.
 * @param className - The class name to add.
 */
function addClass(
  element: HTMLElement | Element,
  ...classNames: string[]
): void {
  if (!element || !element.classList) return;

  for (const name of classNames) {
    if (!name) continue;
    const tokens = name.trim().split(/\s+/).filter(Boolean);
    if (tokens.length > 0) {
      element.classList.add(...tokens);
    }
  }
}

export default addClass;
