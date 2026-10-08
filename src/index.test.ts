import UtilHelper, {
  chunk,
  pick,
  pMap,
  kebabCase,
  escapeHtml,
  isInViewport,
  lockScroll,
} from './index';

describe('Root exports', () => {
  it('should export all utility modules on UtilHelper default export', () => {
    expect(UtilHelper.TypeCheck).toBeDefined();
    expect(UtilHelper.Array).toBeDefined();
    expect(UtilHelper.Object).toBeDefined();
    expect(UtilHelper.Api).toBeDefined();
    expect(UtilHelper.Format).toBeDefined();
    expect(UtilHelper.Dom).toBeDefined();
    expect(UtilHelper.Storage).toBeDefined();
  });

  it('should export named utility functions', () => {
    expect(typeof chunk).toBe('function');
    expect(typeof pick).toBe('function');
    expect(typeof pMap).toBe('function');
    expect(typeof kebabCase).toBe('function');
    expect(typeof escapeHtml).toBe('function');
    expect(typeof isInViewport).toBe('function');
    expect(typeof lockScroll).toBe('function');
  });
});
