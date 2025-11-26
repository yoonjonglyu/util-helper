type FuncType<T extends any[], R> = (...args: T) => R;

function throttle<T extends any[], R>(
  func: FuncType<T, R>,
  wait: number,
): (...args: T) => R | void {
  let lastCallTime: null | number = null;
  return (...args: T) => {
    if (lastCallTime === null || Date.now() >= lastCallTime) {
      lastCallTime = Date.now() + wait;
      return func(...args);
    }
  };
}

export default throttle;
