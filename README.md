# isa-util

js utils in browser;

# Installl

1. npm
   `npm i isa-util`
2. yarn
   `yarn add isa-util`

# Usage

```js
import { isArray, getQuery } from 'isa-util';
```

## API

### Type Check

1. isArray: (arg: any) => boolean;
2. isFunction: (arg:any) => boolean;
3. isObject: (arg: any) => boolean;
4. isString: (arg:any) => boolean;
5. isNumber: (arg:any) => boolean;
6. isSymbol: (arg: any) => boolean;

### Query String

1. getQuery: () => URLSearchParams;
2. setQuery: (arg: URLSearchParams) => void;

### Format

1. addComma: (arg: number) => string;

### Import

1. loadCDN: (id: string, src: string) => void;

### API

1. debounce: (func: function, wait: number) => (args: any) => any & {cancel: () => void; pending: () => boolean;};
