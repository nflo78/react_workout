import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

function Session ({allSplits}) {

  const [currentSplit, setCurrentSplit] = useState('');
  const [newExercise, setNewExercise] = useState('')
  const handleSplitChange = (e) => {
    setCurrentSplit(e.target.value)
  }
  const handleExercise = (e) => {
    setNewExercise(e.target.value)
  }
  return (
    <Box>
      <FormControl style={{width: "50vw"}}>
        <InputLabel>Today's workout</InputLabel>
        <Select
          value={currentSplit}
          label={"Today's workout"}
          onChange={handleSplitChange}
        >
          {allSplits.map((split) => <MenuItem key={split.name} value={split.name}>{split.name}</MenuItem>)}
        </Select>
      </FormControl>
      <div>{`CURRENT SPLIT ${currentSplit}`}</div>
      {/* <div>{`CURRENT EXERCISE ${newExercise}`}</div>
      <TextField onChange={handleExercise}></TextField> */}
    </Box>
    // need to add an "add-exercise component?"
  )
}

export default Session;