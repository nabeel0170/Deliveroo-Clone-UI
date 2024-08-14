import { Box, useMediaQuery, useTheme } from "@mui/material";
import BackButton from "./backButton";

import MenuContent from "./menuContent";
const TopMenu: React.FC = () => {
  const theme = useTheme();
  const screenSizeDownSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <section>
      <Box
        sx={{
          marginLeft: "50px",
          marginRight: "50px",
          minWidth: "fit-content",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.down("sm")]: {
            margin: 0,
          },
        }}
      >
        <Box>
          <Box>{screenSizeDownSm && <BackButton />}</Box>
          <Box>
            <MenuContent />
          </Box>
        </Box>
      </Box>
    </section>
  );
};
export default TopMenu;
