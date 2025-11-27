import 'fake-indexeddb/auto';
import idb from './idb';

const DB_NAME = 'test-db';
const STORE_NAME = 'test-store';

beforeEach(async () => {
  await idb.deleteDB(DB_NAME);
  await idb.open(DB_NAME, {
    version: 1,
    schema: {
      [STORE_NAME]: { keyPath: 'id', autoIncrement: true },
    },
  });


  // 샘플 데이터 삽입
  await idb.put(DB_NAME, STORE_NAME, { id: 1, name: 'Apple', price: 100 });
  await idb.put(DB_NAME, STORE_NAME, { id: 2, name: 'Banana', price: 80 });
  await idb.put(DB_NAME, STORE_NAME, { id: 3, name: 'Cherry', price: 120 });
});

afterEach(async () => {
  await idb.deleteDB(DB_NAME);
});

describe('isa-util/idb', () => {
  test('should open database and create object store', async () => {
    const db = await idb.open(DB_NAME);
    expect(db.objectStoreNames.contains(STORE_NAME)).toBe(true);
  });

  test('should insert and retrieve an item', async () => {
    const value = { id: 1, name: 'Alice' };
    const key = await idb.put(DB_NAME, STORE_NAME, value);
    const result = await idb.get(DB_NAME, STORE_NAME, key);

    expect(result).toEqual(value);
  });

  test('should delete an item', async () => {
    const value = { id: 1, name: 'Bob' };
    const key = await idb.put(DB_NAME, STORE_NAME, value);
    await idb.delete(DB_NAME, STORE_NAME, key);
    const result = await idb.get(DB_NAME, STORE_NAME, key);

    expect(result).toBeUndefined();
  });

  test('should clear all items in a store', async () => {
    await idb.put(DB_NAME, STORE_NAME, { id: 1, value: 'A' });
    await idb.put(DB_NAME, STORE_NAME, { id: 2, value: 'B' });
    await idb.clear(DB_NAME, STORE_NAME);

    const db = await idb.open(DB_NAME);
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();

    const result = await new Promise<any[]>((resolve, reject) => {
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    expect(result.length).toBe(0);
  });

  test('should handle deleting database gracefully', async () => {
    await idb.deleteDB(DB_NAME);
    const db = await idb.open(DB_NAME, {
      version: 1,
      schema: {
        [STORE_NAME]: { keyPath: 'id' },
      },
    });
    expect(db.objectStoreNames.contains(STORE_NAME)).toBe(true);
  });
    test('each() should iterate over all items', async () => {
    const values: any[] = [];
    await idb.cursor.each(DB_NAME, STORE_NAME, (value: any, key: any) => {
      values.push({ key, value });
    });

    expect(values.length).toBe(3);
    expect(values.map(v => v.value.name)).toEqual(
      expect.arrayContaining(['Apple', 'Banana', 'Cherry'])
    );
  });

  test('query() should return all items by default', async () => {
    const results = await idb.cursor.query(DB_NAME, STORE_NAME);
    expect(results.length).toBe(3);
    expect(results[0]).toHaveProperty('name');
  });

  test('query() should support filter', async () => {
    const results = await idb.cursor.query(DB_NAME, STORE_NAME, {
      filter: (v:any) => v.price > 90,
    });
    const names = results.map(v => v.name);
    expect(names).toEqual(expect.arrayContaining(['Apple', 'Cherry']));
    expect(names).not.toContain('Banana');
  });

  test('query() should support offset and limit', async () => {
    const results = await idb.cursor.query(DB_NAME, STORE_NAME, {
      offset: 1,
      limit: 1,
    });
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Banana');
  });

  test('query() should support custom sort', async () => {
    const results = await idb.cursor.query(DB_NAME, STORE_NAME, {
      sort: (a: any, b: any) => b.price - a.price,
    });
    expect(results[0].name).toBe('Cherry'); // highest price first
  });

  test('query() should handle empty result gracefully', async () => {
    const results = await idb.cursor.query(DB_NAME, STORE_NAME, {
      filter: (v:any) => v.price > 1000,
    });
    expect(results).toEqual([]);
  });
  test('db version upgrade should create new object store', async () => {
    const NEW_STORE = 'new-store';
    await idb.open(DB_NAME, {
      version: 2,
      schema: {
        [NEW_STORE]: { keyPath: 'id' },
      },
    });
    const db = await idb.open(DB_NAME);
    expect(db.version).toBe(2);
  });
});
