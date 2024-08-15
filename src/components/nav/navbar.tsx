import { AppBar, Box, Toolbar, useMediaQuery } from "@mui/material";
import NavSearchBar from "./navSearchBar";
import PrimaryButton from "../commons/primaryButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";

const NavBar: React.FC = () => {
  const theme = useTheme();
  const screenSizeDownMd = useMediaQuery(theme.breakpoints.up("md"));
  const screenSizeDownSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <header>
      <AppBar
        component="nav"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "#dadce0 0.5px solid",
          height: screenSizeDownSm ? "56px " : "73px",
          padding: "0 64px",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: "0 !important",
            height: "73px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <a href="/">
              <img
                src="./logo/deliveroo-logo.png"
                alt="Deliveroo Logo"
                style={{ height: "32px", width: "121px" }}
              />
            </a>
          </Box>
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
          <Toolbar sx={{ gap: 1, display: "flex" }}>
            {screenSizeDownMd && (
              <PrimaryButton name={"Sign Up or log in"} Icon={HomeIcon} />
            )}
            {!screenSizeDownSm ? (
              <PrimaryButton Icon={PersonOutlineIcon} />
            ) : (
              <PrimaryButton name={"Account"} Icon={PersonOutlineIcon} />
            )}
          </Toolbar>
        </Toolbar>
      </AppBar>
    </header>
  );
};
export default NavBar;
