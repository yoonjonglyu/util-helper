export type StoreSchema = Record<string, IDBObjectStoreParameters>;

export type IDBMode = 'readonly' | 'readwrite';

export interface IDBOpenOptions {
  version?: number;
  schema?: StoreSchema;
}

export interface CursorOptions<T = any> {
  range?: IDBKeyRange | null;
  offset?: number;
  limit?: number;
  filter?: (value: T, key: IDBValidKey) => boolean;
  sort?: (a: T, b: T) => number;
}
