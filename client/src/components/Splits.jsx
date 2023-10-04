import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

function Splits({ user }) {
  const [newSplit, setNewSplit] = useState('');
  const [newExercise, setNewExercise] = useState('');

  const handleNewSplit = (e) => {
    setNewSplit(e.target.value);
  };
  const handleNewExercise = (e) => {
    setNewExercise(e.target.value);
  };
  // eslint-disable-next-line consistent-return
  const submitSplit = (e) => {
    e.preventDefault();
    if (newSplit !== '') {
      return axios.post('/newsplit', { newsplit: newSplit, user: user })
        .then(() => { console.log('NEW SPLIT SUBMITTED'); })
        .catch((err) => { console.log('NEW SPLUT ERR: ', err); });
    }
  };
  const submitExercise = (e) => {
    e.preventDefault();
    if (newExercise !== '') {
      return axios.post('/newexercise', { exercise: newExercise, user: user })
        .then(() => { console.log('NEW EXERCISE SUBMITTED'); })
        .catch((err) => { console.log('NEW EXERCISE ERR: ', err); });
    }
  };

  return (
    <div>
      <TextField label="Split Name" onChange={handleNewSplit} />
      <div>{`New split: ${newSplit}`}</div>
      <Button onClick={submitSplit}>SUBMIT SPLIT</Button>
      <TextField label="Exercise Name" onChange={handleNewExercise} />
      <div>{`New exercise: ${newExercise}`}</div>
      <Button onClick={submitExercise}>SUBMIT EXERCISE</Button>
    </div>
  );
}

export default Splits;
