import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navigation() {
  return (
    <AppBar sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: '#000000' }} position='static'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6' component='div'>
          🦆 Pro<span style={{ fontWeight: 'bold' }}>duc</span>tive
        </Typography>
        <Box>
          <Button color='inherit'>Settings</Button>
          <Button color='inherit'>Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
