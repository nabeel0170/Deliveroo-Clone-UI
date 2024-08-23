import { AppBar, Box, Toolbar, useMediaQuery } from "@mui/material";
import NavSearchBar from "./navSearchBar";
import PrimaryButton from "../commons/primaryButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const screenSizeUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const navigateToLogin = () => {
    console.log("navigate");
    navigate("/login");
  };
  return (
    <header>
      <AppBar
        component="nav"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "#dadce0 0.5px solid",
          height: screenSizeUpSm ? "73px" : "56px ",
          boxSizing: "border-box",
          padding: "0 64px",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            padding: "0 !important",
            height: screenSizeUpSm ? "73px" : "56px ",
          }}
          disableGutters={false}
        >
          <a href="/" style={{ height: "32px", width: "121px" }}>
            <img src="./logo/deliveroo-logo.png" alt="Deliveroo Logo" style={{ height: "32px", width: "121px" }} />
          </a>

          <Box
            sx={{
              width: "1315px",
              justifyContent: "center",
              display: "flex",
              padding: "0px 16px",
            }}
          >
            <NavSearchBar />
          </Box>
          <Toolbar sx={{ gap: 1 }} disableGutters={true}>
            {screenSizeUpMd && <PrimaryButton name={"Sign up or log in"} Icon={HomeIcon} onClick={navigateToLogin} />}
            {screenSizeUpSm ? (
              <PrimaryButton name={"Account"} Icon={PersonOutlineIcon} onClick={navigateToLogin} />
            ) : (
              <PrimaryButton Icon={PersonOutlineIcon} />
            )}
          </Toolbar>
        </Toolbar>
      </AppBar>
    </header>
  );
};
export default NavBar;
