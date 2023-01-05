function getQuery() {
  return new URLSearchParams(window.location.search);
}

export default getQuery;
