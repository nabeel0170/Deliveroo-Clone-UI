import { Box, useMediaQuery } from '@mui/system';

import { Button, Typography } from '@mui/material';
import theme from '../../theme';

interface BasketItems {
  items?: string;
}

const Basket: React.FC<BasketItems> = () => {
  const screenSizeUpMd = useMediaQuery(theme.breakpoints.up('md'));

  if (!screenSizeUpMd) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '500px',
        height: 'calc(100vh - 64px - 73px - 73px)',
        border: '0.5px solid #dadce0',
        position: 'sticky',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: screenSizeUpMd ? '32px' : 0,
        marginLeft: screenSizeUpMd ? '32px' : 0,
        top: 160,
        background: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <Box
          sx={{
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src="./icons/shopping-cart.png"
              alt="Shopping Cart"
              style={{ height: '40px' }}
            />
          </Box>
          <Box>
            <Typography variant="body2">Your Basket is Empty</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Button
          sx={{
            width: '90%',
            backgroundColor: '#dadce0',
            margin: '16px auto',
            display: 'block',
          }}
          disabled
        >
          Go to Checkout
        </Button>
      </Box>
    </Box>
  );
};
export default Basket;
