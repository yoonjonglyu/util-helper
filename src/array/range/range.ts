/**
 * Creates an array of numbers progressing from start up to, but not including, end.
 *
 * @param start The start of the range (or end if only one argument is provided).
 * @param end The end of the range.
 * @param step The value to increment or decrement by (default: 1 or -1).
 * @returns An array of numbers.
 */
export const range = (start: number, end?: number, step?: number): number[] => {
  let from = start;
  let to = end;

  if (to === undefined) {
    to = from;
    from = 0;
  }

  let stepVal = step;
  if (stepVal === undefined) {
    stepVal = from < to ? 1 : -1;
  }

  if (stepVal === 0) {
    return [];
  }

  const result: number[] = [];
  const isAscending = stepVal > 0;

  if (isAscending && from > to) {
    return [];
  }
  if (!isAscending && from < to) {
    return [];
  }

  for (let current = from; isAscending ? current < to : current > to; current += stepVal) {
    result.push(current);
  }

  return result;
};
