function isObject(arg: any): arg is Object {
  return Object.prototype.toString.call(arg) === '[object Object]';
}

export default isObject;
