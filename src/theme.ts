import { createTheme } from "@mui/material/styles";

// Create a theme with custom breakpoints
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
});

export default theme;
