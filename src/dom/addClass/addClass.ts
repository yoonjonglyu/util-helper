/**
 * Adds a class to a DOM element if it doesn't already have it.
 * @param element - The DOM element to which the class will be added.
 * @param className - The class name to add.
 */
function addClass(element: HTMLElement, className: string): void {
  if (!element || !className) return;

  if (!element.classList.contains(className)) {
    element.classList.add(className);
  }
}

export default addClass;
