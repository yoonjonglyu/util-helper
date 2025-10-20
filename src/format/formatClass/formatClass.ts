type ClassDictionary = { [key: string]: any };
type ClassArray = Array<ClassValue>;
type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDictionary
  | ClassArray;

/**
 * Lightweight classnames utility (TypeScript)
 * Usage: classNames('a', { b: true, c: false }, ['d', { e: true }], 0)
 * Result: "a b d e 0"
 */
function formatClass(...args: ClassValue[]): string {
  const classes: string[] = [];

  const push = (val: string | number) => {
    if (val === '' || val === null || val === undefined) return;
    classes.push(String(val));
  };

  const handle = (arg: ClassValue) => {
    if (!arg && arg !== 0) return; // skip falsy except 0
    const t = typeof arg;
    if (t === 'string' || t === 'number') {
      push(arg as string | number);
    } else if (Array.isArray(arg)) {
      for (const item of arg) handle(item);
    } else if (t === 'object') {
      for (const key in arg as ClassDictionary) {
        if (
          Object.prototype.hasOwnProperty.call(arg as ClassDictionary, key) &&
          (arg as ClassDictionary)[key]
        ) {
          push(key);
        }
      }
    }
    // booleans (true/false) are ignored except when part of object keys
  };

  for (const arg of args) {
    handle(arg);
  }

  return classes.join(' ');
}

// alias
export const cx = formatClass;
export default formatClass;
