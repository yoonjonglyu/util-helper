import isBrowser from '../../typecheck/isBrowser/isBrowser';

function setQuery(query: URLSearchParams) {
  if (isBrowser()) window.history.pushState({}, '', `?${query.toString()}`);
}

export default setQuery;
