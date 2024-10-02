import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { StyledListItem } from './styledListItem';
import theme from '../../theme';
import styled from 'styled-components';
import { Container } from '@mui/system';

const APIKEY = process.env.REACT_APP_API_KEY;

interface CategoriesTabProps {
  sectionRefs: React.RefObject<HTMLDivElement>[];
}

interface Category {
  id: number;
  name: string;
}

const StyledList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  alignItems: 'center',
  display: 'flex',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const CategoriesNav: React.FC<CategoriesTabProps> = ({ sectionRefs }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleCategories, setVisibleCategories] = useState<Category[]>([]);
  const [overflowCategories, setOverflowCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenSizeDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const screenSizeDownMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://192.168.1.6:8000/api/restaurant/itemCategories',
          {
            headers: { 'api-key': APIKEY },
          },
        );
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (listRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 140;
        const moreButtonWidth = 100;

        if (screenSizeDownSm) {
          setVisibleCategories(categories);
          setOverflowCategories([]);
        } else {
          const maxVisibleItems = Math.floor(
            (containerWidth - moreButtonWidth) / itemWidth,
          );
          const visible = categories.slice(0, maxVisibleItems);
          const overflow = categories.slice(maxVisibleItems);

          setVisibleCategories(visible);
          setOverflowCategories(overflow);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categories, screenSizeDownSm]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('id'));
          setSelectedCategory(id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sectionRefs.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs]);

  const handleCategorySelection = (id: number) => {
    setSelectedCategory(id);
    setAnchorEl(null);
    scrollToSection(id);
  };

  const handleMoreDropdownClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (id: number) => {
    const section = sectionRefs[id - 1]?.current;
    if (section) {
      const headerHeight = 73;
      const categoriesNavHeight = 73;
      const elementPosition =
        section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition =
        elementPosition - headerHeight - categoriesNavHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Container maxWidth="xl" disableGutters={true}>
      <Box
        ref={containerRef}
        sx={{
          background: 'white',
          padding: screenSizeDownMd ? '0 16px' : '0 64px',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          disableGutters={true}
        >
          <StyledList
            ref={listRef}
            style={{
              overflowX: screenSizeDownSm ? 'scroll' : 'hidden',
            }}
          >
            {visibleCategories.map(({ name, id }) => (
              <StyledListItem
                key={id}
                isSelected={selectedCategory === id}
                onClick={() => handleCategorySelection(id)}
              >
                {name}
              </StyledListItem>
            ))}
            <StyledListItem />
            {overflowCategories.length > 0 && !screenSizeDownSm && (
              <Box>
                <Button
                  onClick={handleMoreDropdownClick}
                  endIcon={<ChevronDown />}
                  sx={{
                    minWidth: 'auto',
                    color: '#00CCBC',
                    padding: 0,
                    textTransform: 'none',
                  }}
                >
                  More
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  {overflowCategories.map(({ name, id }) => (
                    <MenuItem
                      key={id}
                      onClick={() => handleCategorySelection(id)}
                      id={id.toString()}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </StyledList>
        </Toolbar>
      </Box>
    </Container>
  );
};

export default CategoriesNav;
