import FlushQueue from './flushQueue';

describe('FlushQueue', () => {
  let queue: FlushQueue;

  beforeEach(() => {
    queue = new FlushQueue();
  });

  it('adds and flushes jobs in parallel by default', async () => {
    const results: string[] = [];
    queue.add('a', async () => { results.push('a'); });
    queue.add('b', async () => { results.push('b'); });

    await queue.flush();

    expect(results).toContain('a');
    expect(results).toContain('b');
    expect(queue.size()).toBe(0);
  });

  it('overwrites jobs with the same id', async () => {
    const results: string[] = [];
    queue.add('a', async () => { results.push('first'); });
    queue.add('a', async () => { results.push('second'); });

    await queue.flush();

    expect(results).toEqual(['second']);
  });

  it('can cancel jobs', async () => {
    const results: string[] = [];
    queue.add('a', async () => { results.push('a'); });
    queue.cancel('a');

    await queue.flush();

    expect(results).toEqual([]);
  });

  it('has() and size() work as expected', () => {
    queue.add('a', async () => {});
    queue.add('b', async () => {});
    expect(queue.has('a')).toBe(true);
    expect(queue.has('b')).toBe(true);
    expect(queue.has('c')).toBe(false);
    expect(queue.size()).toBe(2);
    queue.cancel('a');
    expect(queue.has('a')).toBe(false);
    expect(queue.size()).toBe(1);
  });

  it('flushes jobs sequentially when parallel is false', async () => {
    const order: string[] = [];
    queue.add('a', async () => { order.push('a'); });
    queue.add('b', async () => { order.push('b'); });

    await queue.flush(false);

    expect(order).toEqual(['a', 'b']);
  });

  it('calls onStart and onFinish callbacks', async () => {
    const started: string[] = [];
    const finished: string[] = [];
    queue = new FlushQueue({
      onStart: (id) => started.push(id),
      onFinish: (id, err) => finished.push(err ? `${id}-err` : id),
    });

    queue.add('a', async () => {});
    queue.add('b', async () => { throw new Error('fail'); });

    await queue.flush();

    expect(started).toEqual(expect.arrayContaining(['a', 'b']));
    expect(finished).toEqual(expect.arrayContaining(['a', 'b-err']));
  });

  it('debounces flush when debounceMs is set', async () => {
    jest.useFakeTimers();
    const queue = new FlushQueue({ debounceMs: 100 });
    const spy = jest.spyOn(queue, 'flush');

    queue.add('a', async () => {});
    queue.add('b', async () => {});

    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(spy).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('does not flush if already flushing', async () => {
    let resolveJob: () => void;
    queue.add('a', () => new Promise<void>(resolve => { resolveJob = resolve; }));

    // Start flushing but do not resolve the job yet
    const flushPromise = queue.flush();

    // Try to flush again while still flushing
    await queue.flush();

    // Now resolve the job
    resolveJob!();
    await flushPromise;

    // No errors should occur, and queue should be empty
    expect(queue.size()).toBe(0);
  });
});