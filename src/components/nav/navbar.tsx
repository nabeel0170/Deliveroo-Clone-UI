import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material';
import React from 'react';
import NavSearchBar from './navSearchBar';
import PrimaryCommonButton from '../commons/primaryButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { setLoggedOut } from '../../redux/slices/userSlice';
import Cookies from 'js-cookie';

const NavBar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const screenSizeUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const screenSizeUpSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isLoggedIn = useAppSelector((state) => state.user.LoggedIn);
  const navigateToLogin = () => {
    console.log('navigate');
    navigate('/login');
  };
  const logOutUser = () => {
    Cookies.remove('token');
    dispatch(setLoggedOut());
  };

  return (
    <>
      <AppBar
        component="nav"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: '#dadce0 0.5px solid',
          height: screenSizeUpSm ? '73px' : '56px ',
          boxSizing: 'border-box',
          padding: '0 64px',
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'center',
            padding: '0 !important',
            height: screenSizeUpSm ? '73px' : '56px ',
          }}
          disableGutters={false}
        >
          <a href="/" style={{ height: '32px', width: '121px' }}>
            <img
              src="./logo/deliveroo-logo.png"
              alt="Deliveroo Logo"
              style={{ height: '32px', width: '121px' }}
            />
          </a>

          <Box
            sx={{
              width: '1315px',
              justifyContent: 'center',
              display: 'flex',
              padding: '0px 16px',
            }}
          >
            <NavSearchBar />
          </Box>
          <Toolbar sx={{ gap: 1 }} disableGutters={true}>
            {screenSizeUpMd && isLoggedIn === false && (
              <PrimaryCommonButton
                name={'Sign up or log in'}
                Icon={HomeIcon}
                onClick={navigateToLogin}
              />
            )}
            {screenSizeUpMd && isLoggedIn === true && (
              <PrimaryCommonButton
                name={'Logout'}
                Icon={LogoutIcon}
                onClick={logOutUser}
              />
            )}
            {screenSizeUpSm ? (
              <PrimaryCommonButton
                name={'Account'}
                Icon={PersonOutlineIcon}
                onClick={navigateToLogin}
              />
            ) : (
              <PrimaryCommonButton Icon={PersonOutlineIcon} />
            )}
          </Toolbar>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default NavBar;
