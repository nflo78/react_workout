import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import NewExercise from './NewExercise';

function Session ({ user, allSplits }) {

  const [currentSplit, setCurrentSplit] = useState('');
  const [newExercise, setNewExercise] = useState('');
  const [amount, setAmount] = useState([1]);
  // useEffect(() => { setNewExercise(allSplits[0].name) }, [allSplits])
  const handleSplitChange = (e) => {
    setCurrentSplit(e.target.value)
  }
  const handleNewExercise = (e) => {
    setNewExercise(e.target.value)
  }
  const addExercise = (e) => {
    e.preventDefault();
    setAmount(amount.concat([amount.length + 1]))
    console.log(allSplits)
  }
  const submitNewExercise = (e) => {
    e.preventDefault();
    return axios.post('/newexercise', {user: user, exercise: newExercise})
      .then(() => { console.log('NEW EXERCISE SUBMITTED!') })
      .catch((err) => { console.log('NEW EXERCISE SUBMISSION ERR: ', err) })
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
      <FormControl style={{width: "50vw"}}>
        <TextField label={`Add Your Exercises`} onChange={handleNewExercise}/>
        <Button onClick={submitNewExercise}>Add Exercise</Button>
      </FormControl>
      {/* {amount.map((exercise) => <NewExercise key={exercise}/>)} */}
      {/* <Button onClick={addExercise}>+</Button> */}
    </Box>
    // need to add an "add-exercise component?"
  )
}

export default Session;