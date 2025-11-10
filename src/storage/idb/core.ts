import { IDBOpenOptions, IDBMode } from './types';

const cache = new Map<string, IDBDatabase>();

export async function openDB(
  name: string,
  { version = 1, schema = {} }: IDBOpenOptions = {}
): Promise<IDBDatabase> {
  if (cache.has(name)) return cache.get(name)!;

  return new Promise((resolve, reject) => {
    const req = global.indexedDB.open(name, version);

    req.onupgradeneeded = () => {
      const db = req.result;
      Object.entries(schema).forEach(([store, options]) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, options);
        }
      });
    };

    req.onsuccess = () => {
      const db = req.result;
      cache.set(name, db);
      resolve(db);
    };

    req.onerror = () => reject(req.error);
  });
}

export async function transaction<T>(
  dbName: string,
  store: string,
  mode: IDBMode,
  fn: (storeObj: IDBObjectStore) => Promise<T> | T
): Promise<T> {
  const db = await openDB(dbName);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, mode);
    const storeObj = tx.objectStore(store);

    Promise.resolve(fn(storeObj))
      .then(result => {
        tx.oncomplete = () => resolve(result);
      })
      .catch(err => {
        tx.abort();
        reject(err);
      });

    tx.onerror = () => reject(tx.error);
  });
}

export async function get<T = any>(
  dbName: string,
  store: string,
  key: IDBValidKey
): Promise<T | undefined> {
  return transaction(dbName, store, 'readonly', storeObj => {
    return new Promise((resolve, reject) => {
      const req = storeObj.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  });
}

export async function put<T = any>(
  dbName: string,
  store: string,
  value: T
): Promise<IDBValidKey> {
  return transaction(dbName, store, 'readwrite', storeObj => {
    return new Promise((resolve, reject) => {
      const req = storeObj.put(value);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  });
}

export async function del(
  dbName: string,
  store: string,
  key: IDBValidKey
): Promise<void> {
  return transaction(dbName, store, 'readwrite', storeObj => {
    return new Promise((resolve, reject) => {
      const req = storeObj.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}
export async function clear(
  dbName: string,
  store: string
): Promise<void> {
  return transaction(dbName, store, 'readwrite', storeObj => {
    return new Promise((resolve, reject) => {
      const req = storeObj.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}

export async function deleteDB(name: string): Promise<void> {
  if (cache.has(name)) {
    const db = cache.get(name)!;
    db.close();
    cache.delete(name);
  }

  return new Promise((resolve, reject) => {
    const req = global.indexedDB.deleteDatabase(name);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    req.onblocked = () => {
      console.warn(`Delete DB "${name}" is blocked.`);
    };
  });
}