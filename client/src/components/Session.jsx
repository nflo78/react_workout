import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select, List, ListSubheader, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Exercise from './Exercise';

function Session({ allSplits, setCurrentExercise, currentSplit, setCurrentSplit }) {
  // const [currentSplit, setCurrentSplit] = useState('');
  // const [amount, setAmount] = useState([1]);
  const [session, setSession] = useState({ split: currentSplit });
  const [sessionExercises, setSessionExercises] = useState([]);
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();
  const handleSplitChange = (e) => {
    setWarning(false);
    setCurrentSplit(e.target.value);
  };
  const addExercise = (e) => {
    // e.preventDefault();
    if (currentSplit) {
      setCurrentExercise(e.currentTarget.innerText);
      navigate('/exercise');
    } else {
      setWarning(true);
    }
  };
  const getSplitExercises = () => {
    if (currentSplit) {
      return axios.post('/splitexercises', { currentSplit: currentSplit })
        .then((result) => {console.log('SPLIT EXERCISES: ', result);
          setSessionExercises(result.data.map((exercise) => exercise.name));
        })
        .catch((err) => {console.log('GET SPLIT EXERCISE ERR: ', err)})
    }
  };
  useEffect(() => {
    setSession({ split: currentSplit });
    getSplitExercises();
    // return axios.post('/getsplitexercises', { currentSplit: currentSplit });
  }, [currentSplit]);
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
      <div>{`CURRENT SPLIT ${currentSplit}`}</div>
      <Box>
        <List subheader={(
          <ListSubheader component="div" id="exercise-list-subheader">
            Exercises
          </ListSubheader>
          )}
        >
          {warning && (
            <ListSubheader component="div" id="exercise-list-warning">
              Select a split
            </ListSubheader>
          )}
          {sessionExercises && sessionExercises.map((exercise) => (
            <ListItemButton key={exercise} onClick={addExercise}>
              <ListItemText>{exercise}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Button onClick={addExercise}>{`Add New Exercise to today's ${currentSplit} workout`}</Button>
      <Button onClick={() => console.log('SESSION: ', session)}>Check Session</Button>
      <Button onClick={() => console.log(Date(new Date().toDateString()))}>Check WOO Date</Button>
    </Box>
  );
}

export default Session;
