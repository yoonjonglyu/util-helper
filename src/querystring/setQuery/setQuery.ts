function setQuery(query: URLSearchParams) {
  window.history.pushState({}, '', `?${query.toString()}`);
}

export default setQuery;
