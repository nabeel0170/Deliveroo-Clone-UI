import NavBar from "../components/nav/navbar";
import { Box } from "@mui/material";

import Footer from "../components/Footer/Footer";
import React from "react";

import LoginForm from "../components/login/login";

const Login: React.FC = () => {
  return (
    <Box sx={{ minWidth: "260px" }}>
      <NavBar />
      {/* <Grid container alignItems="center" justifyContent="center"> */}
      <LoginForm />
      {/* </Grid> */}
      <Footer />
    </Box>
  );
};
export default Login;
