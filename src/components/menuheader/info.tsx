import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Link, Typography } from "@mui/material";

const Info: React.FC = () => {
  return (
    <Box sx={{ marginBottom: "5px", marginLeft: "10px", minWidth: "250px" }}>
      <Link href="/" sx={{ color: "inherit", textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            marginTop: "15px",
          }}
        >
          <InfoIcon
            sx={{
              marginRight: "10px",
              borderRadius: "13px",
              fontSize: "24px",
            }}
          />
          <Box>
            <Box
              sx={{
                width: "fit-content",
              }}
            >
              <Typography variant="body1" sx={{ fontSize: "16px" }}>
                Info
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "14px" }}>
                Map, allergens and hygiene rating
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                fontSize: "18px",
                color: "#00ccbc",
                marginLeft: "5px",
              }}
            />
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default Info;
