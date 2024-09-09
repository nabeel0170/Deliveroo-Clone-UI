import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import HeaderSection from "./headerSection";
import ContentSection from "./contentSection";
import theme from "../../theme";

const MenuContent: React.FC = () => {
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid
      container
      maxWidth="xl"
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
        margin: "auto",
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
// Container maxWidth="xl" sx={{ minWidth: "260px" }} disableGutters={true}
export default MenuContent;
