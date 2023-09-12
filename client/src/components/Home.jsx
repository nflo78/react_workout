import React from 'react';
// import Session from './Session'
import { Link, useNavigate, redirect } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, IconButton, Typography } from '@mui/material';

function Home ({user, setUser}) {

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
  return (
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
  )
}

export default Home;