function isFunction(arg: any): arg is Function {
  return typeof arg === 'function';
}

export default isFunction;
