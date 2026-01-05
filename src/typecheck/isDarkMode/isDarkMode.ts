import isBrowser from '../isBrowser/isBrowser';

function isDarkMode(): boolean {
  if (!isBrowser()) return false;
  return (
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) ||
    false
  );
}

export default isDarkMode;
