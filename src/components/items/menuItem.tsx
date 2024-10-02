import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Grid,
  useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import theme from '../../theme';

interface MenuItemProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  calories: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  description,
  price,
  calories,
  imageUrl,
}) => {
  const screenSizeDownMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid item lg={6} xl={4} xs={12}>
      <Card
        sx={{
          minHeight: '140px',
          maxHeight: '150px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: screenSizeDownMd ? 'none' : '3px',
          padding: screenSizeDownMd ? '5px 10px' : '10px 15px',
          '&:hover': {
            transition: 'box-shadow 0.3s ease-in-out',
            boxShadow: '8px 19px 32px 7px rgba(224,220,224,1)',
            cursor: 'pointer',
          },
        }}
      >
        <CardContent
          sx={{
            padding: ' 0 !important',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              width: '100%',
            }}
          >
            <Box sx={{ flexGrow: '1' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: '8px',
                  fontSize: '14px',

                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {description}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '15px' }}>
                {calories} kcal
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: '15px', paddingTop: '3px' }}
              >
                £{price}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                marginTop: '5px',
                marginleft: 'auto',
              }}
            >
              <img
                src={imageUrl}
                alt={title}
                style={{
                  width: '95px',
                  height: '95px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginLeft: '10px',
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                marginTop: '5px',
              }}
            >
              <Button
                sx={{
                  border: '#DADCE0 1px solid',
                  color: '#04b8a9',
                  '&:hover': {
                    border: '#ccced4 1px solid',
                    color: '#00c5cc',
                  },

                  height: '95px',
                  maxWidth: '100px',
                  minWidth: '40px',
                  padding: '0',
                  margin: '0 15px',
                }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MenuItem;
