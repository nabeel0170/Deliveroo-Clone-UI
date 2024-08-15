import NavBar from "../components/nav/navbar";
import { Box } from "@mui/material";
import TopMenu from "../components/menuheader/topMenu";
import Footer from "../components/Footer/Footer";
import React from "react";
import CategoriesTab from "../components/categories/CategoriesTab";
import Items from "../components/items/items";

const Menu: React.FC = () => {
  return (
    <Box>
      <NavBar />
      <Box sx={{ pt: "74px" }}>
        <TopMenu />
        {/* <CategoriesTab /> */}
        <Items />
      </Box>
      <Footer />
    </Box>
  );
};
export default Menu;
