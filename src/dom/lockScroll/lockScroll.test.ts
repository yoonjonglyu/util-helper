/**
 * @jest-environment jsdom
 */
import { lockScroll } from './lockScroll';

describe('lockScroll', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    lockScroll(false); // reset state
  });

  it('should lock body scroll with overflow: hidden and restore previous value', () => {
    document.body.style.overflow = 'auto';

    lockScroll(true);
    expect(document.body.style.overflow).toBe('hidden');

    lockScroll(false);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should lock and unlock a custom element target', () => {
    const customDiv = document.createElement('div');
    customDiv.style.overflow = 'scroll';

    lockScroll(true, customDiv);
    expect(customDiv.style.overflow).toBe('hidden');

    lockScroll(false, customDiv);
    expect(customDiv.style.overflow).toBe('scroll');
  });

  it('should handle undefined element or document safely', () => {
    expect(() => lockScroll(true, null as any)).not.toThrow();
  });
});
