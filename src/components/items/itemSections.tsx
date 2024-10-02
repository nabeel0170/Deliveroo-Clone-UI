import React, { useRef, useState, useEffect } from 'react';
import { Typography, Box, Grid, useMediaQuery } from '@mui/material';
import ScrollButton from './scrollButton';
import PopularFoodCard from './popularItemCard';
import theme from '../../theme';
import axios from 'axios';
import MenuItem from './menuItem';

const APIKEY = process.env.REACT_APP_API_KEY;
interface FoodItem {
  image: string;
  name: string;
  calories: number;
  price: number;
  description: string;
}
interface ItemSectionProps {
  sectionRefs: React.RefObject<HTMLDivElement>[];
}
interface ItemSectionProps {
  sectionRefs: React.RefObject<HTMLDivElement>[];
}

interface itemSection {
  id: number;
  name: string;
}

const ItemSection: React.FC<ItemSectionProps> = ({ sectionRefs }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [itemSections, setItemSections] = useState<itemSection[]>([]);
  const screenSizeDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const screenSizeDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [popularItems, setPopularItems] = useState<FoodItem[]>([]);

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };
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
        console.log(itemSections);
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleScroll = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const current = gridRef.current;
    if (current) {
      current.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (current) {
        current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (gridRef.current) {
        const { scrollWidth, clientWidth } = gridRef.current;
        setShowRightButton(scrollWidth > clientWidth);
        setShowLeftButton(false);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [popularItems]);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const response = await axios.post(
          'http://192.168.1.6:8000/api/restaurant/items',
          { count: 20 },
          {
            headers: { 'api-key': APIKEY },
          },
        );
        setPopularItems(response.data || []);
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    };
    fetchPopularItems();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '15px',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: '0.75rem',
            marginLeft: screenSizeDownMd ? '14px' : 0,
          }}
        >
          Adults need around 2000 kcal a day
        </Typography>
        <Box sx={{ marginTop: '24px' }}>
          <Typography
            variant="h6"
            sx={{
              width: 'fit-content',
              fontWeight: 'bold',
              fontSize: '24px',
              marginLeft: screenSizeDownMd ? '14px' : 0,
            }}
          >
            Popular with other people
          </Typography>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {showLeftButton && !screenSizeDownMd && (
              <ScrollButton direction="left" onClick={scrollLeft} />
            )}
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                margin: '0 16px',
                width: '100%',
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': {
                  display: screenSizeDownSm ? '' : 'none',
                },
              }}
              ref={gridRef}
            >
              <Grid
                container
                sx={{
                  flexWrap: 'nowrap',
                  marginBottom: '5px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: '15px',
                  }}
                >
                  {popularItems.map((item, index) => (
                    <Box key={index}>
                      <PopularFoodCard
                        image={item.image}
                        name={item.name}
                        calories={item.calories}
                        price={item.price}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Box>
            {showRightButton && !screenSizeDownMd && (
              <ScrollButton direction="right" onClick={scrollRight} />
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {itemSections.map((section, index) => (
            <Grid
              container
              key={index}
              direction="row"
              sx={{
                mt: screenSizeDownMd ? 0 : 1,
              }}
              spacing={screenSizeDownSm ? 0 : 2}
              id={section.id?.toString()}
              ref={sectionRefs[index]}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    marginLeft: screenSizeDownMd ? '14px' : 0.5,
                    fontWeight: 'bold',
                  }}
                >
                  {section.name}
                </Typography>
              </Grid>
              {popularItems.map((item, index) => (
                <MenuItem
                  key={index}
                  imageUrl={item.image}
                  title={item.name}
                  calories={item.calories}
                  description={item.description}
                  price={item.price}
                />
              ))}
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemSection;
