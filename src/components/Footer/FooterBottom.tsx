import { Box, Typography } from '@mui/material';
import FooterIconButton from './Icon';

const FooterBottomRow: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
      }}
    >
      <Box sx={{ minWidth: '150px' }}>
        <FooterIconButton iconSrc={'./icons/facebook.png'} />
        <FooterIconButton iconSrc={'./icons/twitter.png'} />
        <FooterIconButton iconSrc={'./icons/instagram.png'} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: '0.75rem', color: '#585c5c' }}>
          © 2024 Deliveroo
        </Typography>
      </Box>
    </Box>
  );
};
export default FooterBottomRow;
