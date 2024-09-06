import React from "react";
import { Grid } from "@mui/material";

interface ItemProps {
  content: string;
}

const Item: React.FC<ItemProps> = ({ content }) => {
  return (
    <Grid
      item
      xs={3}
      sx={{
        whiteSpace: "nowrap",
        padding: "16px",
        minWidth: "150px",
        textAlign: "center",
      }}
    >
      {content}
    </Grid>
  );
};

export default Item;
