import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Login () {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hashPw, setHashPw] = React.useState('');
  const navigate = useNavigate();

  const logUser = (e) => {
    setUser(e.target.value)
  }

  const checkUser = () => {
    if (user === 'me') {
      navigate('/home');
    }
  }
  const signup = () => {
    navigate('/signup')
  }
  function hashCode(e) {
    let hash = 0;
    for (let i = 0, len = e.target.value.length; i < len; i++) {
        let chr = e.target.value.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    setHashPw(hash)
    // return hash;
  }

  return (
    <>
      <div className='loginPage'>
      <h2> Workout </h2>
        <input type='text' placeholder='User' onChange={logUser}></input>
        <input type='text' placeholder='Password' onChange={hashCode}></input>
        <button onClick={checkUser}>
          Go!
        </button>
        <button onClick={signup}>
          Sign up
        </button>
        <div>
          {`HASHED PW ${hashPw}`}
        </div>
        <div>
          {typeof hashPw}
        </div>
      </div>
    </>
  )
}

export default Login;