import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { Box, Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

function NewSet({
  reps, setReps, index, weightLoad, setWeightLoad, prevWeight, setPrevWeight,
}) {
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState(false);
  const [weight, setWeight] = useState(prevWeight);
  const handleCount = (e) => {
    setCount(e.target.value);
  };
  const handleWeight = (e) => {
    setWeight(e.target.value);
  };
  const handleNewSet = () => {
    if ((!Number(count) && count) || (!Number(weight) && weight)) {
      setWarning(true);
      return;
    }
    setWarning(false);
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
  useEffect(handleNewSet, [count, weight]);
  return (
    <>
      <Typography>{`Set ${index + 1}`}</Typography>
      <TextField label="Rep Count" onChange={handleCount} />
      <TextField label="lbs" onChange={handleWeight} defaultValue={prevWeight} />
      <div>{`WEIGHT: ${weight}`}</div>
      {warning && <Typography>Please enter a valid number</Typography>}
    </>
  );
}

export default NewSet;
