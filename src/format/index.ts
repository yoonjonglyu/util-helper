import addComma from './addComma/addComma';
import formatDate from './formatDate/formatDate';
import timeAgo from './timeAgo/timeAgo';
import camelCase from './camelCase/camelCase';
import pascalCase from './pascalCase/pascalCase';
import snakeCase from './snakeCase/snakeCase';
import kebabCase from './kebabCase/kebabCase';
import formatClass, { cx } from './formatClass/formatClass';
import formatBytes from './formatBytes/formatBytes';
import mask from './mask/mask';
import truncate from './truncate/truncate';
import { escapeHtml, unescapeHtml } from './escapeHtml/escapeHtml';

const Format = Object.freeze({
  addComma,
  formatDate,
  timeAgo,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  formatClass,
  cx,
  formatBytes,
  mask,
  truncate,
  escapeHtml,
  unescapeHtml,
});

export {
  addComma,
  formatDate,
  timeAgo,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  formatClass,
  cx,
  formatBytes,
  mask,
  truncate,
  escapeHtml,
  unescapeHtml,
};

export default Format;
