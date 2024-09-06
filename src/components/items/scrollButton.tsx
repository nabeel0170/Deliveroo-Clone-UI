import React from "react";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface ScrollButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick }) => {
  const icon = direction === "left" ? <ChevronLeft /> : <ChevronRight />;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        [direction]: -30,
        zIndex: 1,
        backgroundColor: "white",
        borderRadius: "50%",
        width: 40,
        height: 40,
        color: "#00CCBC",
      }}
    >
      {icon}
    </IconButton>
  );
};

export default ScrollButton;
