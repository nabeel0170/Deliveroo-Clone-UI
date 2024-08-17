import NavBar from "../components/nav/navbar";
import { Box, Grid } from "@mui/material";

import Footer from "../components/Footer/Footer";
import React from "react";
import CategoriesTab from "../components/categories/CategoriesTab";
import Items from "../components/items/items";
import { Container } from "@mui/system";
import MenuContent from "../components/menuheader/menuContent";

const Menu: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ minWidth: "260px" }} disableGutters={true}>
      <NavBar />
      <MenuContent />
      <Grid container sx={{}}>
        <Grid item xs={12}>
          <CategoriesTab />
        </Grid>
        <Grid container sx={{ padding: { xs: "0 32px", lg: "0 64px" }, background: "blue" }}>
          <Grid item xs={8} sx={{ background: "green" }}>
            s
          </Grid>
          <Grid item xs={4} sx={{ background: "yellow" }}>
            s
          </Grid>
        </Grid>
      </Grid>

      {/* <Items /> */}
      <Footer />
    </Container>
  );
};
export default Menu;
//  <Container maxWidth="xl" disableGutters={true}>
//     <NavBar />
//     {/* <Box sx={{ pt: "74px" }}> */}
//     <TopMenu />
//     {/* <CategoriesTab /> */}
//     {/* <Items />
//     </Box>
//     <Footer /> */}
//   </Container>
