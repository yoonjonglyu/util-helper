function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => ReturnType<T> {
  let debouceId: ReturnType<typeof setTimeout> | null = null;

  const start = (args: T) => {
    debouceId = setTimeout(() => {
      func.call(func, args);
      debouceId = null;
    }, wait);
  };

  const cancel = () => {
    clearTimeout(debouceId!);
  };

  const debounced = (...args: any) => {
    cancel();
    start(args);
  };

  return debounced as (...args: Parameters<T>) => ReturnType<T>;
}

export default debounce;
