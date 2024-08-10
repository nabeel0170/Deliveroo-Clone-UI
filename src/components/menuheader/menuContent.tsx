import React from "react";
import { Box } from "@mui/material";
import HeaderSection from "./headerSection";
import ContentSection from "./contentSection";

const MenuContent: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        marginTop: "10px",
        "@media (max-width: 375px)": {
          marginTop: 0,
          flexDirection: "column",
        },
      }}
    >
      <HeaderSection />
      <ContentSection />
    </Box>
  );
};

export default MenuContent;
