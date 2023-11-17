import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line
import { Link, useNavigate, redirect } from 'react-router-dom';
/* eslint-disable */
import {
  Box, Button, AppBar, Toolbar, IconButton, Typography, TextField, Menu, MenuItem
} from '@mui/material';
/* eslint-enable */
import axios from 'axios';
import dayjs from 'dayjs';
import Calendar from './Calendar';
import { UserContext } from '../AppContext';

function Home() {
  const [day, setDay] = useState(dayjs(new Date()));
  const { username } = useContext(UserContext);
  const [user] = username;
  const blackBorderSX = { border: '1px solid black' };
  // const lastWorkout = () => axios.post('/recentworkout', {user: user, date: day})
  //   .then((result) => {console.log('RECENT WORKOUT: ', result)})
  //   .catch((err) => {console.log('RECENT WORKOUT ERR: ', err)})
  // useEffect(() => {lastWorkout()}, [day]);
  return (
    <Box sx={{ border: '1px solid black', display: 'flex' }}>
      <Box sx={blackBorderSX} component="span">
        Recent Workout
      </Box>
      <Box sx={blackBorderSX} component="span">
        <Calendar setDay={setDay} />
      </Box>
    </Box>
  );
}

export default Home;
