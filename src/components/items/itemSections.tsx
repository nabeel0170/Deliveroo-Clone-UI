import React, { useRef, useState, useEffect } from "react";
import { Typography, Box, Grid, useMediaQuery } from "@mui/material";
import ScrollButton from "./scrollButton";
import PopularFoodCard from "./popularItemCard";
import theme from "../../theme";

const ItemSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const screenSizeDownSm = useMediaQuery(theme.breakpoints.down("sm"));

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

  // Sample data for PopularFoodCard
  const foodItems = [
    {
      image: "https://via.placeholder.com/150",
      name: "Pizza",
      calories: 300,
      price: 9.99,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Burger",
      calories: 500,
      price: 11.99,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Sushi",
      calories: 200,
      price: 12.99,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Pasta",
      calories: 400,
      price: 10.99,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Pasta",
      calories: 400,
      price: 10.99,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Pasta",
      calories: 400,
      price: 10.99,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Pasta",
      calories: 400,
      price: 10.99,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Pasta",
      calories: 400,
      price: 10.99,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Pasta",
      calories: 400,
      price: 10.99,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Pasta",
      calories: 400,
      price: 10.99,
    },
    // Add more items as needed
  ];

  return (
    <Box sx={{ marginRight: "32px" }}>
      <Typography variant="body1">
        Adults need around 2000 kcal a day
      </Typography>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          marginTop: 5,
        }}
      >
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
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              display: screenSizeDownSm ? "" : "none", // Hide scrollbar for larger screens, show for smaller
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
              marginBottom: "5px",
            }}
          >
            {foodItems.map((item, index) => (
              <Grid item key={index} sx={{ p: 1 }}>
                <PopularFoodCard
                  image={item.image}
                  name={item.name}
                  calories={item.calories}
                  price={item.price}
                />
              </Grid>
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
