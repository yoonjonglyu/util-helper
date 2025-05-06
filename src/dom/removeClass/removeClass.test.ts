/**
 * @jest-environment jsdom
 */

import removeClass from './removeClass';

describe('removeClass', () => {
  let element: HTMLElement;

  beforeEach(() => {
    // Create a mock DOM element for testing
    element = document.createElement('div');
    element.className = 'test-class another-class';
  });

  it('should remove the specified class from the element', () => {
    removeClass(element, 'test-class');
    expect(element.classList.contains('test-class')).toBe(false);
    expect(element.classList.contains('another-class')).toBe(true);
  });

  it('should not throw an error if the class does not exist', () => {
    expect(() => removeClass(element, 'non-existent-class')).not.toThrow();
    expect(element.classList.contains('another-class')).toBe(true);
  });

  it('should do nothing if the element has no classes', () => {
    element.className = '';
    removeClass(element, 'test-class');
    expect(element.classList.contains('test-class')).toBe(false);
  });

  it('should handle elements with multiple instances of the same class', () => {
    element.className = 'test-class test-class another-class';
    removeClass(element, 'test-class');
    expect(element.classList.contains('test-class')).toBe(false);
    expect(element.classList.contains('another-class')).toBe(true);
  });

  it('should not affect other classes on the element', () => {
    removeClass(element, 'another-class');
    expect(element.classList.contains('test-class')).toBe(true);
    expect(element.classList.contains('another-class')).toBe(false);
  });
});