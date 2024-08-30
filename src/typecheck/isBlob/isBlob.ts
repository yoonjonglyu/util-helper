function isBlob(arg: any):arg is Blob {
  return Object.prototype.toString.call(arg) === '[object Blob]';
}

export default isBlob;
