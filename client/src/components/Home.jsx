import React, { useState } from 'react';
import Calendar from './Calendar'
import { Link, useNavigate, redirect } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Typography, TextField } from '@mui/material';
import axios from 'axios';

function Home ({user, setUser}) {
  const [day, setDay] = useState(new Date().toDateString())
  const [newSplit, setNewSplit] = useState('')
  const navigate = useNavigate();
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
      return axios.post('/newsplit', {newsplit: newSplit, user: user})
        .then((result) => {console.log('NEW SPLIT SUBMITTED')})
        .catch((err) => {console.log('NEW SPLUT ERR: ', err)})
    }
  }
  // const testCheck = (e) => {
  //   e.preventDefault();
  //   return axios.get('/test')
  //     .then((result) => console.log('TEST RESULT: ', result.data))
  //     .catch((err) => console.log('ERROR TEST: ', err))
  // }
  return (
    <>
      <Box
      sx={{ flexGrow: 1 }}
      >
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
        {/* <div>
          <Button onClick={testCheck}>
            Test
          </Button>
        </div> */}
        <div>
          <TextField label="Split Name" onChange={handleNewSplit}>
          </TextField>
          <div>{`New split: ${newSplit}`}</div>
          <Button onClick={submitSplit}>SUBMIT SPLIT</Button>
        </div>
      </Box>
    </>
  )
}

export default Home;