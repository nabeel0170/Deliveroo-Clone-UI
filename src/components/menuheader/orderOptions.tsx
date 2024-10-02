import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import PrimaryCommonButton from '../commons/primaryButton';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const OrderOptions: React.FC = () => {
  const theme = useTheme();
  const screenSizeUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const screenSizeDownLg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '250px',
        paddingTop: '16px',
      }}
    >
      <Box
        sx={{
          marginLeft: '5px',
        }}
      >
        <Link
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
            textDecoration: 'none',
            fontSize: '16px',
          }}
          href="/"
        >
          <img
            src="./icons/delivery.png"
            style={{ height: '24px', marginRight: '10px' }}
            alt="Delivery"
          />
          <Typography
            variant="body1"
            sx={{ color: 'inherit', fontSize: '16px' }}
          >
            Deliver from 11:00 - 11:30
            <span style={{ color: '#00ccbc', marginLeft: '10px' }}>Change</span>
          </Typography>
        </Link>
        {screenSizeUpMd && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: screenSizeDownLg ? 'start ' : 'flex-end',
              marginTop: '10px',
            }}
          >
            <PrimaryCommonButton
              name={'Start Group Order'}
              Icon={PeopleAltOutlinedIcon}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderOptions;
