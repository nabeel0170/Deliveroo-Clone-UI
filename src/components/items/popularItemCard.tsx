import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";

interface PopularFoodCardProps {
  image: string;
  name: string;
  calories: number;
  price: number;
}

const PopularFoodCard: React.FC<PopularFoodCardProps> = ({
  image,
  name,
  calories,
  price,
}) => {
  return (
    <Card sx={{ maxWidth: " 125px", width: "125px" }}>
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {calories} kcal
        </Typography>
        <Typography variant="body2" color="text.secondary">
          £{price}
        </Typography>
      </CardContent>
      <Box sx={{ textAlign: "center", pb: 2 }}>
        <Button
          variant="outlined"
          sx={{
            width: 100,
            fontSize: "1rem ",
            color: "#00CCBC",
            border: " 1px solid #DADCE0",
            "&:hover": {
              background: "none",
              color: "#009999",
            },
          }}
        >
          <Add />
        </Button>
      </Box>
    </Card>
  );
};

export default PopularFoodCard;
