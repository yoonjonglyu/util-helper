import isBrowser from '../../typecheck/isBrowser/isBrowser';

function getQuery(): URLSearchParams | null {
  if (!isBrowser()) return null;
  return new URLSearchParams(window.location.search);
}

export default getQuery;
