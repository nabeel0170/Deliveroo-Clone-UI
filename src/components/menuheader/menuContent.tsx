import React from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import HeaderSection from "./headerSection";
import ContentSection from "./contentSection";
import theme from "../../theme";

const MenuContent: React.FC = () => {
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid
      container
      direction={isDownSm ? "column" : "row"}
      sx={{
        marginTop: isDownSm ? 0 : "10px",
        padding: {
          md: !isDownMd ? " 73px 64px 64px 64px" : "73px 10px 10px 10px",
          sm: "53px 0px 32px 32px",
        },
        paddingTop: {
          xs: "56px",
        },
      }}
    >
      <Grid item xs={4}>
        <HeaderSection />
      </Grid>

      <Grid item xs={8}>
        <ContentSection />
      </Grid>
    </Grid>
  );
};

export default MenuContent;
