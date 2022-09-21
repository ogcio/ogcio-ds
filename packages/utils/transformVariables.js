import kebabCase from 'lodash/kebabCase';

const PREFIX = '--ogcio';

export const transformGlobalVariables = (variables) => {
  return Object.entries(variables).reduce(
    (acc, [tokensGroup, tokens]) => ({
      ...acc,
      ...Object.entries(tokens).reduce(
        (acc, [tokenVariant, value]) => ({
          ...acc,
          [`${PREFIX}-${kebabCase(tokensGroup)}--${kebabCase(tokenVariant)}`]:
            value,
        }),
        {}
      ),
    }),
    {}
  );
};

export const transformComponentVariables = (componentName, componentTheme) => {
  return Object.entries(componentTheme).reduce(
    (acc, [variantName, tokens]) => ({
      ...acc,
      ...Object.entries(tokens).reduce(
        (acc, [tokenName, value]) => ({
          ...acc,
          [`${PREFIX}-${kebabCase(componentName)}--${variantName}__${kebabCase(
            tokenName
          )}`]: value,
        }),
        {}
      ),
    }),
    {}
  );
};
