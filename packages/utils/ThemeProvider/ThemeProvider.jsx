import React, { createContext, useContext } from 'react';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ theme, children }) => {
  if (!theme) {
    throw Error('No theme passed to the "ThemeProvider"');
  }

  return <div style={theme}>{children}</div>;
};
