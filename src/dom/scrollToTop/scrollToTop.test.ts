/**
 * @jest-environment jsdom
 */

import scrollToTop from './scrollToTop';

describe('scrollToTop', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('should scroll window to top with default smooth behavior', () => {
    scrollToTop();
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  it('should scroll window with auto behavior when smooth is false', () => {
    scrollToTop(window, false);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  });

  it('should scroll an element with scrollTo method', () => {
    const el = document.createElement('div');
    el.scrollTo = jest.fn();

    scrollToTop(el, true);
    expect(el.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
});
