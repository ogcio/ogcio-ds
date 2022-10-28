import camelCase from 'lodash/camelCase';

export const transformClassNames = (styles) =>
  (styles = Object.entries(styles).reduce(
    (acc, [key, value]) => ({ ...acc, [camelCase(key)]: value }),
    {}
  ));
