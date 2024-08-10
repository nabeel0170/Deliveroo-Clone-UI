import React from "react";
import { Box } from "@mui/material";
import PrimaryButton from "../nav/primaryButton";
import RoundBackButton from "./roundBackButton";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const HeaderSection: React.FC = () => {
  const theme = useTheme();
  const screenSizeDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const screenSizeDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        backgroundImage: "url(./logo/image-1.webp)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "220px",
        maxHeight: "230px",
        minWidth: "150px",
        maxWidth: "400px",
        width: "100%",
        position: "relative",
        "@media (max-width: 540px)": {
          maxWidth: "100%",
          width: "100%",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        {screenSizeDownMd && (
          <PrimaryButton
            name={"Start Group Order"}
            Icon={PeopleAltOutlinedIcon}
          />
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        {screenSizeDownSm && <RoundBackButton />}
      </Box>
    </Box>
  );
};

export default HeaderSection;
