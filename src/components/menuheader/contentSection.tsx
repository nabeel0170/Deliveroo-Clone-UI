import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Info from "./info";
import ViewReviews from "./ViewReviews";
import OrderOptions from "./orderOptions";

const ContentSection: React.FC = () => {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isDownMd ? "column" : "row",
        flexGrow: 1,
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          marginRight: isDownMd ? 0 : "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              marginBottom: "5px",
              marginLeft: "10px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: {
                  lg: "2rem",
                  md: "1.5rem",
                  xs: "1rem",
                },
              }}
            >
              <strong>Tossed - St Martin's Lane</strong>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "0.75rem" }}>
              Chicken &#183; Salads &#183; Healthy
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
              0.20 miles away &#183; Opens at 11:00 &#183; £7.00 minimum &#183;
              £0.79 delivery
            </Typography>
          </Box>
          <Info />
          <ViewReviews />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "flex-start",
          [theme.breakpoints.up("md")]: {
            marginTop: "10px",
          },
        }}
      >
        <OrderOptions />
      </Box>
    </Box>
  );
};

export default ContentSection;
