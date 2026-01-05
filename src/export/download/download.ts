import isBlob from '../../typecheck/isBlob/isBlob';
import isBrowser from '../../typecheck/isBrowser/isBrowser';

const download = (data: Blob, name: string, type: string): void => {
  if (!isBlob(data)) return console.error('download require blob data.');
  if (name === undefined) return console.error('download require file name.');
  if (type === undefined) return console.error('download require file type.');
  if (!isBrowser())
    return console.error('This util is not supported in non-browser env');
  const downloadAnchorNode = document.createElement('a');
  const url = window.URL.createObjectURL(data);
  downloadAnchorNode.setAttribute('href', url);
  downloadAnchorNode.setAttribute('download', `${name}.${type}`);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  window.URL.revokeObjectURL(url);
};

export default download;
