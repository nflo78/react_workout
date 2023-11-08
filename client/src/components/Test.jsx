import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../AppContext';
// eslint-disable-next-line
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

function Test() {
  const { username } = useContext(UserContext)
  const [user, setUser] = username;
  return (
    <Box>
      <Button onClick={() => {console.log('USER: ', user)}}>Context</Button>
      <Button onClick={() => { setUserVal('TESTTEST')}}>SET</Button>
    </Box>
  )
}

export default Test;
