import { AppBar, Box, Toolbar, useMediaQuery } from "@mui/material";
import NavSearchBar from "./navSearchBar";
import PrimaryButton from "./primaryButton";
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
        position="static"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: "#dadce0 0.5px solid", maxHeight: "60px" }}
      >
        <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
          <Box sx={{ display: "flex" }}>
            <a href="/">
              <img
                src="./logo/deliveroo-logo.png"
                alt="Deliveroo Logo"
                style={{ height: "30px" }}
              />
            </a>
          </Box>
          <Box sx={{ maxWidth: "500px", width: "500px" }}>
            <NavSearchBar />
          </Box>
          <Toolbar sx={{ gap: 1 }}>
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
