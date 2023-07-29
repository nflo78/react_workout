import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Login () {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate();

  const logUser = (e) => {
    setUser(e.target.value)
  }

  const checkUser = () => {
    if (user === 'me') {
      navigate('/home');
    }
  }
  return (
    <>
      <div className='loginPage'>
      <h2> Workout </h2>
        <input type='text' placeholder='User' onChange={logUser}></input>
        <input type='text' placeholder='Password'></input>
        <button onClick={checkUser}>
          Go!
        </button>
      </div>
    </>
  )
}

export default Login;