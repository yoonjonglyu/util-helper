import debounce from './debounce/debounce';
import throttle from './throttle/throttle';
import getPlatfrom from './getPlatform/getPlatform';
import JobQueue from './jobQueue/jobQueue';

const Api = Object.freeze({
  debounce,
  throttle,
  getPlatfrom,
  JobQueue,
});

export default Api;
