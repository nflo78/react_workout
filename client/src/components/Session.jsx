import React, { useState } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import NewExercise from './NewExercise';

function Session({ user, setUser, allSplits, allExercises }) {
  const [currentSplit, setCurrentSplit] = useState('');
  const [amount, setAmount] = useState([1]);
  const handleSplitChange = (e) => {
    setCurrentSplit(e.target.value);
  };
  const addExercise = (e) => {
    e.preventDefault();
    setAmount(amount.concat([amount.length + 1]));
  };
  return (
      <Box>
        <FormControl style={{ width: '50vw' }}>
          <InputLabel>Today's workout</InputLabel>
          <Select
            value={currentSplit}
            label={"Today's workout"}
            onChange={handleSplitChange}
          >
            {allSplits.map((split) => (
              <MenuItem key={split} value={split}>{split}</MenuItem>))}
          </Select>
        </FormControl>
        {/* <div>{`CURRENT SPLIT ${currentSplit}`}</div> */}
        <div>
          {amount.map((numKey) => (
            <div key={numKey}>
              <FormControl key={numKey} style={{ minWidth: '25vw' }}>
                <NewExercise key={numKey} allExercises={allExercises} />
              </FormControl>
            </div>
          ))}
        </div>
        <Button onClick={addExercise}>{`Add New Exercise to today's ${currentSplit} workout`}</Button>
      </Box>
  );
}

export default Session;
