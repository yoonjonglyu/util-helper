/**
 * @jest-environment jsdom
 */

import download from './download';

describe('download', () => {
  const createObjectURL = window.URL.createObjectURL =jest.fn();
  const revokeObjectURL = window.URL.revokeObjectURL = jest.fn();
  const error = console.error = jest.fn();
  const data = new Blob(['test'], { type: 'plain/text' });
  afterEach(() => {
    createObjectURL.mockReset();
    revokeObjectURL.mockReset();
    error.mockReset();
  });

  test('dowload args right', () => {
    download(data, 'test', 'txt');
    expect(createObjectURL).toBeCalled();
    expect(revokeObjectURL).toBeCalled();
  });
  test('download args wrong', () => {
    // @ts-ignore
    download('data', 'test', 'asd');
    expect(createObjectURL).not.toBeCalled()
    expect(revokeObjectURL).not.toBeCalled();
    expect(error).toBeCalled();
  });
});
