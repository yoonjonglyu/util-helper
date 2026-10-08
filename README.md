# isa-util

[![npm version](https://img.shields.io/badge/version-1.1.1-blue.svg)](https://www.npmjs.com/package/isa-util)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()
[![tree-shakable](https://img.shields.io/badge/tree--shakable-yes-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)]()

A comprehensive, zero-dependency, tree-shakable TypeScript utility library for modern web and Node.js applications.

---

## ⚡ Highlights

- **Zero Runtime Dependencies**: Pure standard Web and JavaScript APIs with 0 external dependencies.
- **Full TypeScript Support**: Written in TypeScript with 100% strict type definitions and type guards.
- **Modular Subpath Imports**: Import only what you need via `isa-util/<domain>` or import from root `isa-util`.
- **Tree-Shakable**: Built with `"sideEffects": false` for optimal bundle size elimination in Vite, Webpack, Rollup, and Next.js.
- **SSR Safe**: Universal compatibility across browser (DOM/Web Storage) and server-side environments (Node.js/Next.js/Remix).
- **AI Agent Skill Included**: Ships with an Antigravity/AGY Agent Skill (`skills/isa-util/SKILL.md`) for AI pair programming.

---

## 📦 Installation

```bash
# npm
npm install isa-util

# yarn
yarn add isa-util

# pnpm
pnpm add isa-util
```

---

## 📂 Subpath Imports

`isa-util` provides dedicated subpaths for optimal tree-shaking and cleaner imports:

| Subpath | Description | Key Utilities |
|---|---|---|
| `isa-util` | All utilities | Root export for all domains |
| `isa-util/array` | Array & Collection manipulation | `chunk`, `unique`, `groupBy`, `shuffle`, `range` |
| `isa-util/object` | Object utilities | `pick`, `omit`, `deepClone`, `deepMerge` |
| `isa-util/api` | Concurrency & Async control | `pMap`, `retry`, `timeout`, `once`, `sleep`, `debounce`, `throttle`, `JobQueue`, `FlushQueue`, `getPlatform` |
| `isa-util/dom` | DOM & Viewport utilities | `copyToClipboard`, `scrollToTop`, `isInViewport`, `lockScroll`, `addClass`, `removeClass`, `toggleClass`, `hasClass` |
| `isa-util/format` | String, Case & Number formatters | `formatBytes`, `mask`, `truncate`, `camelCase`, `pascalCase`, `kebabCase`, `snakeCase`, `escapeHtml`, `unescapeHtml`, `addComma`, `formatDate`, `timeAgo`, `cx` |
| `isa-util/storage` | Cookies & Web Storage | `getCookie`, `setCookie`, `removeCookie`, `getSessionStorage`, `setSessionStorage`, `getLocalStorage`, `setLocalStorage`, `idb` |
| `isa-util/typecheck` | Type guards & checks | `isEmpty`, `isEmail`, `isUrl`, `isBrowser`, `isNode`, `isMobile`, `isDarkMode`, `isTouchDevice`, `isArray`, `isObject` |
| `isa-util/querystring` | URL Query parameters | `getQuery`, `setQuery` |
| `isa-util/security` | Web Crypto encryption & hashing | `encryptData`, `decryptData`, `generateSalt`, `generatePassword` |
| `isa-util/export` | File export | `download` |
| `isa-util/import` | Dynamic script loading | `loadCDN` |

---

## 🚀 Quick Usage Examples

### 1. Array & Collections
```typescript
import { chunk, unique, groupBy, shuffle, range } from 'isa-util/array';

chunk([1, 2, 3, 4, 5], 2);           // [[1, 2], [3, 4], [5]]
unique([1, 2, 2, 3]);                // [1, 2, 3]
unique(users, (u) => u.id);          // Deduplicate by object key
groupBy(products, (p) => p.category);// { electronics: [...], clothing: [...] }
shuffle([1, 2, 3, 4]);               // Immutable Fisher-Yates random shuffle
range(0, 10, 2);                     // [0, 2, 4, 6, 8]
```

### 2. Objects
```typescript
import { pick, omit, deepClone, deepMerge } from 'isa-util/object';

const user = { id: 1, name: 'Alice', age: 30, role: 'admin' };
pick(user, ['name', 'role']);        // { name: 'Alice', role: 'admin' }
omit(user, ['age', 'role']);         // { id: 1, name: 'Alice' }

// Deep clone supporting Date, RegExp, Map, Set, and circular references
const cloned = deepClone(complexState);

// Deep merge with prototype pollution defense
const merged = deepMerge(defaultConfig, userConfig);
```

### 3. Concurrency & Async
```typescript
import { pMap, retry, timeout, once, sleep } from 'isa-util/api';

// Concurrency-controlled async map (processes at most 3 in parallel)
const results = await pMap(urls, fetchUrl, { concurrency: 3 });

// Exponential backoff retry
const data = await retry(() => fetchUserData(id), {
  retries: 3,
  delay: 1000,
  backoff: 2,
});

// Timeout promise
const response = await timeout(fetchData(), 5000, 'Request timed out');

// Run only once
const initialize = once(() => setupClient());
initialize(); // executes
initialize(); // returns cached result

// Cancellable sleep
await sleep(1000);
```

### 4. DOM & UI
```typescript
import { copyToClipboard, scrollToTop, isInViewport, lockScroll } from 'isa-util/dom';

// Modern clipboard copy with fallback
await copyToClipboard('Text to copy');

// Smooth scroll to top of window or container
scrollToTop(window, { behavior: 'smooth' });

// Check viewport visibility
if (isInViewport(element, { fullyInView: true })) {
  console.log('Element fully visible in viewport');
}

// Lock/unlock body scroll for modal overlays
lockScroll(true);  // Lock background scroll
lockScroll(false); // Restore background scroll
```

### 5. Formatting & XSS Security
```typescript
import { 
  formatBytes, 
  mask, 
  truncate, 
  kebabCase, 
  snakeCase, 
  escapeHtml, 
  addComma 
} from 'isa-util/format';

formatBytes(1048576);                 // "1 MB"
mask('01012345678', 'phone');         // "010-****-5678"
mask('user@example.com', 'email');    // "u***@example.com"
truncate('A very long sentence here', 10); // "A very lon..."

kebabCase('helloWorld');              // "hello-world"
snakeCase('helloWorld');              // "hello_world"
addComma(1234567);                    // "1,234,567"

// XSS Sanitization
escapeHtml('<script>alert("xss")</script>'); 
// "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
```

### 6. Storage (Cookies & SessionStorage)
```typescript
import { 
  getCookie, 
  setCookie, 
  removeCookie, 
  getSessionStorage, 
  setSessionStorage 
} from 'isa-util/storage';

// Cookies with secure options
setCookie('session_id', 'xyz123', { maxAge: 86400, secure: true, sameSite: 'strict' });
getCookie('session_id');              // "xyz123"
removeCookie('session_id');

// SessionStorage with automatic JSON serialization & SSR safety
setSessionStorage('auth_user', { id: 1, name: 'Alice' });
const user = getSessionStorage<{ id: number; name: string }>('auth_user');
```

### 7. Typecheck & Guards
```typescript
import { isEmpty, isEmail, isUrl, isBrowser, isNode } from 'isa-util/typecheck';

isEmpty([]);                          // true
isEmpty({});                          // true
isEmpty('   ');                       // true
isEmpty([1]);                         // false

isEmail('contact@example.com');       // true
isUrl('https://example.com/api');     // true

if (isBrowser()) {
  // Safe to access window / document
}
```

---

## 🤖 AI Agent Skill

This package includes an Antigravity AI Agent Skill located at:
```
skills/isa-util/SKILL.md
```
When used in projects equipped with Google Antigravity or AI agent toolchains, the agent automatically discovers this skill to reference API definitions, code patterns, and best practices.

---

## 🧪 Testing & Verification

The library is thoroughly tested with 100% test pass rate across 71 test suites and 271 unit tests:

```bash
# Run unit tests
yarn test

# Watch mode
yarn test:watch

# Build bundle & TypeScript types
yarn build
```

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.
