function isBlob(arg: any):boolean {
  return Object.prototype.toString.call(arg) === '[object Blob]';
}

export default isBlob;
