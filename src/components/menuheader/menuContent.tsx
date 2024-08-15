import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import HeaderSection from "./headerSection";
import ContentSection from "./contentSection";
import theme from "../../theme";

const MenuContent: React.FC = () => {
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isDownSm ? "column" : "row",
        flexGrow: 1,
        marginTop: isDownSm ? 0 : "10px",
      }}
    >
      <HeaderSection />
      <ContentSection />
    </Box>
  );
};

export default MenuContent;
