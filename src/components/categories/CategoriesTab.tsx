import { Box, Toolbar, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import StyledListItem from "./styledListItem";

const APIKEY = process.env.REACT_APP_API_KEY;

interface Category {
  id: number;
  name: string;
}

const CategoriesTab: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTabBtn, setSelectedTabBtn] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/restaurant/itemCategories", {
          headers: {
            "api-key": APIKEY,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelect = (id: number) => {
    setSelectedTabBtn(id);
  };

  return (
    <Box
      sx={{
        borderTop: "#dadce0 0.5px solid",
        display: "flex",
        flexGrow: 1,
        boxShadow: "0 2px 4px #0000000d",
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ display: "flex", flexGrow: 1, padding: "0 64px !important" }}>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            fontSize: "0.75rem",
            display: "flex",
            flexGrow: 1,
            color: "#00ccbc",
          }}
        >
          {categories.map(({ name, id }) => (
            <StyledListItem key={id} isselected={selectedTabBtn === id} onClick={() => handleSelect(id)}>
              {name}
            </StyledListItem>
          ))}
        </ul>
      </Toolbar>
    </Box>
  );
};

export default CategoriesTab;
