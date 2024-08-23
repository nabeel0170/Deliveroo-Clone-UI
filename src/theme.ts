import { createTheme } from "@mui/material/styles";

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
  components: {
    MuiTextField: {
      styleOverrides: {
        // This applies styles to all TextField components
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "black", // Border color when focused
            },
          },
        },
      },
    },
  },
});

export default theme;
