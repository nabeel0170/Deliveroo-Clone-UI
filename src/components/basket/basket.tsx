import { Box, useMediaQuery } from "@mui/system";

import { Button, Typography } from "@mui/material";
import theme from "../../theme";

interface BasketItems {
  items?: string; // Adjust the type based on your actual items
}

const Basket: React.FC<BasketItems> = () =>
  // {
  // items
  // }
  {
    const screenSizeUpMd = useMediaQuery(theme.breakpoints.up("md"));

    if (!screenSizeUpMd) {
      return null; // Return null when the condition is not met
    }

    return (
      <Box
        sx={{
          backgroundColor: "white",
          maxWidth: "500px",
          minWidth: "400px",
          maxHeight: "700px",
          border: "0.5px solid #dadce0",
        }}
      >
        <Box
          sx={{
            height: "550px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box sx={{ color: "#dadce0" }}>
            <img
              src="./icons/shopping-cart.png"
              alt="Shopping Cart"
              style={{ height: "40px" }}
            />
            <Typography>Your Basket is Empty</Typography>
          </Box>
        </Box>
        <Box sx={{ padding: "16px" }}>
          <Button
            sx={{
              width: "90%",
              backgroundColor: "#dadce0",
              margin: "0 auto",
              display: "block",
            }}
            disabled
          >
            Go to Checkout
          </Button>
        </Box>
      </Box>
    );
  };
export default Basket;
