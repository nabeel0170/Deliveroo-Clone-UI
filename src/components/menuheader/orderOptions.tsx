import React from "react";
import { Box, Link } from "@mui/material";
import PrimaryButton from "../commons/primaryButton";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const OrderOptions: React.FC = () => {
  const theme = useTheme();
  const screenSizeDownMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "250px",
      }}
    >
      <Box
        sx={{
          marginLeft: "5px",
          "@media (min-width:900px)": {
            marginLeft: "auto",
          },
        }}
      >
        <Link
          sx={{
            display: "flex",
            alignItems: "center",
            color: "inherit",
            textDecoration: "none",
            fontSize: "16px",
          }}
          href="/"
        >
          <img
            src="./icons/delivery.png"
            style={{ height: "24px", marginRight: "10px" }}
            alt="Delivery"
          />
          Deliver from 11:00 - 11:30
          <span style={{ color: "#00ccbc", marginLeft: "10px" }}>Change</span>
        </Link>
        {screenSizeDownMd && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <PrimaryButton
              name={"Start Group Order"}
              Icon={PeopleAltOutlinedIcon}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderOptions;
