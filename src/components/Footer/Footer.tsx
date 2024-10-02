import { Box, Grid } from '@mui/material';
import FooterSection from './FooterSection';
import { footerItems } from './footerItems';
import FooterBottomRow from './FooterBottom';

const Footer: React.FC = () => {
  return (
    <Box sx={{ background: '#2e3333' }}>
      <Box
        sx={{
          padding: '24px 0 0 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          sx={{
            maxWidth: '1250px',
            padding: '0 10px',
          }}
          spacing={1}
        >
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection
              title={footerItems.DiscoverDeliveroo.title}
              listItem={footerItems.DiscoverDeliveroo.items}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection
              title={footerItems.Legal.title}
              listItem={footerItems.Legal.items}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection
              title={footerItems.Help.title}
              listItem={footerItems.Help.items}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection
              title={footerItems.Download.title}
              image={footerItems.Download.images}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FooterBottomRow />
      </Box>
    </Box>
  );
};
export default Footer;
