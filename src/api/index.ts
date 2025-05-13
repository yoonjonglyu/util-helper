import debounce from './debounce/debounce';
import throttle from './throttle/throttle';
import getPlatfrom from './getPlatform/getPlatform';
import JobQueue from './jobQueue/jobQueue';
import FlushQueue from './flushQueue/flushQueue';
import sleep from './sleep/sleep';

const Api = Object.freeze({
  debounce,
  throttle,
  getPlatfrom,
  JobQueue,
  FlushQueue,
  sleep,
});

export default Api;
