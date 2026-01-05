/**
 * @jest-environment jsdom
 */
import getQuery from './getQuery';

describe('getQuery', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        ...window.location,
        search: '?test=google&name=top',
      },
    });
  });

  test('getQuery return URLSearchParams', () => {
    const query = getQuery();

    expect(query).toBeInstanceOf(URLSearchParams);
    expect(query?.get('test')).toBe('google');
    expect(query?.get('name')).toBe('top');
    expect(query?.has('asdasd')).toBe(false);
  });
});
