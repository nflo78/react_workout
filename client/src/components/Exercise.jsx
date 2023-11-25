import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import NewSet from './NewSet';
import { UserContext } from '../AppContext';

function Exercise() {
  const { username, workouts, single_exercise, single_split } = useContext(UserContext);
  const [user] = username;
  const [lastWorkout] = workouts;
  const [currentExercise] = single_exercise;
  const [currentSplit] = single_split;
  const [sets, setSets] = useState([1]);
  const [reps, setReps] = useState([]);
  const [weightLoad, setWeightLoad] = useState([]);
  const [prevWeight, setPrevWeight] = useState(0);
  const [warning, setWarning] = useState(false);
  // const handleNewSet = (e) => {
  //   e.preventDefault();
  //   setSets(sets.concat([sets.length + 1]));
  // };
  // useEffect(() => {console.log('REPS: ', reps); console.log('WEIGHTLOAD: ', weightLoad)}, [reps, weightLoad]);
  // const submitExercise = (e) => {
  //   e.preventDefault();
  //   const submission = {
  //     user: user,
  //     lastWorkout: lastWorkout,
  //     split: currentSplit,
  //     exercise: currentExercise,
  //     reps: reps,
  //     weight: weightLoad,
  //   };
  //   console.log('SUBMITTING: ', submission);
  //   return axios.post('/submitexercise', submission)
  //     .then(() => {console.log('session submitted!')})
  //     .catch((err) => {console.log('session error: ', err)})
  // };

  return (
    <>
      <Box>
        <Typography>{currentExercise}</Typography>
        <div>
          {currentExercise && sets.map((set, index) => (
            <NewSet
              key={set}
              index={index}
              sets={sets}
              setSets={setSets}
              reps={reps}
              setReps={setReps}
              weightLoad={weightLoad}
              setWeightLoad={setWeightLoad}
              prevWeight={prevWeight}
              setPrevWeight={setPrevWeight}
            />
          ))}
        </div>
        {/* <Button onClick={handleNewSet}>Add New Set</Button> */}
      </Box>
      {/* <Box>
        <Button onClick={submitExercise}>Submit Exercise</Button>
      </Box> */}
      {/* <Box>
        <Button onClick={testButton}>Test controller</Button>
        <Typography>{warning && 'WEE WOO'}</Typography>
        <Button onClick={test2Button}>Change Context</Button>
      </Box> */}
    </>
  );
}

export default Exercise;
