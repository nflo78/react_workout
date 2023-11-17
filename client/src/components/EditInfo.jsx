import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, TextField, Typography, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import axios from 'axios';
import { UserContext } from '../AppContext';

function EditInfo({ getInfo }) {
  const [newSplit, setNewSplit] = useState('');
  const [newExercise, setNewExercise] = useState('');
  const [relations, setRelations] = useState([]);
  const [warningSplit, setWarningSplit] = useState(false);
  const [warningExercise, setWarningExercise] = useState(false);
  const { username, id, splits, exercises } = useContext(UserContext);
  const [user] = username;
  const [userId] = id;
  const [allSplits] = splits;
  const [allExercises] = exercises;
  const blackBorderSX = { border: '1px solid black' };
  const handleNewSplit = (e) => {
    setNewSplit(e.target.value);
  };
  const submitSplit = (e) => {
    e.preventDefault();
    if (!newSplit) {
      return setWarningSplit(true);
    }
    return axios.post('/newsplit', { newsplit: newSplit, userId: userId })
      .then(() => { console.log('NEW SPLIT SUBMITTED'); })
      .then(() => getInfo())
      .catch((err) => { console.log('NEW SPLUT ERR: ', err); });
  };

  const handleNewExercise = (e) => {
    setNewExercise(e.target.value);
  };

  const submitExercise = (e) => {
    e.preventDefault();
    if (!newExercise) {
      return setWarningExercise(true);
    }
    return axios.post('/newexercise', { exercise: newExercise, userId: userId, relation: relations })
      .then(() => { console.log('NEW EXERCISE SUBMITTED'); setWarningExercise(false); })
      .then(() => { getInfo(); })
      .catch((err) => {
        console.log('NEW EXERCISE ERR: ', err);
      });
  };

  const handleCheckbox = (e, split) => {
    if (e.target.checked) {
      setRelations([...relations, split]);
    } else {
      const updatedRelation = relations.filter((relation) => relation !== split);
      setRelations(updatedRelation);
    }
  };

  useEffect(
    () => {
      // console.log('CONTEXT: ', AppContext);
      console.log('RELATIONS: ', relations);
    },
    [relations],
  );
  return (
    <>
      <Box sx={blackBorderSX}>
        <TextField label="Split Name" onChange={handleNewSplit} />
        <div>{`New split: ${newSplit}`}</div>
        <Button onClick={submitSplit}>SUBMIT SPLIT</Button>
        {warningSplit && (
          <Typography>
            Please a split name
          </Typography>
        )}
      </Box>
      <br></br>
      <Box
        sx={blackBorderSX}
      >
        <FormGroup>
          <TextField label="Exercise Name" onChange={handleNewExercise} />
          <Box>
            <Typography variant="h7">Split Relation</Typography>
            {allSplits.map((split) => (
              <FormControlLabel
                key={split}
                label={split}
                control={(
                  <Checkbox
                    checked={relations.includes(split)}
                    onChange={(e) => handleCheckbox(e, split)}
                  />
                )}
              />
            ))}
          </Box>
        </FormGroup>
        <div>{`New exercise: ${newExercise}`}</div>
        <Button onClick={submitExercise}>SUBMIT EXERCISE</Button>
        {warningExercise && (
          <Typography>
            Please an exercise name
          </Typography>
        )}
      </Box>
      <br></br>
      <Box sx={blackBorderSX}>
        <Typography variant="h5">Your Splits</Typography>
        {allSplits.map((split) => <Box key={split}>{split}</Box>)}
      </Box>
      <Box sx={blackBorderSX}>
        <Typography variant="h5">Your Exercises</Typography>
        {allExercises.map((exercise) => <Box key={exercise}>{exercise}</Box>)}
      </Box>
    </>
  );
}

export default EditInfo;
