import React from 'react';
import Session from './Session'
import { Link, useNavigate, redirect } from 'react-router-dom';

function Home ({ user }) {

  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user) {
      return navigate('/')
    }
  }, [user])
  return (
    <div>
      Home!
      {user === '' && 'yes'}
      <Session/>
    </div>
  )
}

export default Home;