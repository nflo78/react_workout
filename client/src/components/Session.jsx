import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import NewExercise from './NewExercise';

function Session ({ user, allSplits }) {

  const [currentSplit, setCurrentSplit] = useState('');
  const [amount, setAmount] = useState([1]);
  // useEffect(() => { setNewExercise(allSplits[0].name) }, [allSplits])
  const handleSplitChange = (e) => {
    setCurrentSplit(e.target.value)
  }

  const addExercise = (e) => {
    e.preventDefault();
    setAmount(amount.concat([amount.length + 1]))
    console.log(allSplits)
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
      {/* {amount.map((exercise) => <NewExercise key={exercise}/>)} */}
    </Box>
  )
}

export default Session;