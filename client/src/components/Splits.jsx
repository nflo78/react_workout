import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

function Splits ({ user }) {

  const [newSplit, setNewSplit] = useState('')

  const handleNewSplit = (e) => {
    setNewSplit(e.target.value)
  }

  const submitSplit = (e) => {
    e.preventDefault();
    if (newSplit !== '') {
      return axios.post('/newsplit', {newsplit: newSplit, user: user})
        .then((result) => {console.log('NEW SPLIT SUBMITTED')})
        .catch((err) => {console.log('NEW SPLUT ERR: ', err)})
    }
  }

  return (
    <div>
      <TextField label="Split Name" onChange={handleNewSplit}>
      </TextField>
      <div>{`New split: ${newSplit}`}</div>
      <Button onClick={submitSplit}>SUBMIT SPLIT</Button>
    </div>
  )
}

export default Splits;