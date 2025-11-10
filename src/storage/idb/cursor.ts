import { transaction } from './core';
import { CursorOptions } from './types';

/**
 * 기본 커서 순회
 */
export async function each<T = any>(
  dbName: string,
  store: string,
  callback: (value: T, key: IDBValidKey, cursor: IDBCursorWithValue) => void
): Promise<void> {
  return transaction(dbName, store, 'readonly', storeObj => {
    return new Promise((resolve, reject) => {
      const req = storeObj.openCursor();
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor) {
          callback(cursor.value, cursor.key, cursor);
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => reject(req.error);
    });
  });
}

/**
 * 고급 커서 검색 (limit, offset, filter, sort 포함)
 */
export async function query<T = any>(
  dbName: string,
  store: string,
  options: CursorOptions<T> = {}
): Promise<T[]> {
  const {
    range = null,
    offset = 0,
    limit = Infinity,
    filter,
    sort,
  } = options;

  return transaction(dbName, store, 'readonly', storeObj => {
    return new Promise<T[]>((resolve, reject) => {
      const result: T[] = [];
      let skipped = 0;

      const req = storeObj.openCursor(range);

      req.onsuccess = () => {
        const cursor = req.result;
        if (!cursor) {
          if (sort) result.sort(sort);
          resolve(result);
          return;
        }

        const value = cursor.value as T;

        if (filter && !filter(value, cursor.key)) {
          cursor.continue();
          return;
        }

        if (skipped < offset) {
          skipped++;
          cursor.continue();
          return;
        }

        result.push(value);
        if (result.length < limit) {
          cursor.continue();
        } else {
          if (sort) result.sort(sort);
          resolve(result);
        }
      };

      req.onerror = () => reject(req.error);
    });
  });
}
