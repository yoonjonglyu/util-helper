import getQuery from './getQuery/getQuery';
import setQuery from './setQuery/setQuery';
declare const QueryString: Readonly<{
    getQuery: typeof getQuery;
    setQuery: typeof setQuery;
}>;
export default QueryString;
