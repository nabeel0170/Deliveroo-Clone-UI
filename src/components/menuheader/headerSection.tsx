import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import RoundBackButton from './roundBackButton';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StyledOrderButton from './StyledOrderButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchRestaurantDetails } from '../../redux/restaurantReducers';
import BackButton from './backButton';

const HeaderSection: React.FC = () => {
  const theme = useTheme();
  const screenSizeDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const screenSizeDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const dispatch = useAppDispatch();
  const details = useAppSelector((state) => state.menu.details);
  const { itemImgSrc } = details;

  useEffect(() => {
    dispatch(fetchRestaurantDetails());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        height: '100%',
      }}
    >
      {screenSizeUpSm && <BackButton />}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'row',
          backgroundImage: `url(${itemImgSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          minHeight: '220px',

          minWidth: screenSizeDownSm ? '100%' : '120px',
          maxWidth: screenSizeDownSm ? '100%' : '460px',
          width: '100%',
          height: screenSizeDownSm ? '210px' : '100%',
          position: 'relative',
          flexShrink: 1,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: screenSizeDownSm ? 'flex-end' : 'center',
            padding: '10px',
          }}
        >
          {screenSizeDownMd && (
            <StyledOrderButton
              name={'Start Group Order'}
              Icon={PeopleAltOutlinedIcon}
            />
          )}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
          }}
        >
          {screenSizeDownSm && <RoundBackButton />}
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderSection;
