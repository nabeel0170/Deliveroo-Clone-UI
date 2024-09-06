import React, { useRef, useState, useEffect } from "react";
import { Typography, Box, Grid } from "@mui/material";
import ScrollButton from "./scrollButton";
import Item from "./item";

const ItemSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const current = gridRef.current;
    if (current) {
      current.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }
    return () => {
      if (current) {
        current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Box sx={{ marginRight: "32px" }}>
      <Typography variant="body1">
        Adults need around 2000 kcal a day
      </Typography>
      <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
        {/* Scroll Buttons */}
        {showLeftButton && (
          <ScrollButton direction="left" onClick={scrollLeft} />
        )}
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            width: "100%",
            scrollBehavior: "smooth", // Smooth scroll behavior
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar for Chrome, Safari, and WebKit browsers
            },
          }}
          ref={gridRef}
        >
          <Grid
            container
            direction="row"
            sx={{
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            {[...Array(10)].map((_, x) => (
              <Item key={x} content={`Popular Item ${x + 1}`} />
            ))}
          </Grid>
        </Box>
        {showRightButton && (
          <ScrollButton direction="right" onClick={scrollRight} />
        )}
      </Box>
    </Box>
  );
};

export default ItemSection;
