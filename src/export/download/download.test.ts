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

  test('dowload args right with Blob', () => {
    download(data, 'test', 'txt');
    expect(createObjectURL).toBeCalled();
    expect(revokeObjectURL).toBeCalled();
  });

  test('download args right with string', () => {
    download('plain text content', 'test', 'txt');
    expect(createObjectURL).toBeCalled();
    expect(revokeObjectURL).toBeCalled();
  });

  test('download args right with ArrayBuffer', () => {
    const buffer = new Uint8Array([1, 2, 3]).buffer;
    download(buffer, 'test', 'bin');
    expect(createObjectURL).toBeCalled();
    expect(revokeObjectURL).toBeCalled();
  });

  test('download args wrong when data is null or empty name', () => {
    // @ts-ignore
    download(null, 'test', 'asd');
    expect(createObjectURL).not.toBeCalled();
    expect(revokeObjectURL).not.toBeCalled();
    expect(error).toBeCalled();
  });
});
