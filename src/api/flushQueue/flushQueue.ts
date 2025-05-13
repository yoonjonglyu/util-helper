// utils/FlushQueue.ts

type AsyncJob = () => Promise<any>;

interface FlushQueueOptions {
  debounceMs?: number;
  onStart?: (id: string) => void;
  onFinish?: (id: string, error?: any) => void;
}

class FlushQueue {
  private queue = new Map<string, AsyncJob>();
  private isFlushing = false;
  private timer?: ReturnType<typeof setTimeout>;

  private debounceMs: number;
  private onStart?: (id: string) => void;
  private onFinish?: (id: string, error?: any) => void;

  constructor(options: FlushQueueOptions = {}) {
    this.debounceMs = options.debounceMs ?? 0;
    this.onStart = options.onStart;
    this.onFinish = options.onFinish;
  }

  /** Job 추가 (기존 ID 있으면 덮어씀) */
  add(id: string, job: AsyncJob) {
    this.queue.set(id, job);

    if (this.debounceMs > 0) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.flush(), this.debounceMs);
    }
  }

  /** Job 개별 취소 */
  cancel(id: string) {
    this.queue.delete(id);
  }

  /** Job 존재 여부 */
  has(id: string): boolean {
    return this.queue.has(id);
  }

  /** Job 개수 */
  size(): number {
    return this.queue.size;
  }

  /** 강제 flush (병렬 or 순차 실행) */
  async flush(parallel: boolean = true) {
    if (this.isFlushing) return;
    this.isFlushing = true;

    const jobs = Array.from(this.queue.entries());
    this.queue.clear();

    if (parallel) {
      await Promise.all(
        jobs.map(async ([id, job]) => {
          try {
            this.onStart?.(id);
            await job();
            this.onFinish?.(id);
          } catch (err) {
            console.error(`Job ${id} failed:`, err);
            this.onFinish?.(id, err);
          }
        }),
      );
    } else {
      for (const [id, job] of jobs) {
        try {
          this.onStart?.(id);
          await job();
          this.onFinish?.(id);
        } catch (err) {
          console.error(`Job ${id} failed:`, err);
          this.onFinish?.(id, err);
        }
      }
    }

    this.isFlushing = false;
  }
}

export default FlushQueue;
