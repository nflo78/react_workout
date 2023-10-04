import React, { useState } from 'react';
// eslint-disable-next-line
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import NewSet from './NewSet';
function NewExercise({ user, allExercises }) {
  const [currentExercise, setCurrentExercise] = useState('');
  const handleExerciseChange = (e) => {
    setCurrentExercise(e.target.value);
  };
  const [sets, setSets] = useState([1]);
  const handleNewSet = (e) => {
    e.preventDefault();
    setSets(sets.concat([sets.length + 1]))
  }
  return (
    <>
      <InputLabel>Exercise</InputLabel>
      <Select
        value={currentExercise}
        // label="loooooooooong"
        onChange={handleExerciseChange}
      >
        {allExercises && allExercises.map((exercise) => (
          <MenuItem key={exercise} value={exercise}>{exercise}</MenuItem>
        ))}
      </Select>
      <div>
        {currentExercise && sets.map((set) => <NewSet key={set} />)}
      </div>
      <Button onClick={handleNewSet}>Add New Set</Button>
    </>
  );
}

export default NewExercise;
