import debounce from './debounce/debounce';
import throttle from './throttle/throttle';
import getPlatform from './getPlatform/getPlatform';
import JobQueue from './jobQueue/jobQueue';
import FlushQueue from './flushQueue/flushQueue';
import sleep from './sleep/sleep';
import retry from './retry/retry';
import timeout from './timeout/timeout';
import { pMap } from './concurrency/concurrency';
import { once } from './once/once';

const Api = Object.freeze({
  debounce,
  throttle,
  getPlatform,
  JobQueue,
  FlushQueue,
  sleep,
  retry,
  timeout,
  pMap,
  once,
});

export {
  debounce,
  throttle,
  getPlatform,
  JobQueue,
  FlushQueue,
  sleep,
  retry,
  timeout,
  pMap,
  once,
};

export default Api;
