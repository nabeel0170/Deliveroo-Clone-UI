import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import HeaderSection from './headerSection';
import ContentSection from './contentSection';
import theme from '../../theme';

const MenuContent: React.FC = () => {
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      direction={isDownSm ? 'column' : 'row'}
      sx={{
        marginTop: isDownSm ? 0 : '10px',
        padding: isDownMd ? '0 0 24px 0  ' : '16px 0 32px 0',
        margin: '0 auto',
      }}
    >
      <Grid item xs={3}>
        <HeaderSection />
      </Grid>

      <Grid item sx={{ flexGrow: 1 }}>
        <ContentSection />
      </Grid>
    </Grid>
  );
};
export default MenuContent;
