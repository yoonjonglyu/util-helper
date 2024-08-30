function isSymbol(arg: any): arg is Symbol {
  return Object.prototype.toString.call(arg) === '[object Symbol]';
}

export default isSymbol;

