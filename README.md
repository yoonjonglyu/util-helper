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
import { isArray, getQuery } from 'isa-util';
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
   checks if the argument is a undefined.

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

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](./LICENSE).
