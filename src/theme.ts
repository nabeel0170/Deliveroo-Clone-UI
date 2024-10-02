import { createTheme } from '@mui/material/styles';

// Create a theme with custom breakpoints and styles
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Mobile devices
      sm: 540, // Tablets
      md: 960, // Laptops
      lg: 1280, // Desktops
      xl: 1920, // Large screens
    },
  },
  typography: {
    h1: {
      color: '#2E3333', // Apply the color to all heading tags
      fontFamily: 'Stratos, sans-serif', // Apply the font-family
    },
    h2: {
      color: '#2E3333',
      fontFamily: 'Stratos, sans-serif',
    },
    h3: {
      color: '#2E3333',
      fontFamily: 'Stratos, sans-serif',
    },
    h4: {
      color: '#2E3333',
      fontFamily: 'Stratos, sans-serif',
    },
    h5: {
      color: '#2E3333',
      fontFamily: 'Stratos, sans-serif',
    },
    h6: {
      color: '#2E3333',
      fontFamily: 'plex-sans, sans-serif',
    },
    body1: {
      color: '#585c5c',
      fontFamily: 'plex-sans, sans-serif',
    },
    body2: {
      color: '#585c5c',
      fontFamily: 'plex-sans, sans-serif',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        // This applies styles to all TextField components
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'black', // Border color when focused
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 0,
        },
      },
    },
  },
});

export default theme;
