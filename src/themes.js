const sharedOverrides = {
  typography: {
    fontFamily: ['Nunito Sans', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          ':last-child': {
            paddingBottom: '0',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

export const lightTheme = {
  ...sharedOverrides,
  palette: {
    primary: {
      main: 'hsl(219, 43%, 32%)',
    },
    text: {
      primary: 'hsl(219, 15%, 15%)',
    },
    background: {
      default: 'hsl(0, 0%, 98%)',
    },
    info: {
      main: 'hsl(209, 10%, 80%)',
    },
  },
};

export const darkTheme = {
  ...sharedOverrides,
  palette: {
    mode: 'dark',
    primary: {
      main: 'hsl(0, 0%, 98%)',
    },
    text: {
      primary: 'hsl(0, 0%, 100%)',
    },
    background: {
      default: 'hsl(207, 26%, 15%)',
      paper: 'hsl(209, 23%, 10%)',
    },
    info: {
      main: 'hsl(209, 10%, 40%)',
    },
  },
};
