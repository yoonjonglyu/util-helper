import isBlob from '../../typecheck/isBlob/isBlob';
import isBrowser from '../../typecheck/isBrowser/isBrowser';

export type DownloadableData = Blob | string | ArrayBuffer | ArrayBufferView;

const MIME_MAP: Record<string, string> = {
  txt: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  json: 'application/json',
  csv: 'text/csv',
  xml: 'application/xml',
  pdf: 'application/pdf',
  zip: 'application/zip',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
};

function resolveMimeType(type?: string): string {
  if (!type) return 'text/plain';
  if (type.includes('/')) return type;
  return MIME_MAP[type.toLowerCase()] || 'application/octet-stream';
}

function resolveBlob(data: DownloadableData, type?: string): Blob | null {
  if (isBlob(data)) return data;

  const mimeType = resolveMimeType(type);

  if (typeof data === 'string') {
    return new Blob([data], { type: mimeType });
  }

  if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    return new Blob([data], { type: mimeType });
  }

  return null;
}

const download = (
  data: DownloadableData,
  name: string,
  type?: string,
): void => {
  if (!isBrowser()) {
    console.error('This util is not supported in non-browser env');
    return;
  }

  if (data === null || data === undefined) {
    console.error('download require blob data.');
    return;
  }

  if (name === undefined || name === '') {
    console.error('download require file name.');
    return;
  }

  const blob = resolveBlob(data, type);
  if (!blob) {
    console.error('download require blob data.');
    return;
  }

  const cleanName = name.replace(/[/\\?%*:|"<>]/g, '_');
  let filename = cleanName;
  if (type) {
    const ext = type.includes('/') ? '' : `.${type}`;
    if (ext && !cleanName.toLowerCase().endsWith(ext.toLowerCase())) {
      filename = `${cleanName}${ext}`;
    }
  }

  const downloadAnchorNode = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  downloadAnchorNode.setAttribute('href', url);
  downloadAnchorNode.setAttribute('download', filename);
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
  window.URL.revokeObjectURL(url);
};

export default download;
