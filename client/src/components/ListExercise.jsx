import React from 'react';
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select, List, ListSubheader, ListItemButton, ListItemText, Typography } from '@mui/material';

function ListExercise({ exercise, addExercise, relatedExercises }) {
  let sxBorder = { border: '1px solid blue' };
  if (relatedExercises.indexOf(exercise) === -1) {
    sxBorder = { border: '1px solid black' };
  }
  return (
    <ListItemButton key={exercise} onClick={addExercise} sx={sxBorder}>
      <ListItemText>{exercise}</ListItemText>
    </ListItemButton>
  );
}

export default ListExercise;
