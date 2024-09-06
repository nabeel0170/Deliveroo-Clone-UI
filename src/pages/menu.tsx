import NavBar from "../components/nav/navbar";

import Footer from "../components/Footer/Footer";
import React from "react";
import CategoriesTab from "../components/categories/CategoriesTab";

import { Container, useMediaQuery } from "@mui/system";
import MenuContent from "../components/menuheader/menuContent";
import ItemSection from "../components/items/itemSections";
import Basket from "../components/basket/basket";
import theme from "../theme";
import { Grid } from "@mui/material";

const Menu: React.FC = () => {
  const screenSizeUpMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Container maxWidth="xl" sx={{ minWidth: "260px" }} disableGutters={true}>
      <NavBar />
      <MenuContent />
      <CategoriesTab />
      <Grid container sx={{}}>
        <Grid
          container
          sx={{ padding: " 32px 0 64px 64px", background: "#fcfafa" }}
        >
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

      {/* <Items /> */}
      <Footer />
    </Container>
  );
};
export default Menu;
