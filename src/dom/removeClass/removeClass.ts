/**
 * Removes a class from a DOM element if it exists.
 *
 * @param element - The target DOM element.
 * @param className - The class name to remove.
 */
function removeClass(element: HTMLElement, className: string): void {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  }
}
export default removeClass;
