import React from 'react';
// import Session from './Session'
import { Link, useNavigate, redirect } from 'react-router-dom';

function Home ({user, setUser}) {

  // const navigate = useNavigate();
  // React.useEffect(() => {
  //   if (!user) {
  //     return navigate('/')
  //   }
  // }, [user])
  return (
    <div>
      {`Welcome ${user}!`}
    </div>
  )
}

export default Home;