import addComma from './addComma';

describe('addComma', () => {
  test('숫자에 단위 쉼표 추가하기', () => {
    expect(addComma(1233451)).toBe('1,233,451');
    expect(addComma(12233451)).toBe('12,233,451');
  });
});
