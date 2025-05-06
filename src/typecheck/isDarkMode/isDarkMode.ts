function isDarkMode(): boolean {
  return (
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) ||
    false
  );
}

export default isDarkMode;
