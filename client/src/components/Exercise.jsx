import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import NewSet from './NewSet';
import DateMenu from './DateMenu';
import { UserContext } from '../AppContext';

function Exercise() {
  const { username, single_exercise, single_split } = useContext(UserContext);
  const [user] = username;
  const [currentExercise] = single_exercise;
  const [currentSplit] = single_split;
  const [sets, setSets] = useState([1]);
  const [reps, setReps] = useState([]);
  const [weightLoad, setWeightLoad] = useState([]);
  const [prevWeight, setPrevWeight] = useState(0);
  const [menuDate, setMenuDate] = useState(dayjs(new Date()));
  const [warning, setWarning] = useState(false);
  const handleNewSet = (e) => {
    e.preventDefault();
    setSets(sets.concat([sets.length + 1]));
  };
  useEffect(() => {console.log('REPS: ', reps); console.log('WEIGHTLOAD: ', weightLoad)}, [reps, weightLoad]);
  const submitExercise = (e) => {
    e.preventDefault();
    const submission = {
      user: user,
      split: currentSplit,
      exercise: currentExercise,
      reps: reps,
      weight: weightLoad,
      date: new Date(menuDate),
    };
    console.log('SUBMITTING: ', submission);
    return axios.post('/submitexercise', submission)
      .then(() => {console.log('session submitted!')})
      .catch((err) => {console.log('session error: ', err)})
  };

  return (
    <>
      <Box>
        <Typography>{currentExercise}</Typography>
        <DateMenu menuDate={menuDate} setMenuDate={setMenuDate} />
        <div>
          {currentExercise && sets.map((set, index) => (
            <NewSet
              key={set}
              index={index}
              reps={reps}
              setReps={setReps}
              weightLoad={weightLoad}
              setWeightLoad={setWeightLoad}
              prevWeight={prevWeight}
              setPrevWeight={setPrevWeight}
            />
          ))}
        </div>
        <Button onClick={handleNewSet}>Add New Set</Button>
      </Box>
      <Box>
        <Button onClick={submitExercise}>Submit Exercise</Button>
        <Button onClick={() => {console.log('DATE: ', menuDate); console.log('NEW DATE: ', new Date(menuDate))}}>Check Date</Button>
      </Box>
      {/* <Box>
        <Button onClick={testButton}>Test controller</Button>
        <Typography>{warning && 'WEE WOO'}</Typography>
        <Button onClick={test2Button}>Change Context</Button>
      </Box> */}
    </>
  );
}

export default Exercise;
