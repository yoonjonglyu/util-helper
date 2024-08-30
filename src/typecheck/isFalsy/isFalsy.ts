type Falsy = null | undefined | '' | 0 | false;

function isFalsy(arg: any): arg is Falsy {
  return !arg;
}

export default isFalsy;
