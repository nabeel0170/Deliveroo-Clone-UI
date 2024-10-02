import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Add } from '@mui/icons-material';

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
    <Card
      sx={{
        maxWidth: ' 120px',
        width: '120px',
        maxHeight: '260px',
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        padding: 0,
      }}
    >
      <CardMedia component="img" height="110" image={image} alt={name} />
      <CardContent sx={{ padding: '5px' }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '13px',
            fontWeight: 'bold',
            textOverflow: 'ellipsis',
            maxWidth: '120px',
            whiteSpace: 'normal',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {calories} kcal
        </Typography>
        <Typography variant="body2" color="text.secondary">
          £{price}
        </Typography>
      </CardContent>
      <Box sx={{ textAlign: 'center', paddingBottom: '10px' }}>
        <Button
          variant="outlined"
          sx={{
            width: 107,
            fontSize: '1rem ',
            color: '#00CCBC',
            border: ' 1px solid #DADCE0',

            '&:hover': {
              background: 'none',
              color: '#009999',
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
