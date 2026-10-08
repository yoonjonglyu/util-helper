function addComma(number: number | string): string {
  if (number === null || number === undefined || number === '') return '';
  const num = typeof number === 'string' ? Number(number.replace(/,/g, '')) : number;
  if (isNaN(num)) return String(number);
  return num.toLocaleString();
}

export default addComma;
