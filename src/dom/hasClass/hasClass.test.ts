/**
 * @jest-environment jsdom
 */
import hasClass from './hasClass';

describe('hasClass', () => {
  test('should return true if the element has the specified class', () => {
    const element = document.createElement('div');
    element.className = 'test-class';
    expect(hasClass(element, 'test-class')).toBe(true);
  });

  test('should return false if the element does not have the specified class', () => {
    const element = document.createElement('div');
    element.className = 'test-class';
    expect(hasClass(element, 'another-class')).toBe(false);
  });

  test('should return false if the element is null', () => {
    expect(hasClass(null as unknown as Element, 'test-class')).toBe(false);
  });

  test('should return false if the className is an empty string', () => {
    const element = document.createElement('div');
    element.className = 'test-class';
    expect(hasClass(element, '')).toBe(false);
  });

  test('should return false if the className is null', () => {
    const element = document.createElement('div');
    element.className = 'test-class';
    expect(hasClass(element, null as unknown as string)).toBe(false);
  });

  test('should return false if the element has no classes', () => {
    const element = document.createElement('div');
    expect(hasClass(element, 'test-class')).toBe(false);
  });
});
