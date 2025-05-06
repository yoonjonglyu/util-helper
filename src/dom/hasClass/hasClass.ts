/**
 * Checks if a given DOM element has a specific class.
 *
 * @param element - The DOM element to check.
 * @param className - The class name to look for.
 * @returns True if the element has the class, otherwise false.
 */
function hasClass(element: Element, className: string): boolean {
  if (!element || !className) {
    return false;
  }
  return element.classList.contains(className);
}

export default hasClass;
