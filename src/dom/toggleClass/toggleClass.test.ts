/**
 * @jest-environment jsdom
 */

import toggleClass from './toggleClass';

describe('toggleClass', () => {
  let element: HTMLElement;

  beforeEach(() => {
    // Create a mock DOM element for testing
    element = document.createElement('div');
  });

  it('should add the class if it does not exist', () => {
    toggleClass(element, 'test-class');
    expect(element.classList.contains('test-class')).toBe(true);
  });

  it('should remove the class if it exists', () => {
    element.classList.add('test-class');
    toggleClass(element, 'test-class');
    expect(element.classList.contains('test-class')).toBe(false);
  });

  it('should throw an error if element is not provided', () => {
    expect(() =>
      toggleClass(null as unknown as HTMLElement, 'test-class'),
    ).toThrow('Both element and className are required.');
  });

  it('should throw an error if className is not provided', () => {
    expect(() => toggleClass(element, '')).toThrow(
      'Both element and className are required.',
    );
  });

  it('should handle multiple toggles correctly', () => {
    toggleClass(element, 'test-class');
    expect(element.classList.contains('test-class')).toBe(true);

    toggleClass(element, 'test-class');
    expect(element.classList.contains('test-class')).toBe(false);

    toggleClass(element, 'test-class');
    expect(element.classList.contains('test-class')).toBe(true);
  });
});
