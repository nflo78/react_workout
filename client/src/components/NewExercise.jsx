import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

function NewExercise ({ user }) {
  const [newExercise, setNewExercise] = useState('');

  const handleNewExercise = (e) => {
    setNewExercise(e.target.value)
  }

  const submitNewExercise = (e) => {
    e.preventDefault();
    return axios.post('/newexercise', {user: user, exercise: newExercise})
      .then(() => { console.log('NEW EXERCISE SUBMITTED!') })
      .catch((err) => { console.log('NEW EXERCISE SUBMISSION ERR: ', err) })
  }
  return (
    <FormControl style={{width: "50vw"}}>
      <TextField label={`Add Your Exercises`} onChange={handleNewExercise}/>
      <Button onClick={submitNewExercise}>Add Exercise</Button>
    </FormControl>
  )
}

export default NewExercise;