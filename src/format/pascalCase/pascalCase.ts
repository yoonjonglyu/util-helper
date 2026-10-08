import camelCase from '../camelCase/camelCase';

function pascalCase(input: string = ''): string {
  const camel = camelCase(input);
  return camel ? camel.charAt(0).toUpperCase() + camel.slice(1) : '';
}

export default pascalCase;