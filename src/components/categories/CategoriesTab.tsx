import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
import { StyledListItem } from "./styledListItem";
import theme from "../../theme";
import styled from "styled-components";
import { Container } from "@mui/system";

const APIKEY = process.env.REACT_APP_API_KEY;

interface Category {
  id: number;
  name: string;
}

const StyledList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  overflowX: "auto", // Default to auto for scrollable list
  whiteSpace: "nowrap",
  "&::-webkit-scrollbar": {
    display: "none", // Hide scrollbar for WebKit browsers
  },
});

const CategoriesTab = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleCategories, setVisibleCategories] = useState<Category[]>([]);
  const [overflowCategories, setOverflowCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const screenSizeDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/restaurant/itemCategories",
          {
            headers: { "api-key": APIKEY },
          },
        );
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (listRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 120; // width of each item
        const moreButtonWidth = 100; // Width for the "More" button

        if (screenSizeDownSm) {
          setVisibleCategories(categories);
          setOverflowCategories([]);
        } else {
          // For larger screens
          const maxVisibleItems = Math.floor(
            (containerWidth - moreButtonWidth) / itemWidth,
          );
          const visible = categories.slice(0, maxVisibleItems);
          const overflow = categories.slice(maxVisibleItems);

          setVisibleCategories(visible);
          setOverflowCategories(overflow);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [categories, screenSizeDownSm]);

  const handleCategorySelect = (id: number) => {
    setSelectedCategory(id);
    setAnchorEl(null);
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="xl">
      <Box
        ref={containerRef}
        sx={{
          width: "100%",
          background: "white",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <StyledList
            ref={listRef}
            style={{
              overflowX: screenSizeDownSm ? "scroll" : "hidden",
            }}
          >
            {visibleCategories.map(({ name, id }) => (
              <StyledListItem
                key={id}
                isSelected={selectedCategory === id}
                onClick={() => handleCategorySelect(id)}
              >
                {name}
              </StyledListItem>
            ))}
          </StyledList>
          {overflowCategories.length > 0 && !screenSizeDownSm && (
            <div>
              <Button
                onClick={handleMoreClick}
                endIcon={<ChevronDown />}
                sx={{ minWidth: "auto", color: "#00CCBC" }}
              >
                More
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                {overflowCategories.map(({ name, id }) => (
                  <MenuItem key={id} onClick={() => handleCategorySelect(id)}>
                    {name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Toolbar>
      </Box>
    </Container>
  );
};

export default CategoriesTab;
