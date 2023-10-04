import React, { useState } from 'react';
// eslint-disable-next-line
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

function NewSet() {
  const [reps, setReps] = useState(0);
  const handleReps = (e) => {
    setReps(e.target.value);
  }
  return (
    <TextField label="Rep Count" onChange={handleReps} />
  );
}

export default NewSet;
