import throttle from './throttle';

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('throttle function', () => {
    const mockFn = jest.fn();
    const throttleFn = throttle(mockFn, 100);

    throttleFn();
    throttleFn();
    expect(mockFn).toBeCalledTimes(1);
    
    jest.advanceTimersByTime(100);
    throttleFn();
    throttleFn();
    expect(mockFn).toBeCalledTimes(2);
  });
});
