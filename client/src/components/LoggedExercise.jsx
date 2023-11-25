import React, { useState, useContext } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

function LoggedExercise({ name, sets }) {
  return (
    <Box>
      <Box>
        <Typography>{name}</Typography>
      </Box>
      {sets.map((set, index) => (
        <Box key={index}>
          <Typography>{`Set ${index + 1}  ${set.reps} Reps At ${set.weight} lbs`}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default LoggedExercise;
