class JobQueue<T> {
  private queue: T[] = [];
  private processing: boolean = false;

  constructor(private processJob: (job: T) => Promise<void>) {}

  enqueue(job: T): void {
    this.queue.push(job);
    this.processNext();
  }

  private async processNext(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;
    const job = this.queue.shift();

    if (job) {
      try {
        await this.processJob(job);
      } catch (error) {
        console.error('Error processing job:', error);
      }
    }

    this.processing = false;
    this.processNext();
  }
}

export default JobQueue;