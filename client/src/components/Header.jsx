import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line
import { Link, useNavigate, redirect } from 'react-router-dom';
/* eslint-disable */
import { UserContext } from '../AppContext';
import {
  Box, Button, AppBar, Toolbar, IconButton, Typography, TextField, Menu, MenuItem
} from '@mui/material';

function Header () {
  const navigate = useNavigate();
  const { username, authenticated } = useContext(UserContext);
  const [user, setUser] = username;
  const [, setAuthenticated] = authenticated;
  const handleLogout = async (e) => {
    e.preventDefault();
    document.cookie = 'workoutv1= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    await setAuthenticated(false);
    await setUser('');
    navigate('/');
  }
  return (
    user ?
    <AppBar position="sticky">
      <Toolbar>
        <Typography component="div">
          {`Welcome ${user}`}
        </Typography>
        <Button sx={{ rightt:'100%', color: 'white', display: 'block' }} onClick={() => navigate('/edit')}>
          Edit
        </Button>
        <Button sx={{color: 'white', display: 'block' }} onClick={() => navigate('/session')}>
          Session
        </Button>
        <Button sx={{ right: '0%' }} color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar> :
    <AppBar position="sticky">
      <Toolbar>
        <Typography>
          React Workout
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
