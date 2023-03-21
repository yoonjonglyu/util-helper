import debounce from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should debounce a function', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn(); // 1
    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(50);

    debouncedFn(); // 2
    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(100);

    expect(mockFn).toBeCalledTimes(1);

    debouncedFn(); // 3
    jest.advanceTimersByTime(100);

    debouncedFn(); // 4
    expect(mockFn).toBeCalledTimes(2);

    jest.advanceTimersByTime(100);
    expect(mockFn).toBeCalledTimes(3);
  });
});
