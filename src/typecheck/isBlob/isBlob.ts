function isBlob(arg: any) {
  return Object.prototype.toString.call(arg) === '[object Blob]';
}

export default isBlob;
