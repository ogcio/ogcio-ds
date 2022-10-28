import { useEffect } from 'react';
export const ThemeProvider = ({
  theme,
  children
}) => {
  if (!theme) {
    throw Error('No theme passed to the "ThemeProvider"');
  }

  useEffect(() => {
    const style = document.createElement('style');
    const variables = Object.entries(theme).reduce((acc, [key, value]) => acc + `${key}: ${value};`, '');
    style.appendChild(document.createTextNode(`:root {${variables}}`));
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [theme]);
  return children;
};