import { Box, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { categories } from "./categories";
import StyledListItem from "./styledListItem";

const CategoriesTab: React.FC = () => {
  const [selectedTabBtn, setSelectedTabBtn] = useState<number | null>(null);
  const handleSelect = (id: number) => {
    setSelectedTabBtn(id);
  };

  return (
    <Box
      sx={{
        borderTop: "#dadce0 0.5px solid",
        display: "flex",
        marginTop: "30px",
        paddingLeft: "30px",
        boxShadow: "0 2px 4px #0000000d",
        justifyContent: "start",
      }}
    >
      <Toolbar>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            fontSize: "0.75rem",
            display: "flex",
            flexShrink: 0,
            color: "#00ccbc",
          }}
        >
          {categories.map(({ name, id }) => (
            <StyledListItem
              key={id}
              isSelected={selectedTabBtn === id}
              onClick={() => handleSelect(id)}
            >
              {name}
            </StyledListItem>
          ))}
        </ul>
      </Toolbar>
    </Box>
  );
};
export default CategoriesTab;
