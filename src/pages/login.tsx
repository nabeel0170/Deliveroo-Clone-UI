import NavBar from "../components/nav/navbar";
import { Box, Grid } from "@mui/material";

import Footer from "../components/Footer/Footer";
import React from "react";

import { Container } from "@mui/system";
import LoginForm from "../components/login/login";

const Login: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ minWidth: "260px" }} disableGutters={true}>
      <NavBar />
      {/* <Grid container alignItems="center" justifyContent="center"> */}
      <LoginForm />
      {/* </Grid> */}
      <Footer />
    </Container>
  );
};
export default Login;
