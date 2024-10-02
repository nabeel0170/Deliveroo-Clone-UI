import NavBar from '../components/nav/navbar';
import Footer from '../components/Footer/Footer';
import React, { useEffect, useRef, useState } from 'react';
import CategoriesNav from '../components/categories/CategoriesTab';
import { Box, useMediaQuery } from '@mui/system';
import MenuContent from '../components/menuheader/menuContent';
import ItemSection from '../components/items/itemSections';
import Basket from '../components/basket/basket';
import theme from '../theme';
import { Grid } from '@mui/material';
import axios from 'axios';
const APIKEY = process.env.REACT_APP_API_KEY;
interface itemSection {
  id: number;
  name: string;
}

const Menu: React.FC = () => {
  const screenSizeUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const screenSizeDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [itemSections, setItemSections] = useState<itemSection[]>([]);
  const sectionRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://192.168.1.6:8000/api/restaurant/itemCategories',
          {
            headers: { 'api-key': APIKEY },
          },
        );
        setItemSections(response.data);

        // Create a ref for each section and store in sectionRefs.current
        sectionRefs.current = response.data.map(() =>
          React.createRef<HTMLDivElement>(),
        );
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Log the refs once itemSections is updated
  useEffect(() => {
    if (itemSections.length > 0) {
      console.log('Section refs:', sectionRefs.current);
    }
  }, [itemSections]);

  return (
    <Box
      sx={{
        minWidth: '260px',
        paddingTop: screenSizeUpSm ? '73px' : '53px',
      }}
    >
      <NavBar />

      <Grid
        container
        maxWidth="xl"
        sx={{
          margin: '0 auto ',
          paddingLeft: screenSizeUpMd ? '64px' : '32px',
          paddingRight: screenSizeUpMd ? '64px' : '32px',
          padding: screenSizeDownSm ? '0' : undefined,
        }}
      >
        <Grid item xs={12}>
          <MenuContent />
        </Grid>
      </Grid>

      <Box
        sx={{
          borderTop: '1px solid #DADCE0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: screenSizeUpSm ? 72 : 56,
          background: 'white',
          height: '73px',
          zIndex: '1000',
        }}
      >
        <CategoriesNav sectionRefs={sectionRefs.current} />
      </Box>
      <Box
        sx={{
          background: '#f0f5f4',
        }}
      >
        <Grid
          container
          maxWidth="xl"
          sx={{
            marginTop: 3,
            padding: {
              lg: '0 64px !important',
              md: '0 64px !important',
              sm: '0 24px !important',
              xs: '0 !important',
            },
            margin: '0 auto ',
          }}
        >
          <Grid item xs={12} md={8} sx={{ padding: '0 !important' }}>
            <ItemSection sectionRefs={sectionRefs.current} />
          </Grid>
          {screenSizeUpMd && (
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',

                justifyContent: 'center',
              }}
            >
              <Basket />
            </Grid>
          )}
        </Grid>
      </Box>

      {/* <Items /> */}
      <Footer />
    </Box>
  );
};
export default Menu;
