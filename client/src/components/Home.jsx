import React from 'react';
// import Session from './Session'
import { Link, useNavigate, redirect } from 'react-router-dom';
import Button from '@mui/material/Button';

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
    <div>
      {`Welcome ${user}!`}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Home;