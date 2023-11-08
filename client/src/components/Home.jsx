import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line
import { Link, useNavigate, redirect } from 'react-router-dom';
/* eslint-disable */
import {
  Box, Button, AppBar, Toolbar, IconButton, Typography, TextField, Menu, MenuItem
} from '@mui/material';
/* eslint-enable */
import axios from 'axios';
import Calendar from './Calendar';
import { UserContext } from '../AppContext';

function Home() {
  const [day, setDay] = useState(new Date().toDateString());
  // const { username } = useContext(UserContext);
  // const [user] = username;

  return (
    <Box>
      <div>{`The Date is ${new Date().toDateString()}`}</div>
      <div>{`Calendar date is ${new Date(day).toDateString()}`}</div>
      <Calendar setDay={setDay} />
      {/* <Button onClick={() => {console.log('check array context: ', username)}}>CHECK ARRAY</Button> */}
    </Box>
  );
}

export default Home;
