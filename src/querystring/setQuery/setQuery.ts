import isBrowser from '../../typecheck/isBrowser/isBrowser';

interface SetQueryOptions {
  replace?: boolean;
}

function setQuery(query: URLSearchParams, options?: SetQueryOptions): void {
  if (!isBrowser()) return;

  const queryString = query.toString();
  const searchPart = queryString ? `?${queryString}` : '';
  const hashPart = window.location.hash || '';
  const newUrl = `${window.location.pathname}${searchPart}${hashPart}`;

  if (options?.replace) {
    window.history.replaceState({}, '', newUrl);
  } else {
    window.history.pushState({}, '', newUrl);
  }
}

export default setQuery;
