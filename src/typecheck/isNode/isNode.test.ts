import isNode from './isNode';

describe('isNode', () => {
  it('should return true in Node environment', () => {
    expect(isNode()).toBe(true);
  });
});
