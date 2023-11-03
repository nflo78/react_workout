import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { Link, useNavigate, redirect } from 'react-router-dom';
/* eslint-disable */
import {
  Box, Button, AppBar, Toolbar, IconButton, Typography, TextField, Menu, MenuItem
} from '@mui/material';
/* eslint-enable */
import axios from 'axios';
import Calendar from './Calendar';

function Home() {
  const [day, setDay] = useState(new Date().toDateString());

  return (
    <Box>
      <div>{`The Date is ${new Date().toDateString()}`}</div>
      <div>{`Calendar date is ${new Date(day).toDateString()}`}</div>
      <Calendar setDay={setDay} />
    </Box>
  );
}

export default Home;
