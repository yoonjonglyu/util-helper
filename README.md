# isa-util

A set of JavaScript utilities for use in the browser.

## Installation

### Using npm

```bash
npm install isa-util
```

### Using Yarn

```bash
yarn add isa-util
```

## 📌 Quick Usage Examples

```javascript
import {
  isArray,
  getQuery,
  encryptData,
  decryptData,
  generateSalt,
  generatePassword,
  generatePasswordWithSaltAndEncrypt,
  decryptPasswordWithSalt
} from 'isa-util';

async function demoEncryption() {
  const message = 'Secret message';
  const { password, salt, encryptedData } = await generatePasswordWithSaltAndEncrypt(16, message);
  const decrypted = await decryptPasswordWithSalt(
    encryptedData.encryptedData,
    encryptedData.iv,
    password,
    salt
  );
  console.log(decrypted); // 'Secret message'
}

demoEncryption();

---

```

### ✅ Type Checking

```ts
isArray([1, 2, 3]); // true
isString('hello'); // true
isObject({ a: 1 }); // true
```

---

### 🔍 Query String Utilities

```ts
const query = getQuery();
console.log(query.get('page')); // e.g. '1'

query.set('page', '2');
setQuery(query); // URL 업데이트
```

---

### 💱 Formatting

```ts
addComma(1234567); // '1,234,567'
camelCase('@#@assd-wsd_asd fkfk'); // assdWsdAsdFkfk
formatClass(
  'a',
  { b: true, c: false },
  ['d', { e: true, f: 0 }, ['g', ['', null]]],
  0,
  undefined,
); //a b d e g 0
```

---

### 📦 CDN Script Import

```ts
loadCDN('jquery', 'https://code.jquery.com/jquery-3.6.0.min.js');
```

---

### 📁 File Download

```ts
const blob = new Blob(['Hello world'], { type: 'text/plain' });
download(blob, 'hello.txt', 'text/plain');
```

---

### ⏳ Debounce & Throttle

```ts
const debounced = debounce(() => console.log('called'), 300);
debounced();
debounced(); // 마지막 호출만 실행됨

const throttled = throttle(() => console.log('tick'), 1000);
throttled();
throttled(); // 1초에 한 번만 실행됨
```

---

### 📱 Platform Detection

```ts
getPlatform(); // { os: 'iOS', browser: 'Safari', mobile: true }
isMobile(); // true/false
isDarkMode(); // true/false
```

---

### 🔐 Encryption

```ts
const salt = generateSalt();
const password = generatePassword(16);
const encrypted = await encryptData('secret', password, salt);
const decrypted = await decryptData(
  encrypted.encryptedData,
  encrypted.iv,
  password,
  salt,
);
```

---

### 📅 Date & Time

```ts
formatDate(new Date(), 'YYYY-MM-DD'); // '2025-05-13'
timeAgo(new Date(Date.now() - 60000)); // '1 minute ago'
isToday(new Date()); // true
```

---

### 🧠 Storage

```ts
setLocalStorage('key', { name: 'isa' });
getLocalStorage('key'); // { name: 'isa' }
removeLocalStorage('key');
const db = await idb.open('my-db', {
  version: 1,
  schema: {
    users: { keyPath: 'id', autoIncrement: true },
  },
});
console.log(db.objectStoreNames); // ["users"]
```

---

### 🧩 DOM Utilities

```ts
addClass(document.body, 'dark');
hasClass(document.body, 'dark'); // true
toggleClass(document.body, 'dark'); // toggle
```

---

### 🚀 Async Utilities

```ts
// FlushQueue
const fq = new FlushQueue();
fq.add('job1', async () => console.log('job 1'));
fq.add('job2', async () => console.log('job 2'));
await fq.flush(); // 병렬 실행

// JobQueue
const jq = new JobQueue<string>(async (job) => {
  console.log('processing', job);
  await new Promise((r) => setTimeout(r, 300));
});
jq.enqueue('task A');
jq.enqueue('task B'); // 순차 실행
```

---

## API Documentation

### Type Checking

1. **`isArray(arg: any): boolean`**
   Checks if the argument is an array.

   **Usage Example:**

   ```ts
   isArray([1, 2, 3]); // true
   isArray('hello'); // false
   ```

2. **`isFunction(arg: any): boolean`**  
   Checks if the argument is a function.

   **Usage Example:**

   ```ts
   isFunction(() => {}); // true
   isFunction(123); // false
   ```

3. **`isObject(arg: any): boolean`**  
   Checks if the argument is an object.

   **Usage Example:**

   ```ts
   isObject({ key: 'value' }); // true
   isObject([1, 2, 3]); // false
   ```

4. **`isString(arg: any): boolean`**  
   Checks if the argument is a string.

   **Usage Example:**

   ```ts
   isString('Hello, world!'); // true
   isString(123); // false
   ```

5. **`isNumber(arg: any): boolean`**  
   Checks if the argument is a number.

   **Usage Example:**

   ```ts
   isNumber(42); // true
   isNumber('Hello'); // false
   ```

6. **`isSymbol(arg: any): boolean`**  
   Checks if the argument is a symbol.

   **Usage Example:**

   ```ts
   isSymbol(Symbol('test')); // true
   isSymbol('not a symbol'); // false
   ```

7. **`isBlob(arg: any): boolean`**  
   Checks if the argument is a Blob.

   **Usage Example:**

   ```ts
   isBlob(new Blob()); // true
   isBlob('not a blob'); // false
   ```

8. **`isUndefined(arg: any): boolean`**  
   Checks if the argument is undefined.

   **Usage Example:**

   ```ts
   isUndefined(undefined); // true
   isUndefined(null); // false
   ```

9. **`isFalsy(arg: any): boolean`**  
   Checks if the argument is falsy (false, 0, "", null, undefined, NaN).

   ```ts
   isUndefined(undefined); // true
   isUndefined(null); // false
   ```

10. **`isFalsy(arg: any): boolean`**  
    Checks if the argument is falsy (false, 0, "", null, undefined, NaN).

    **Usage Example:**

    ```ts
    isFalsy(null); // true
    isFalsy(0); // true
    isFalsy('hello'); // false
    ```

11. **`isTruthy(arg: any): boolean`**  
    Checks if the argument is truthy (not falsy).

    **Usage Example:**

    ```ts
    isTruthy(1); // true
    isTruthy(''); // false
    ```

### Query String Utilities

1. **`getQuery(): URLSearchParams`**
   Retrieves the current URL query parameters as a `URLSearchParams` object.

   **Usage Example:**

   ```ts
   const queryParams = getQuery();
   console.log(queryParams.get('user')); // prints the value of 'user' query parameter
   ```

2. **`setQuery(arg: URLSearchParams): void`**  
   Sets the URL query parameters using a `URLSearchParams` object.

   **Usage Example:**

   ```ts
   const params = new URLSearchParams();
   params.append('page', '1');
   setQuery(params); // Updates the URL's query params to ?page=1
   ```

### Formatting Utilities

1. **`addComma(arg: number): string`**
   Formats a number by adding commas as thousand separators.

   **Usage Example:**

   ```ts
   addComma(1000000); // "1,000,000"
   ```

2. **`camelCase(input: string): string`**
   Formats a string by camelCase.

   **Usage Example:**

   ```ts
   camelCase('@#@assd-wsd_asd fkfk'); // assdWsdAsdFkfk
   ```

3. **`pascalCase(input: string): string`**
   Formats a string by pascalCase.

   **Usage Example:**

   ```ts
   pascalCase('@#@assd-wsd_asd fkfk'); // AssdWsdAsdFkfk
   ```

4. **`snakeCase(input: string): string`**
   Formats a string by snakeCase.

   **Usage Example:**

   ```ts
   snakeCase('@#@assd-wsd_asd fkfk'); // assd_wsd_asd_fkfk
   ```

5. **`formatClass(...args: any): string`** | **`cx(...args): string`**
   Formats args by className.

   **Usage Example:**

   ```ts
   formatClass('a', 0, 1); // 'a 0 1'
   ```

### Script Importing

1. **`loadCDN(id: string, src: string, options?: ScriptAttribute): Promise<void>`**
   Dynamically loads a script from a CDN with optional attributes.

   **Usage Example:**

   ```ts
   loadCDN(
     'lodash',
     'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
   );
   ```

### File Exporting

1. **`download(data: Blob, name: string, type: string): void`**
   Triggers a download for a given Blob with the specified filename and MIME type.

   **Usage Example:**

   ```ts
   const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
   download(blob, 'hello.txt', 'text/plain');
   ```

### Utility Functions

1. **`debounce(func: Function, wait: number): Function & { cancel: () => void; pending: () => boolean; }`**
   Creates a debounced function that delays invoking `func` until after `wait` milliseconds have passed. Returns a function with `cancel` and `pending` methods.

   **Usage Example:**

   ```ts
   const handler = debounce(() => console.log('called!'), 300);
   handler();
   handler(); // Only the last call within 300ms will be executed
   ```

2. **`throttle(func: Function, wait: number): Function`**
   Creates a throttled function that only invokes `func` at most once per `wait` milliseconds.

   **Usage Example:**

   ```ts
   const throttledLog = throttle(() => console.log('Logged!'), 1000);
   throttledLog();
   throttledLog(); // Will log only once per 1000ms
   ```

3. **`getPlatform(): { os: string, browser: string, mobile: boolean } | null`**  
   Returns an object containing the user's platform information, including the operating system, browser, and whether the user is on a mobile device.

   **Usage Example:**

   ```ts
   const platform = getPlatform();
   console.log(platform.os, platform.browser); // logs current platform info
   ```

4. **`JobQueue<T>(processJob: (job: T) => Promise<void>): enqueue(job: T)`**  
   A class that manages a queue of asynchronous jobs and processes them one at a time. Jobs are added to the queue using enqueue, and the class ensures they are processed sequentially.

   **Usage Example:**

   ```ts
   const queue = new JobQueue<string>(async (job) => {
     console.log(`Processing job: ${job}`);
     await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기
   });

   queue.enqueue('Job 1');
   queue.enqueue('Job 2');
   queue.enqueue('Job 3');
   ```

5. **`FlushQueue(options: FlushQueueOptions): add(id: string, job: AsyncJob)`**  
    A class that manages a queue of asynchronous jobs with optional debounce and custom start/finish handlers. Jobs can be added, canceled, and flushed either in parallel or sequentially.

   **Usage Example:**

   ```ts
   const queue = new FlushQueue({
     debounceMs: 300, // Debounce for 300ms before flushing
     onStart: (id) => console.log(`Starting job ${id}`),
     onFinish: (id, error) => {
       if (error) {
         console.error(`Job ${id} failed`, error);
       } else {
         console.log(`Job ${id} finished`);
       }
     },
   });

   const job1: AsyncJob = async () => {
     console.log('Processing Job 1');
     await new Promise((resolve) => setTimeout(resolve, 1000));
   };
   const job2: AsyncJob = async () => {
     console.log('Processing Job 2');
     await new Promise((resolve) => setTimeout(resolve, 1000));
   };

   queue.add('job1', job1);
   queue.add('job2', job2);

   // Force flush all jobs sequentially
   queue.flush(false);
   ```

6. **`sleep(ms: number): Promise<void>`**
   A utility function that pauses the execution for the specified number of milliseconds by returning a **Promise** that resolves after the given delay.

   **Usage Example:**

   ```ts
   async function example() {
     console.log('Start');
     await sleep(1000); // Sleep for 1 second
     console.log('End after 1 second');
   }

   example();
   ```

### Crypto Utilities

**Note**: Encryption uses AES-GCM with 256-bit keys derived via PBKDF2 (SHA-256, 100,000 iterations).

1. **`encryptData(data: string, password: string, salt: string): Promise<{ iv: number[], encryptedData: number[] }>`**
   Encrypts a string using AES-GCM with a password-derived key and returns the IV and encrypted data.

**Usage Example:**

```ts
const { iv, encryptedData } = await encryptData('Hello', 'password', 'salt');
console.log(encryptedData);
```

2. **`decryptData(encryptedData: number[], iv: number[], password: string, salt: string): Promise<string>`**  
   Decrypts AES-GCM encrypted data using the provided IV, password, and salt.

   **Usage Example:**

   ```ts
   const decrypted = await decryptData(encryptedData, iv, 'password', 'salt');
   console.log(decrypted); // 'Hello'
   ```

3. **`generateSalt(): string`**
   Generates a 16-byte random salt string.

4. **`generatePassword(length: number): string`**
   Generates a random password of the specified length.

5. **`generatePasswordWithSalt(length: number): { password: string, salt: string }`**
   Generates a random password and salt.

6. **`generatePasswordWithSaltAndEncrypt(length: number, data: string): Promise<{ password: string, salt: string, encryptedData: { iv: number[], encryptedData: number[] } }>`**
   Generates a password and salt, encrypts the provided data, and returns all components.

7. **`decryptPasswordWithSalt(encryptedData: number[], iv: number[], password: string, salt: string): Promise<string>`**
   Decrypts data using the given encryptedData, IV, password, and salt.

8. **`decryptPasswordWithSaltAndEncrypt(encryptedData: number[], iv: number[], password: string, salt: string, data: string): Promise<string>`**
   Decrypts and verifies that the decrypted data matches the original input.

### Date & Time Utilities

1. **`formatDate(date: Date, format: string): string`**  
   Formats a JavaScript `Date` object into a custom string format like `'YYYY-MM-DD HH:mm:ss'`.

   **Usage Example:**

   ```ts
   formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'); // "2025-05-13 12:34:56"
   ```

2. **`timeAgo(date: Date | string): string`**  
   Returns a human-readable time difference string like "5 minutes ago" or "2 days ago".

   **Usage Example:**

   ```ts
   timeAgo(new Date('2025-05-12')); // "1 day ago"
   ```

3. **`isToday(date: Date): boolean`**
   Returns `true` if the given date is today.

   **Usage Example:**

   ```ts
   isToday(new Date('2005-05-12')); // "false"
   ```

### Environment Detection

1. **`isMobile(): boolean`**
   Detects whether the current device is a mobile device.

2. **`isDarkMode(): boolean`**
   Detects whether the user's system prefers dark mode.

3. **`isTouchDevice(): boolean`**
   Checks if the current device supports touch interactions.

### Storage Utilities

1. **`setLocalStorage(key: string, value: any): void`**  
   Sets a value in `localStorage`.

   **Usage Example:**

   ```ts
   setLocalStorage('user', { name: 'Alice' });
   ```

2. **`getLocalStorage(key: string): any`**  
   Retrieves a value from `localStorage`.

   **Usage Example:**

   ```ts
   const user = getLocalStorage('user');
   console.log(user.name); // "Alice"
   ```

3. **`removeLocalStorage(key: string): void`**
   Removes a value from `localStorage`.

   #### IndexDB - idb

   >

   ```ts
   interface IDBOpenOptions: {
      version?: number;
      schema?: Record<string, IDBObjectStoreParameters>;
      }
   interface CursorOptions<T = any> {
      range?: IDBKeyRange | null;
      offset?: number;
      limit?: number;
      filter?: (value: T, key: IDBValidKey) => boolean;
      sort?: (a: T, b: T) => number;
   }
   ```

4. **`idb.open(name: string, options?: IDBOpenOptions): Promise<IDBDatabase>`**
   Opens an IndexedDB database, creating object stores if they don’t exist.
   **Usage Example:**

   ```ts
   const db = await idb.open('my-db', {
     version: 1,
     schema: {
       users: { keyPath: 'id', autoIncrement: true },
     },
   });
   console.log(db.objectStoreNames); // ["users"]
   ```

5. **`idb.get<T>(dbName: string, store: string, key: IDBValidKey): Promise<T | undefined>`**
   Retrieves a single item from the specified object store by key.
   **Usage Example:**

   ```ts
   const user = await idb.get('my-db', 'users', 1);
   console.log(user?.name); // "Alice"
   ```

6. **`idb.put<T>(dbName: string, store: string, value: T): Promise<IDBValidKey>`**
   Inserts or updates an item in the object store.
   **Usage Example:**

   ```ts
   const key = await idb.put('my-db', 'users', { name: 'Alice' });
   console.log(key); // 1
   ```

7. **`idb.clear(dbName: string, store: string): Promise<void>`**
   Removes all items from the specified object store.
   **Usage Example:**

   ```ts
   await idb.clear('my-db', 'users');
   ```

8. **`idb.deleteDB(name: string): Promise<void>`**
   Deletes the entire database.
   **Usage Example:**

   ```ts
   await idb.deleteDB('my-db');
   ```

9. **`idb.cursor.each<T>(dbName: string, store: string, callback: (value: T, key: IDBValidKey, cursor: IDBCursorWithValue) => void): Promise<void>`**
   Iterates over all items in the store and executes the callback for each.
   **Usage Example:**

   ```ts
   await idb.cursor.each('my-db', 'users', (value, key) => {
     console.log(key, value.name);
   });
   ```

10. **`idb.cursor.query<T>(dbName: string, store: string, options?: CursorOptions<T>): Promise<T[]>`**
    Advanced cursor query with optional `filter`, `sort`, `offset`, and `limit`.
    **Usage Example:**

    ```ts
    const users = await idb.cursor.query('my-db', 'users', {
      filter: (user) => user.age >= 18,
      sort: (a, b) => a.age - b.age,
      offset: 1,
      limit: 2,
    });
    console.log(users);
    ```

### DOM Utilities

1. **`hasClass(el: Element, className: string): boolean`**  
   Checks if an element contains a class.

   **Usage Example:**

   ```ts
   hasClass(document.body, 'dark-mode'); // true/false
   ```

2. **`addClass(el: Element, className: string): void`**  
   Adds a class to an element.

   **Usage Example:**

   ```ts
   addClass(document.body, 'dark-mode');
   ```

3. **`removeClass(el: Element, className: string): void`**  
   Removes a class from an element.

   **Usage Example:**

   ```ts
   removeClass(document.body, 'dark-mode');
   ```

4. **`toggleClass(el: Element, className: string): void`**
   Toggles a class on an element.

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](./LICENSE).
