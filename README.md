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

## Usage Example

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
```

## API Documentation

### Type Checking

1. **`isArray(arg: any): boolean`**
   Checks if the argument is an array.

2. **`isFunction(arg: any): boolean`**
   Checks if the argument is a function.

3. **`isObject(arg: any): boolean`**
   Checks if the argument is an object.

4. **`isString(arg: any): boolean`**
   Checks if the argument is a string.

5. **`isNumber(arg: any): boolean`**
   Checks if the argument is a number.

6. **`isSymbol(arg: any): boolean`**
   Checks if the argument is a symbol.

7. **`isBlob(arg: any): boolean`**
   Checks if the argument is a Blob.

8. **`isUndefined(arg: any): boolean`**
   Checks if the argument is undefined.

9. **`isFalsy(arg: any): boolean`**
   Checks if the argument is falsy.

10. **`isTruthy(arg: any): boolean`**
    Checks if the argument is truthy.

### Query String Utilities

1. **`getQuery(): URLSearchParams`**
   Retrieves the current URL query parameters as a `URLSearchParams` object.

2. **`setQuery(arg: URLSearchParams): void`**
   Sets the URL query parameters using a `URLSearchParams` object.

### Formatting Utilities

1. **`addComma(arg: number): string`**
   Formats a number by adding commas as thousand separators.

### Script Importing

1. **`loadCDN(id: string, src: string, options?: ScriptAttribute): void`**
   Dynamically loads a script from a CDN with optional attributes.

### File Exporting

1. **`download(data: Blob, name: string, type: string): void`**
   Triggers a download for a given Blob with the specified filename and MIME type.

### Utility Functions

1. **`debounce(func: Function, wait: number): Function & { cancel: () => void; pending: () => boolean; }`**
   Creates a debounced function that delays invoking `func` until after `wait` milliseconds have passed. Returns a function with `cancel` and `pending` methods.

2. **`throttle(func: Function, wait: number): Function`**
   Creates a throttled function that only invokes `func` at most once per `wait` milliseconds.

3. **`getPlatform(): { os: string, browser: string, mobile: boolean } | null`**
   Returns an object containing the user's platform information, including the operating system, browser, and whether the user is on a mobile device.

### Crypto Utilities

**Note**: Encryption uses AES-GCM with 256-bit keys derived via PBKDF2 (SHA-256, 100,000 iterations).

1. **`encryptData(data: string, password: string, salt: string): Promise<{ iv: number[], encryptedData: number[] }>`**
   Encrypts a string using AES-GCM with a password-derived key and returns the IV and encrypted data.

2. **`decryptData(encryptedData: number[], iv: number[], password: string, salt: string): Promise<string>`**
   Decrypts AES-GCM encrypted data using the provided IV, password, and salt.

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

2. **`timeAgo(date: Date | string): string`**
   Returns a human-readable time difference string like "5 minutes ago" or "2 days ago".

3. **`isToday(date: Date): boolean`**
   Returns `true` if the given date is today.

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

2. **`getLocalStorage(key: string): any`**
   Retrieves a value from `localStorage`.

3. **`removeLocalStorage(key: string): void`**
   Removes a value from `localStorage`.

### DOM Utilities

1. **`hasClass(el: Element, className: string): boolean`**
   Checks if an element contains a class.

2. **`addClass(el: Element, className: string): void`**
   Adds a class to an element.

3. **`removeClass(el: Element, className: string): void`**
   Removes a class from an element.

4. **`toggleClass(el: Element, className: string): void`**
   Toggles a class on an element.

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](./LICENSE).
