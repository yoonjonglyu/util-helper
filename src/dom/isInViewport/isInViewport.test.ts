/**
 * @jest-environment jsdom
 */
import { isInViewport } from './isInViewport';

describe('isInViewport', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);

    // Mock window dimensions
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 });
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
  });

  afterEach(() => {
    element?.remove();
  });

  it('should return true when element is partially or fully inside viewport', () => {
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 200,
      left: 100,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    expect(isInViewport(element)).toBe(true);
  });

  it('should return false when element is completely out of view', () => {
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 1200,
      bottom: 1300,
      left: 100,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 1200,
      toJSON: () => {},
    });

    expect(isInViewport(element)).toBe(false);
  });

  it('should respect fullyInView option', () => {
    // Top is visible, bottom is beyond viewport height (768)
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 500,
      bottom: 900,
      left: 100,
      right: 200,
      width: 100,
      height: 400,
      x: 100,
      y: 500,
      toJSON: () => {},
    });

    expect(isInViewport(element, { fullyInView: false })).toBe(true);
    expect(isInViewport(element, { fullyInView: true })).toBe(false);
  });

  it('should handle offset option', () => {
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      top: 800,
      bottom: 900,
      left: 100,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 800,
      toJSON: () => {},
    });

    expect(isInViewport(element)).toBe(false);
    expect(isInViewport(element, { offset: 100 })).toBe(true);
  });

  it('should return false safely for null or undefined elements', () => {
    expect(isInViewport(null)).toBe(false);
    expect(isInViewport(undefined)).toBe(false);
  });
});
