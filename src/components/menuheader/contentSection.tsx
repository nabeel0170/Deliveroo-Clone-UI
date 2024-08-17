import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Info from "./info";
import ViewReviews from "./ViewReviews";
import OrderOptions from "./orderOptions";

const ContentSection: React.FC = () => {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isDownLg ? "column" : "row",
          marginRight: isDownMd ? 0 : "10px",
          paddingTop: isDownSm ? 0 : "32px",
          flexGrow: 1,
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
              marginLeft: isDownSm ? 0 : "10px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: {
                  lg: "40px",
                  md: "28px",
                },
              }}
            >
              <strong>Tossed - St Martin's Lane</strong>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "16px" }}>
              Chicken &#183; Salads &#183; Healthy
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "16px" }}>
              0.20 miles away &#183; Opens at 11:00 &#183; £7.00 minimum &#183; £0.79 delivery
            </Typography>
          </Box>
          <Info />
          <ViewReviews />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            marginLeft: isDownLg ? 0 : "auto",
          }}
        >
          <OrderOptions />
        </Box>
      </Box>
    </Box>
  );
};

export default ContentSection;
//
