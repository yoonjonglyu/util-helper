function isArray(arg: any) {
  if (Array.isArray !== undefined) {
    return Array.isArray(arg);
  } else {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
}

export default isArray;