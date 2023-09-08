import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Login ({user, setUser}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [hashPw, setHashPw] = useState('');
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    return axios.post('/login', {user: name, password: hashPw})
      .then((result) => {
        console.log('SUCCESFUL LOGIN: ', result)
        console.log('HERE COOKIE: ', document.cookie)
        setUser(name)
      })
      .then(() => navigate("/home"))
      .catch((err) => {console.log('LOGIN ERROR :', err)})
  }
  const signup = () => {
    navigate('/signup')
  }
  function handlePw(e) {
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
        <form onSubmit={handleLogin}>
          <TextField label="Username" onChange={handleName}></TextField>
          <TextField label="Password" type="password" onChange={handlePw}></TextField>
          {/* <input type='text' placeholder='User' onChange={handleName}></input>
          <input type='text' placeholder='Password' onChange={handlePw}></input> */}
          <Button type="submit" variant="contained">
            Login
          </Button>
        </form>
        <Button variant="contained" onClick={signup}>
          Sign up
        </Button>
        <div>
          {`HASHED PW ${hashPw}`}
        </div>
        <div>
          {`NAME :${name}`}
        </div>
        <div>
          {`USER : ${user}`}
        </div>
      </div>
    </>
  )
}

export default Login;