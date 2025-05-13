import JobQueue from './jobQueue';

describe('JobQueue', () => {
  it('should process jobs in the order they are enqueued', async () => {
    const processedJobs: number[] = [];
    const processJob = async (job: number) => {
      processedJobs.push(job);
    };

    const jobQueue = new JobQueue(processJob);

    jobQueue.enqueue(1);
    jobQueue.enqueue(2);
    jobQueue.enqueue(3);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for processing

    expect(processedJobs).toEqual([1, 2, 3]);
  });

  it('should handle errors in job processing and continue with the next job', async () => {
    const processedJobs: number[] = [];
    const processJob = async (job: number) => {
      if (job === 2) {
        throw new Error('Test error');
      }
      processedJobs.push(job);
    };

    const jobQueue = new JobQueue(processJob);

    jobQueue.enqueue(1);
    jobQueue.enqueue(2);
    jobQueue.enqueue(3);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for processing

    expect(processedJobs).toEqual([1, 3]);
  });

  it('should not process jobs if the queue is empty', async () => {
    const processJob = jest.fn(async (job: number) => {});
    const jobQueue = new JobQueue(processJob);

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for processing

    expect(processJob).not.toHaveBeenCalled();
  });

  it('should process jobs asynchronously', async () => {
    const processedJobs: number[] = [];
    const processJob = async (job: number) => {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate async processing
      processedJobs.push(job);
    };

    const jobQueue = new JobQueue(processJob);

    jobQueue.enqueue(1);
    jobQueue.enqueue(2);
    jobQueue.enqueue(3);

    await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for processing

    expect(processedJobs).toEqual([1, 2, 3]);
  });
});