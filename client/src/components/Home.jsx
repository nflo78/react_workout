import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import Splits from './Splits';
import Session from './Session';
import { Link, useNavigate, redirect } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Typography, TextField } from '@mui/material';
import axios from 'axios';

function Home ( {user, setUser} ) {
  const [day, setDay] = useState(new Date().toDateString());
  const navigate = useNavigate();
  const [allSplits, setAllSplits] = useState([]);

  // React.useEffect(() => {
  //   if (!user) {
  //     return navigate('/')
  //   }
  // }, [user])
  const handleLogout = async (e) => {
    e.preventDefault();
    document.cookie = "workoutv1= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    await setUser('');
    navigate('/');
  }

  const handleNewSplit = (e) => {
    setNewSplit(e.target.value)
  }

  const submitSplit = (e) => {
    e.preventDefault();
    if (newSplit !== '') {
      return axios.post('/newsplit', { newsplit: newSplit, user: user })
        .then((result) => {console.log('NEW SPLIT SUBMITTED')})
        .catch((err) => {console.log('NEW SPLUT ERR: ', err)})
    }
  }

  const getInfo = () => {
    return axios.post('/getInfo', { user: user })
      .then((result) => {setAllSplits(result.data)})
      .catch((err) => {console.log('GET INFO RESULT ERR: ', err)})
  }

  useEffect(() => {getInfo()}, [user])

  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1, mr: 2}}>
              {`Welcome ${user}`}
            </Typography>
            <Button sx={{ right: "0%" }} color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <div>{`The Date is ${new Date().toDateString()}`}</div>
        <div>{`Calendar date is ${new Date(day).toDateString()}`}</div>
        <Calendar setDay={setDay}/>
      </Box>
      <Box>
        <Splits user={user}/>
      </Box>
      <Box>
        <Session user={user} allSplits={allSplits}/>
      </Box>
    </>
  )
}

export default Home;