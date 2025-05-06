/**
 * @jest-environment jsdom
 */

import isTouchDevice from './isTouchDevice';

describe('isTouchDevice', () => {
  it('should return true if "ontouchstart" exists in window', () => {
    Object.defineProperty(window, 'ontouchstart', {
      value: true,
      configurable: true,
    });
    expect(isTouchDevice()).toBe(true);
    delete (window as any).ontouchstart;
  });

  it('should return true if navigator.maxTouchPoints is greater than 0', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 1,
      configurable: true,
    });
    expect(isTouchDevice()).toBe(true);
    delete (navigator as any).maxTouchPoints;
  });

  it('should return true if navigator.msMaxTouchPoints is greater than 0', () => {
    Object.defineProperty(navigator, 'msMaxTouchPoints', {
      value: 1,
      configurable: true,
    });
    expect(isTouchDevice()).toBe(true);
    delete (navigator as any).msMaxTouchPoints;
  });

  it('should return false if none of the touch properties are present', () => {
    expect(isTouchDevice()).toBe(false);
  });
});