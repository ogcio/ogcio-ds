import kebabCase from 'lodash/kebabCase';

export const transformVariables = (componentName, componentTheme) => {
  return Object.entries(componentTheme).reduce(
    (acc, [variantName, tokens]) => ({
      ...acc,
      ...Object.entries(tokens).reduce(
        (acc, [tokenName, value]) => ({
          ...acc,
          [`--ogcio-${kebabCase(componentName)}--${variantName}__${kebabCase(
            tokenName
          )}`]: value,
        }),
        {}
      ),
    }),
    {}
  );
};
