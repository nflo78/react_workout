import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { Link, useNavigate, redirect } from 'react-router-dom';
/* eslint-disable */
import {
  Box, Button, AppBar, Toolbar, IconButton, Typography, TextField, Menu, MenuItem
} from '@mui/material';
/* eslint-enable */
import axios from 'axios';
import Calendar from './Calendar';
import Splits from './Splits';
import Session from './Session';
import NewExercise from './NewExercise';

function Home({ user, setUser, allSplits, setAllSplits, allExercises, setAllExercises }) {
  const [day, setDay] = useState(new Date().toDateString());
  const navigate = useNavigate();
  // const [allSplits, setAllSplits] = useState([]);
  // const [allExercises, setAllExercises] = useState([]);
  // React.useEffect(() => {
  //   if (!user) {
  //     return navigate('/')
  //   }
  // }, [user])

  const getInfo = () => axios.post('/getinfo', { user: user })
    .then((result) => {
      console.log('GET INFO RESULTS: ', result.data);
      if (result.data.splits) {
        const userSplits = result.data.splits.map((split) => split.name);
        // console.log('USER SPLITS: ', userSplits)
        setAllSplits(userSplits);
      }
      if (result.data.exercises) {
        const userExercises = result.data.exercises.map((exercise) => exercise.name);
        setAllExercises(userExercises);
      }
    })
    .catch((err) => { console.log('GET Splits RESULT ERR: ', err); });

  useEffect(() => { getInfo(); }, [user]);

  return (
    <>
      <Box>
        <div>{`The Date is ${new Date().toDateString()}`}</div>
        <div>{`Calendar date is ${new Date(day).toDateString()}`}</div>
        <Calendar setDay={setDay} />
      </Box>
      {/* <Box>
        <Splits user={user} />
      </Box> */}
      {/* <Box>
        <Session user={user} allSplits={allSplits} allExercises={allExercises} />
      </Box> */}
    </>
  );
}

export default Home;
