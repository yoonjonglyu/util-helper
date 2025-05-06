/**
 * Toggles a class on a given DOM element.
 *
 * @param element - The target DOM element.
 * @param className - The class name to toggle.
 */
function toggleClass(element: HTMLElement, className: string): void {
  if (!element || !className) {
    throw new Error('Both element and className are required.');
  }

  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}
export default toggleClass;
