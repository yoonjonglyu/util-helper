/**
 * @jest-environment jsdom
 */
import addClass from './addClass';

describe('addClass', () => {
  let element: HTMLElement;

  beforeEach(() => {
    // Create a mock DOM element for testing
    element = document.createElement('div');
  });

  it('should add a class to the element if it does not already have it', () => {
    addClass(element, 'test-class');
    expect(element.classList.contains('test-class')).toBe(true);
  });

  it('should not add a class if the element already has it', () => {
    element.classList.add('test-class');
    addClass(element, 'test-class');
    expect(element.classList.length).toBe(1);
  });

  it('should handle adding multiple different classes sequentially', () => {
    addClass(element, 'class-one');
    addClass(element, 'class-two');
    expect(element.classList.contains('class-one')).toBe(true);
    expect(element.classList.contains('class-two')).toBe(true);
  });

  it('should not throw an error if an empty class name is provided', () => {
    expect(() => addClass(element, '')).not.toThrow();
    expect(element.classList.length).toBe(0);
  });

  it('should not throw an error if the element is already empty', () => {
    expect(() => addClass(element, 'new-class')).not.toThrow();
    expect(element.classList.contains('new-class')).toBe(true);
  });
});