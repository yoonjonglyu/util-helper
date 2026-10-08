/**
 * @jest-environment jsdom
 */

import copyToClipboard from './copyToClipboard';

describe('copyToClipboard', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should copy text using navigator.clipboard when available', async () => {
    const writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const success = await copyToClipboard('Hello, World!');
    expect(success).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('Hello, World!');
  });

  it('should fallback to execCommand when navigator.clipboard is unavailable', async () => {
    // Delete clipboard API
    // @ts-ignore
    delete navigator.clipboard;

    const execCommandMock = jest.fn().mockReturnValue(true);
    document.execCommand = execCommandMock;

    const success = await copyToClipboard('Fallback text');
    expect(success).toBe(true);
    expect(execCommandMock).toHaveBeenCalledWith('copy');
  });

  it('should return false for invalid arguments', async () => {
    // @ts-ignore
    const success = await copyToClipboard(12345);
    expect(success).toBe(false);
  });
});
