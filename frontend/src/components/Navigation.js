import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navigation({ token, handleLogout }) {
  const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: '#000000',
  });

  if (token === '' || token === null) {
    return (
      <AppBar sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: '#000000' }} position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledLink to='/'>
            <Typography variant='h6' component='div'>
              🦆 Pro<span style={{ fontWeight: 'bold' }}>duck</span>tive
            </Typography>
          </StyledLink>
          <Box>
            <Button color='inherit' sx={{ fontSize: '16px', textTransform: 'none' }}>
              <StyledLink to='/settings'>Settings</StyledLink>
            </Button>
            <Button color='inherit' sx={{ fontSize: '16px', textTransform: 'none' }}>
              <StyledLink to='/login'>Login</StyledLink>
            </Button>
            <Button color='inherit' sx={{ fontSize: '16px', textTransform: 'none' }}>
              <StyledLink to='/register'>Register</StyledLink>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: '#000000' }} position='static'>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledLink to='/'>
            <Typography variant='h6' component='div'>
              🦆 Pro<span style={{ fontWeight: 'bold' }}>duck</span>tive
            </Typography>
          </StyledLink>
          <Box>
            <Button color='inherit' sx={{ fontSize: '16px', textTransform: 'none' }}>
              <StyledLink to='/settings'>Settings</StyledLink>
            </Button>
            <Button color='inherit' sx={{ fontSize: '16px', textTransform: 'none' }}>
              <StyledLink to='/report'>Report</StyledLink>
            </Button>
            <Button color='inherit' sx={{ fontSize: '16px', textTransform: 'none' }} onClick={handleLogout}>
              <StyledLink to='/'>Logout</StyledLink>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}

Navigation.propTypes = {
  token: PropTypes.string,
  handleLogout: PropTypes.func,
};

export default Navigation;
