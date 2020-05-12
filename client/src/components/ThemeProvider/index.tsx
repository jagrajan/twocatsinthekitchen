import React, { FC } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6c4f70',
    },
    secondary: {
      main: '#6b82a8',
    },
  },
  typography: {
    fontFamily: '"Roboto Slab", serif',
  },
});

const Provider: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Provider;
