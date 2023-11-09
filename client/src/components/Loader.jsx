import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../AppContext';
// eslint-disable-next-line
import { Box, CircularProgress } from '@mui/material';

function Loader() {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', border: '1px solid black' }}>
      <CircularProgress size={100} sx={{ display: 'absolute', border: '1px solid black'}}/>
    </Box>
  );
}

export default Loader;
