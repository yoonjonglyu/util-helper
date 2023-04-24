type FuncType<T extends any[], R> = (...args: T) => R;

function debounce<T extends any[], R>(
  func: FuncType<T, R>,
  wait: number,
): FuncType<T, () => R> & {
  cancel: () => void;
  pending: () => boolean;
} {
  let debounceId: ReturnType<typeof setTimeout> | null = null;
  let result: R;
  let _args: T;
  let lastCallTime: number;

  const invokeFunc = () => {
    result = func.call(func, ...(_args || []));
    debounceId = null;
  };
  const start = () => {
    lastCallTime = Date.now() + wait;
    debounceId = setTimeout(() => {
      if (Date.now() >= lastCallTime) invokeFunc();
    }, wait);
  };
  const cancel = () => {
    clearTimeout(debounceId!);
    debounceId = null;
  };
  const pending = () => {
    return Date.now() < lastCallTime;
  };

  const debounced = (...args: T) => {
    _args = args;
    start();
    return () => result;
  };
  debounced.cancel = cancel;
  debounced.pending = pending;

  return debounced;
}

export default debounce;
