import { IDBOpenOptions, IDBMode } from './types';

const cache = new Map<string, IDBDatabase>();

export async function openDB(
  name: string,
  config: IDBOpenOptions = {},
): Promise<IDBDatabase> {
  const { version, schema = {} } = config;
  if (cache.has(name)) {
    // 버전이 명시되지 않았다면 기존 캐시된 연결(DB) 반환
    if (version === undefined) {
      return cache.get(name)!;
    }

    // 버전이 명시되었는데 (업그레이드 또는 다운그레이드 시도), 
    // 기존 캐시 연결을 닫아 onblocked 이벤트를 방지합니다.
    const cachedDb = cache.get(name)!;
    
    // 요청된 버전이 캐시된 버전과 다를 때만 닫고 제거
    if (version !== cachedDb.version) { 
        cachedDb.close(); 
        cache.delete(name); 
    } else {
        // 요청된 버전과 캐시 버전이 같으면 캐시 반환 (불필요한 open 방지)
        return cachedDb;
    }
  }

  return new Promise((resolve, reject) => {
    const req = globalThis.indexedDB.open(name, version);

    req.onupgradeneeded = () => {
      const db = req.result;
      Object.entries(schema).forEach(([store, options]) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, options);
        }
      });
    };
    // onblocked 이벤트 핸들링 추가 (디버깅 및 안전성 확보)
    req.onblocked = () => {
      console.warn(
        `DB upgrade for "${name}" is blocked by an existing open connection.`,
      );
      // Note: fake-indexeddb 환경에서는 이 핸들러가 발생하면 타임아웃을 유발할 수 있습니다.
      // 위의 close() 로직으로 해결되기를 기대합니다.
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
  fn: (storeObj: IDBObjectStore) => Promise<T> | T,
): Promise<T> {
  const db = await openDB(dbName);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, mode);
    const storeObj = tx.objectStore(store);

    Promise.resolve(fn(storeObj))
      .then((result) => {
        tx.oncomplete = () => resolve(result);
      })
      .catch((err) => {
        tx.abort();
        reject(err);
      });

    tx.onerror = () => reject(tx.error);
  });
}

export async function get<T = any>(
  dbName: string,
  store: string,
  key: IDBValidKey,
): Promise<T | undefined> {
  return transaction(dbName, store, 'readonly', (storeObj) => {
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
  value: T,
): Promise<IDBValidKey> {
  return transaction(dbName, store, 'readwrite', (storeObj) => {
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
  key: IDBValidKey,
): Promise<void> {
  return transaction(dbName, store, 'readwrite', (storeObj) => {
    return new Promise((resolve, reject) => {
      const req = storeObj.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  });
}
export async function clear(dbName: string, store: string): Promise<void> {
  return transaction(dbName, store, 'readwrite', (storeObj) => {
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
    const req = globalThis.indexedDB.deleteDatabase(name);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    req.onblocked = () => {
      console.warn(`Delete DB "${name}" is blocked.`);
    };
  });
}
