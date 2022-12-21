import TypeCheck from './typecheck';
import QueryString from './querystring';

const UtilHelper = Object.freeze({
  TypeCheck,
  ...TypeCheck,
  QueryString,
  ...QueryString,
});

export default UtilHelper;
