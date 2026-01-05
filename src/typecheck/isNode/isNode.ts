function isNode(): boolean {
  return typeof process !== 'undefined' && process.versions?.node != null;
}

export default isNode;
