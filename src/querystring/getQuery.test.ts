import getQuery from './getQuery';

describe('getQuery', () => {
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
    });
  });

  test('getQuery return URLSearchParams', () => {
    window.location.search = '?test=google&name=top';
    expect(getQuery()).toEqual(new URLSearchParams(window.location.search));
    expect(getQuery().get('test')).toBe('google');
    expect(getQuery().get('name')).toBe('top');
    expect(getQuery().has('asdasd')).toBeFalsy();
  });
});
