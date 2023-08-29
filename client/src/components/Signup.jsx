import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup () {
  const [newUser, setNewUser] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [dupUser, setDupUser] = React.useState(false);
  const [diffPw, setDiffPw] = React.useState(false);
  const [userCreated, setUserCreated] = React.useState(false);
  const navigate = useNavigate();

  const handleNewUser = (e) => {
    setNewUser(e.target.value)
  }
  const handlePass1 = (e) => {
    let hash = 0;
    for (let i = 0, len = e.target.value.length; i < len; i++) {
        let chr = e.target.value.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    setPassword1(hash)
  }
  const handlePass2 = (e) => {
    let hash = 0;
    for (let i = 0, len = e.target.value.length; i < len; i++) {
        let chr = e.target.value.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    setPassword2(hash)
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setDiffPw(true);
      return;
    } else {
      setDiffPw(false);
    }

    if (newUser !== '') {
      return axios.post('/submitUser', {user: newUser, password: password1})
        .then((result) => {
          console.log('SUBMITTED: ', result)
          if (result.data.detail && result.data.detail === `Key (user_name)=(${newUser}) already exists.`) {
            setDupUser(true)
            console.log('DUPLICATE USER')
          } else {
            setDupUser(false);
            setUserCreated(true);
            setTimeout(() => {navigate('/')}, 1000);
          }
        })
        .catch((err) => {console.log('NEW USER ERR: ', err)})
    }
  }

  return (
    <form className='signup' onSubmit={(e) => {handleSubmit(e); }}>
      <div> New User </div>
      <input type='text' placeholder='username' onChange={handleNewUser}></input>
      <input type='text' placeholder='password' onChange={handlePass1}></input>
      <input type='text' placeholder='confirm password' onChange={handlePass2}></input>
      <button>Sign up!</button>
      <div>{userCreated && 'Account created successfully!'}</div>
      <div>{dupUser && `Username already exists`}</div>
      <div>{diffPw && 'Passwords must be the same'}</div>
      {/* <div>{`NEW USER${newUser}`}</div>
      <div>{`PASS1${password1}`}</div>
      <div>{`PASS2${password2}`}</div> */}
    </form>
  )
}

export default Signup;