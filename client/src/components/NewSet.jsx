import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../AppContext';

function NewSet({
  reps, setReps, sets, setSets, index, weightLoad, setWeightLoad, prevWeight, setPrevWeight,
}) {
  const { id, single_exercise } = useContext(UserContext);
  const [userId] = id;
  const [currentExercise] = single_exercise;
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState(false);
  const [weight, setWeight] = useState(prevWeight);
  const [textDisabled, setTextDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const blackBorderSX = { border: '1px solid black' };

  const handleCount = (e) => {
    setCount(e.target.value);
  };
  const handleWeight = (e) => {
    setWeight(e.target.value);
  };
  const handleNewSet = () => {
    if ((!Number(count) && count) || (!Number(weight) && weight)) {
      setWarning(true);
      setSubmitDisabled(true);
      return;
    }
    setWarning(false);
    setSubmitDisabled(false);
    if (count && weight) {
      const newReps = reps.slice();
      const newWeightLoad = weightLoad.slice();
      newReps[index] = Number(count);
      newWeightLoad[index] = Number(weight);
      setPrevWeight(weight);
      setReps(newReps);
      setWeightLoad(newWeightLoad);
    }
  };

  const submitSet = (e) => {
    e.preventDefault();
    // if ((!Number(count) && count) || (!Number(weight) && weight)) {
    //   return setWarning(true);
    // }

    return axios.post('/submitset', { userId: userId, reps: count, weight: weight, exercise: currentExercise })
      .then((result) => { console.log('NEW SET SUBMITTED'); setTextDisabled(true); })
      .then(() => setSets(sets.concat([sets.length + 1])))
      .catch((err) => { console.log('NEW SET SUBMISSION ERROR: ', err); });
  };

  useEffect(handleNewSet, [count, weight]);
  return (
    <Box sx={blackBorderSX}>
      <Typography>{`Set ${index + 1}`}</Typography>
      <TextField label="Rep Count" onChange={handleCount} disabled={textDisabled} />
      <TextField label="lbs" onChange={handleWeight} defaultValue={prevWeight} disabled={textDisabled} />
      <Button onClick={submitSet} disabled={submitDisabled}>Submit Set</Button>
      <div>{`WEIGHT: ${weight}`}</div>
      {warning && <Typography>Please enter a valid number</Typography>}
    </Box>
  );
}

export default NewSet;
