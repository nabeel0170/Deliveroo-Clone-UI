import React from "react";
import { Box } from "@mui/material";
import PrimaryButton from "../commons/primaryButton";
import RoundBackButton from "./roundBackButton";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StyledOrderButton from "./StyledOrderButton";

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
        maxHeight: "299px",
        minWidth: screenSizeDownSm ? "100%" : "150px",
        maxWidth: screenSizeDownSm ? "100%" : "532px",
        width: "100%",
        height: "299px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: screenSizeDownSm ? "flex-end" : "center",
          padding: "10px",
        }}
      >
        {screenSizeDownMd && (
          <StyledOrderButton
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
