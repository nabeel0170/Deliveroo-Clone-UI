import React, { useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Info from './info';
import ViewReviews from './ViewReviews';
import OrderOptions from './orderOptions';
import { fetchRestaurantDetails } from '../../redux/restaurantReducers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const ContentSection: React.FC = () => {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const details = useAppSelector((state) => state.menu.details);
  const {
    restaurantName,
    foodTypes,
    distance,
    openTime,
    minOrderAmount,
    minDeliveryFee,
  } = details;
  const [randomHour, randomMinute] = openTime || [0, 0];

  useEffect(() => {
    dispatch(fetchRestaurantDetails());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        marginLeft: isDownSm ? '10px !important' : 0,
        marginTop: isDownSm ? '10px !important' : '36px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isDownLg ? 'column' : 'row',
          marginRight: isDownMd ? 0 : '10px',
          // paddingTop: isDownSm ? 0 : '32px',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '10px',
          }}
        >
          <Box
            sx={{
              marginBottom: '5px',
              marginLeft: isDownSm ? 0 : '10px',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: {
                  lg: '40px',
                  md: '30px',
                  sm: '25px',
                  xs: '18px',
                },
              }}
            >
              <strong>{restaurantName}</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { lg: '16px', md: '14px', sm: '12px', xs: '10px' },
              }}
            >
              {foodTypes.map((type, index) => (
                <React.Fragment key={index}>
                  {type}
                  {index < foodTypes.length - 1 && <span> &#183; </span>}
                </React.Fragment>
              ))}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { lg: '16px', md: '14px', sm: '12px', xs: '10px' },
                paddingTop: '8px',
              }}
            >
              {distance} miles away &#183; Opens at {randomHour}:{randomMinute}
              &#183; £{minOrderAmount} minimum &#183; £{minDeliveryFee} delivery
            </Typography>
          </Box>
          <Info />
          <ViewReviews />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            marginLeft: isDownLg ? 0 : 'auto',
          }}
        >
          <OrderOptions />
        </Box>
      </Box>
    </Box>
  );
};

export default ContentSection;
//
