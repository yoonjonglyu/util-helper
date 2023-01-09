import setQuery from './setQuery';

describe('setQuery', () => {
  beforeEach(() => {
    global.window = Object.create({
      location: {
        ancestorOrigins: null,
        assign: null,
        hash: '',
        host: 'www.google.com',
        hostname: 'www.google.com',
        href: 'https://www.google.com/search?q=google&oq=google&aqs=chrome..69i57j69i60l3.1669j0j7&sourceid=chrome&ie=UTF-8',
        origin: 'https://www.google.com',
        pathname: '/search',
        port: '',
        protocol: 'https:',
        reload: null,
        replace: null,
        search:
          '?q=google&oq=google&aqs=chrome..69i57j69i60l3.1669j0j7&sourceid=chrome&ie=UTF-8',
      },
      history: {},
    });
  });
  test('history push querystring', () => {
    window.history.pushState = jest
      .fn()
      .mockImplementation((state: any, title: string, url: string) => {
        global.window.location.href =
          global.window.location.origin + global.window.location.pathname + url;
      });

    setQuery(new URLSearchParams('foo=bar'));
    expect(window.location.href).toBe(
      window.location.origin + window.location.pathname + '?foo=bar',
    );
  });
});
