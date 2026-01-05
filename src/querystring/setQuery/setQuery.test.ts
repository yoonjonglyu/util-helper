/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://www.google.com/search?q=google"}
 */

import setQuery from './setQuery';

describe('setQuery', () => {
  test('history push querystring', () => {
    setQuery(new URLSearchParams('foo=bar'));

    expect(window.location.search).toBe('?foo=bar');
    expect(window.location.pathname).toBe('/search');
    expect(window.location.origin).toBe('https://www.google.com');
  });
});
