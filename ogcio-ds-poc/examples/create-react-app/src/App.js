import React from 'react';
import { govie } from '@ogcio-ds/themes';
import { Button, ThemeProvider } from '@ogcio-ds/components';

function App() {
  return (
    <ThemeProvider theme={govie}>
      <Button variant="primary">Primary button</Button>
    </ThemeProvider>
  );
}

export default App;
