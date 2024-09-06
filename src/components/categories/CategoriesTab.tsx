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

const APIKEY = process.env.REACT_APP_API_KEY;

interface Category {
  id: number;
  name: string;
}

const CategoriesTab = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleCategories, setVisibleCategories] = useState<Category[]>([]);
  const [overflowCategories, setOverflowCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up("sm"));

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
        const itemWidth = 120; // Approximate width of each item
        const moreButtonWidth = 100; // Width reserved for the "More" button
        const maxVisibleItems = Math.floor(
          (containerWidth - moreButtonWidth) / itemWidth,
        );

        const visible = categories.slice(0, maxVisibleItems);
        const overflow = categories.slice(maxVisibleItems);

        setVisibleCategories(visible);
        setOverflowCategories(overflow);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [categories]);

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
    <Box
      ref={containerRef}
      sx={{
        borderTop: "1px solid #DADCE0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        width: "100%",
        position: "sticky ",
        top: screenSizeUpSm ? 73 : 56,
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
        <ul
          ref={listRef}
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            overflow: "hidden",
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
        </ul>
        {overflowCategories.length > 0 && (
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
  );
};

export default CategoriesTab;
