import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { Link, useNavigate, redirect } from 'react-router-dom';
/* eslint-disable */
import {
  Box, Button, AppBar, Toolbar, IconButton, Typography, TextField, Menu, MenuItem
} from '@mui/material';

function Header ({user, setUser}) {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    document.cookie = 'workoutv1= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    await setUser('');
    navigate('/');
  }

  return (
    user ?
    <AppBar position="static">
      <Toolbar>
        <Typography component="div">
          {`Welcome ${user}`}
        </Typography>
        <Button sx={{ rightt:'100%', color: 'white', display: 'block' }} onClick={() => navigate('/splits')}>
          Splits
        </Button>
        <Button sx={{color: 'white', display: 'block' }} onClick={() => navigate('/session')}>
          Session
        </Button>
        <Button sx={{ right: '0%' }} color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar> :
    <AppBar>
      <Toolbar>
        <Typography>
          React Workout
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
