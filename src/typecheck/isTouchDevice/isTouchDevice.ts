import isBrowser from '../isBrowser/isBrowser';

function isTouchDevice(): boolean {
  if (!isBrowser) return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}
export default isTouchDevice;
