import NavBar from "../components/nav/navbar";

import Footer from "../components/Footer/Footer";
import React from "react";
import CategoriesTab from "../components/categories/CategoriesTab";

import { Box, useMediaQuery } from "@mui/system";
import MenuContent from "../components/menuheader/menuContent";
import ItemSection from "../components/items/itemSections";
import Basket from "../components/basket/basket";
import theme from "../theme";
import { Grid } from "@mui/material";

const Menu: React.FC = () => {
  const screenSizeUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box sx={{ minWidth: "260px" }}>
      <NavBar />
      <MenuContent />
      <Box
        sx={{
          borderTop: "1px solid #DADCE0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          position: "sticky",
          top: screenSizeUpSm ? 72 : 56,
          background: "white",
          zIndex: "1000",
        }}
      >
        <CategoriesTab />
      </Box>
      <Box sx={{ background: "#fcfafa" }}>
        <Grid container maxWidth="xl" sx={{ margin: "auto" }}>
          <Grid container sx={{ padding: "  0 64px 64px 64px", marginTop: 5 }}>
            <Grid item xs={12} md={8}>
              <ItemSection />
            </Grid>
            {screenSizeUpMd && (
              <Grid item xs={4}>
                <Basket />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* <Items /> */}
      <Footer />
    </Box>
  );
};
export default Menu;
