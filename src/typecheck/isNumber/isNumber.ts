function isNumber(arg: any): arg is number {
  return typeof arg === 'number';
}

export default isNumber;
