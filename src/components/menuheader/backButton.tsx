import React from "react";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const BackButton: React.FC = () => {
  return (
    <Button
      sx={{
        paddingLeft: "0",

        color: "#00ccbc",

        fontSize: "0.75rem",
        textTransform: "none",
        marginLeft: "0",
        "&:hover": {
          backgroundColor: "inherit",
        },
      }}
    >
      <KeyboardBackspaceIcon sx={{ fontSize: "24px", paddingRight: "5px" }} />
      <span style={{ fontSize: "16px" }}>Back</span>
    </Button>
  );
};

export default BackButton;
