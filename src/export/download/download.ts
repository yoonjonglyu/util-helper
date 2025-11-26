import isBlob from '../../typecheck/isBlob/isBlob';

const download = (data: Blob, name: string, type: string): void => {
  if (!isBlob(data)) return console.error('download require blob data.');
  if (name === undefined) return console.error('download require file name.');
  if (type === undefined) return console.error('download require file type.');

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
