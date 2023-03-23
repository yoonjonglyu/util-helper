function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => ReturnType<T> {
  let debounceId: ReturnType<typeof setTimeout> | null = null;

  const start = (args: T) => {
    debounceId = setTimeout(() => {
      func.call(func, args);
      debounceId = null;
    }, wait);
  };

  const cancel = () => {
    clearTimeout(debounceId!);
  };

  const debounced = (...args: any) => {
    cancel();
    start(args);
  };

  return debounced as (...args: Parameters<T>) => ReturnType<T>;
}

export default debounce;
