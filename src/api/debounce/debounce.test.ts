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
  test('cancel debounced function', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn(); // 1
    debouncedFn.cancel(); // cancel
    jest.advanceTimersByTime(110);

    expect(mockFn).not.toBeCalled();
  });
  test('check debounce a function state', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 100);

    expect(debouncedFn.pending()).toBeFalsy(); // prev
    debouncedFn(); // 1
    expect(debouncedFn.pending()).toBeTruthy(); // pending
    jest.advanceTimersByTime(100);
    expect(debouncedFn.pending()).toBeFalsy(); // invoke
    expect(mockFn).toBeCalled();
  });
});
