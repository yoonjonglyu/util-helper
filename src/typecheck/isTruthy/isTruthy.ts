function isTruthy<T extends any>(arg: T): arg is NonNullable<T> {
  return !!arg;
}

export default isTruthy;