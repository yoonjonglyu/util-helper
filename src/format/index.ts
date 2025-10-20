import addComma from './addComma/addComma';
import formatDate from './formatDate/formatDate';
import timeAgo from './timeAgo/timeAgo';
import camelCase from './camelCase/camelCase';
import pascalCase from './pascalCase/pascalCase';
import snakeCase from './snakeCase/snakeCase';
import formatClass, { cx } from './formatClass/formatClass';

const Format = Object.freeze({
  addComma,
  formatDate,
  timeAgo,
  camelCase,
  pascalCase,
  snakeCase,
  formatClass,
  cx,
});

export default Format;
