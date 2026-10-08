---
name: isa-util
description: >-
  Comprehensive guide and cheat sheet for using the isa-util library in JavaScript and TypeScript.
  Use when writing code with isa-util, looking up function signatures, selecting utilities for
  array, object, DOM, async/concurrency, format, storage, typecheck, or security operations.
---

# isa-util Agent Skill & Reference Guide

`isa-util` is a zero-dependency, tree-shakable TypeScript utility library providing high-performance, type-safe helpers for modern web and Node.js applications.

## 1. Installation & Imports

```bash
npm install isa-util
# or
yarn add isa-util
# or
pnpm add isa-util
```

### Import Styles
`isa-util` supports both root imports and domain subpath imports:

```typescript
// Root import
import { chunk, pick, pMap, retry, formatBytes, copyToClipboard } from 'isa-util';

// Subpath imports (optimized tree-shaking & explicit scoping)
import { chunk, unique, groupBy, shuffle, range } from 'isa-util/array';
import { pick, omit, deepClone, deepMerge } from 'isa-util/object';
import { pMap, retry, timeout, sleep, debounce, throttle, once, JobQueue, FlushQueue } from 'isa-util/api';
import { copyToClipboard, scrollToTop, isInViewport, lockScroll, hasClass, addClass, removeClass, toggleClass } from 'isa-util/dom';
import { formatBytes, mask, truncate, camelCase, pascalCase, kebabCase, snakeCase, addComma, formatDate, timeAgo, escapeHtml, unescapeHtml, cx } from 'isa-util/format';
import { getCookie, setCookie, removeCookie, getSessionStorage, setSessionStorage, removeSessionStorage, getLocalStorage, setLocalStorage, removeLocalStorage, idb } from 'isa-util/storage';
import { isEmpty, isEmail, isUrl, isBrowser, isNode, isMobile, isDarkMode, isTouchDevice, isArray, isObject, isFunction, isString, isNumber, isTruthy, isFalsy } from 'isa-util/typecheck';
import { getQuery, setQuery } from 'isa-util/querystring';
import { encryptData, decryptData, generateSalt, generatePassword } from 'isa-util/security';
import { download } from 'isa-util/export';
import { loadCDN } from 'isa-util/import';
```

---

## 2. Domain Quick Reference

### 1) Array Utilities (`isa-util/array`)
- **`chunk<T>(array: T[], size: number): T[][]`**: Splits array into chunks of given size.
- **`unique<T>(array: T[], iteratee?: (item: T) => any): T[]`**: Deduplicates array items (supports custom key selector).
- **`groupBy<T, K>(array: T[], iteratee: (item: T) => K): Record<K, T[]>`**: Groups items into an object of arrays by key.
- **`shuffle<T>(array: T[]): T[]`**: Immutably shuffles array elements using Fisher-Yates algorithm.
- **`range(start: number, end?: number, step?: number): number[]`**: Generates integer sequence (supports positive/negative step).

### 2) Object Utilities (`isa-util/object`)
- **`pick<T, K>(obj: T, keys: K[]): Pick<T, K>`**: Creates an object with only selected keys (type-safe).
- **`omit<T, K>(obj: T, keys: K[]): Omit<T, K>`**: Creates an object with omitted keys (type-safe).
- **`deepClone<T>(val: T): T`**: Deeply clones objects, arrays, Date, RegExp, Map, Set, with circular reference support.
- **`deepMerge<T, U>(target: T, source: U): T & U`**: Deeply merges nested objects with prototype pollution protection (`__proto__`, `constructor`, `prototype` filtered).

### 3) API & Async Utilities (`isa-util/api`)
- **`pMap<T, R>(items: T[], mapper: (item: T, i: number) => Promise<R>, options?: { concurrency?: number }): Promise<R[]>`**: Concurrency-controlled async mapper preserving output order.
- **`retry<T>(fn: () => Promise<T>, options?: RetryOptions): Promise<T>`**: Retries async operation with exponential backoff, `retryIf`, and `onError`.
- **`timeout<T>(promise: Promise<T>, ms: number, errorMessage?: string): Promise<T>`**: Wraps promise with a timeout limit.
- **`once<T>(fn: T): T`**: Restricts function to run only once, returning cached result thereafter.
- **`sleep(ms: number, signal?: AbortSignal): Promise<void>`**: Cancellable promise-based sleep.
- **`debounce(fn: Function, wait: number)`**: Delays function execution until quiet period.
- **`throttle(fn: Function, wait: number)`**: Enforces maximum execution frequency.
- **`JobQueue<T>(worker: (job: T) => Promise<void>)`**: Sequential FIFO async job processor.
- **`FlushQueue(options?: FlushQueueOptions)`**: Batching & debounced async queue.

### 4) DOM Utilities (`isa-util/dom`)
- **`copyToClipboard(text: string): Promise<boolean>`**: Copies text to clipboard with modern Clipboard API and fallback.
- **`scrollToTop(target?: HTMLElement | Window, options?: ScrollOptions)`**: Smooth or instant scroll to top.
- **`isInViewport(element: Element, options?: { offset?: number; fullyInView?: boolean }): boolean`**: Checks element visibility in viewport (SSR safe).
- **`lockScroll(lock: boolean, target?: HTMLElement)`**: Locks/restores background body or container scroll (ideal for modals).
- **`addClass`, `removeClass`, `hasClass`, `toggleClass`**: Safe DOM class manipulation.

### 5) Format & String Utilities (`isa-util/format`)
- **`formatBytes(bytes: number, decimals?: number): string`**: Converts bytes into `KB`, `MB`, `GB`, `TB`.
- **`mask(val: string, type: 'email' | 'phone' | RegExp, maskChar?: string): string`**: Masks sensitive strings.
- **`truncate(text: string, maxLength: number, suffix?: string): string`**: Truncates text with ellipsis.
- **`camelCase`, `pascalCase`, `kebabCase`, `snakeCase`**: String casing conversions.
- **`escapeHtml(str: string): string` / `unescapeHtml(str: string): string`**: XSS prevention & decoding.
- **`addComma(num: number | string): string`**: Adds thousand-separator commas.
- **`formatDate(date: Date, format: string): string`**: Formats dates (`YYYY-MM-DD HH:mm:ss`).
- **`timeAgo(date: Date | string): string`**: Relative time formatting ("5 minutes ago").
- **`formatClass(...args: any[]): string` / `cx`**: Conditional className generator.

### 6) Storage Utilities (`isa-util/storage`)
- **`getCookie(name: string): string | null`**: Reads cookie value.
- **`setCookie(name: string, val: string, options?: CookieOptions)`**: Sets cookie with `maxAge`, `path`, `domain`, `secure`, `sameSite`.
- **`removeCookie(name: string, options?: CookieOptions)`**: Deletes cookie.
- **`getSessionStorage<T>(key: string): T | null` / `setSessionStorage` / `removeSessionStorage`**: Type-safe, JSON-serialized sessionStorage.
- **`getLocalStorage<T>(key: string): T | null` / `setLocalStorage` / `removeLocalStorage`**: Type-safe, JSON-serialized localStorage.
- **`idb`**: Lightweight IndexedDB Promise wrapper (`open`, `get`, `put`, `clear`, `deleteDB`, `cursor`).

### 7) Typecheck Utilities (`isa-util/typecheck`)
- **`isEmpty(val: unknown): boolean`**: Checks if value is nullish, empty string, empty array, empty object, or empty Map/Set.
- **`isEmail(val: string): boolean`**: Validates email format.
- **`isUrl(val: string): boolean`**: Validates URL structure.
- **`isBrowser()` / `isNode()`**: Environment detection (SSR safe).
- **`isMobile()` / `isTouchDevice()` / `isDarkMode()`**: Client feature detection.

---

## 3. Best Practices for AI Agents

1. **Prefer Subpath Imports for Tree-Shaking**:
   When writing modern code (Vite, Next.js, Rollup), recommend `import { chunk } from 'isa-util/array'` or import from root `isa-util` depending on project setup.
2. **Prototype Pollution Protection**:
   Always use `deepMerge` from `isa-util/object` when merging user-supplied configurations into default objects.
3. **Graceful SSR Guards**:
   All DOM and Storage utilities in `isa-util` check for `typeof window !== 'undefined'` and `typeof document !== 'undefined'`, making them safe for React/Next.js/Remix SSR components.
