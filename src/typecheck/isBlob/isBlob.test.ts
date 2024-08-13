import isBlob from './isBlob';

describe('isBlob', () => {
  test('arg is Blob', () => {
    expect(isBlob(new Blob())).toBeTruthy();
    expect(isBlob(new Blob(['asdasdsd', '131231231']))).toBeTruthy();
  });
  test('arg not Blob', () => {
    expect(isBlob('1')).toBeFalsy();
    expect(isBlob(undefined)).toBeFalsy();
    expect(isBlob(null)).toBeFalsy();
    expect(isBlob({})).toBeFalsy();
    expect(isBlob([])).toBeFalsy();
    expect(isBlob(() => {})).toBeFalsy();
  });
});
