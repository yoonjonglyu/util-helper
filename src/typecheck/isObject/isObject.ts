function isObject(args: any): boolean {
  return Object.prototype.toString.call(args) === '[object Object]';
}

export default isObject;
