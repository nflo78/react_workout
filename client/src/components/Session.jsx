import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select, List, ListSubheader, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { UserContext } from '../AppContext';
import DateMenu from './DateMenu';

function Session() {
  const { username, id, splits, single_exercise, single_split } = useContext(UserContext);
  const [user] = username;
  const [userId] = id
  const [allSplits] = splits;
  const [currentSplit, setCurrentSplit] = single_split;
  const [, setCurrentExercise] = single_exercise;
  const [sessionExercises, setSessionExercises] = useState([]);
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [warning, setWarning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const navigate = useNavigate();
  const blackBorderSX = { border: '1px solid black' };
  const handleSplitChange = (e) => {
    setWarning(false);
    setCurrentSplit(e.target.value);
  };
  const addExercise = (e) => {
    // e.preventDefault();
    setCurrentExercise(e.currentTarget.innerText);
    navigate('/exercise');
    // if (currentSplit) {
    //   setCurrentExercise(e.currentTarget.innerText);
    //   navigate('/exercise');
    // } else {
    //   setWarning(true);
    // }
  };
  const getSession = () => axios.post('/getsession', { userId: userId })
    .then((result) => {
      console.log('GET SESSION: ', result.data);
      if (result.data && result.data[0].name) {
        setCurrentSplit(result.data[0].name);
        setSessionStarted(true);
      }
    })
    .catch((err) => {console.log('GET SESSION ERROR: ', err); });

  const startSession = () => axios.post('/startsession', { userId: userId, currentSplit: currentSplit, startDate: startDate })
    .then(() => setSessionStarted(true))
    .catch((err) => console.log('START SESSION ERROR: ', err));

  const stopSession = () => axios.post('/stopsession', { userId: userId})
    .then(() => setCurrentSplit(''))
    .catch((err) => { console.log('STOP SESSION ERROR: ', err)});

  const getSplitExercises = () => axios.post('/splitexercises', { currentSplit: currentSplit })
    .then((result) => {console.log('SPLIT EXERCISES: ', result);
      setSessionExercises(result.data.map((exercise) => exercise.name));
    })
    .catch((err) => {console.log('GET SPLIT EXERCISE ERR: ', err)});

  useEffect(() => {
    if (currentSplit) {
      getSplitExercises();
    } else {
      setSessionStarted(false);
    }
  }, [currentSplit]);

  useEffect(() => {getSession()}, [userId])
  return (
    <Box sx={blackBorderSX}>
      <br></br>
      {!sessionStarted
      && (
      <FormControl style={{ width: '50vw' }}>
        <DateMenu startDate={startDate} setStartDate={setStartDate} />
        <TextField
          select
          value={currentSplit}
          onChange={handleSplitChange}
          label="Splits"
        >
          {allSplits.map((split) => (
            <MenuItem key={split} value={split}>{split}</MenuItem>))}
        </TextField>
        <Button disabled={!currentSplit} onClick={startSession}>Begin Workout Session</Button>
      </FormControl>
      )}
      {/* <div>{`CURRENT SPLIT ${currentSplit}`}</div> */}

      {sessionStarted
      && (
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
        <Button onClick={stopSession}>Finish Workout Session</Button>
      </Box>
      )}
    </Box>
  );
}

export default Session;
