function isSymbol(arg: any): boolean {
  return Object.prototype.toString.call(arg) === '[object Symbol]';
}

export default isSymbol;
