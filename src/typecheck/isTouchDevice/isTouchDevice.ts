import isBrowser from '../isBrowser/isBrowser';

function isTouchDevice(): boolean {
  if (!isBrowser()) return false;
  return (
    'ontouchstart' in window ||
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) ||
    (typeof navigator !== 'undefined' && Boolean((navigator as any).msMaxTouchPoints > 0))
  );
}
export default isTouchDevice;
