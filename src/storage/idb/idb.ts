import * as core from './core';
import * as cursor from './cursor';

export const idb = {
  open: core.openDB,
  get: core.get,
  put: core.put,
  delete: core.del,
  transaction: core.transaction,
  clear: core.clear,
  deleteDB: core.deleteDB,
  cursor: {
    each: cursor.each,
    query: cursor.query,
  },
};

export default idb;
