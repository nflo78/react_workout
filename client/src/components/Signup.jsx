import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { UserContext } from '../AppContext';

function Signup() {
  const [newUser, setNewUser] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [dupUser, setDupUser] = React.useState(false);
  const [diffPw, setDiffPw] = React.useState(false);
  const [userCreated, setUserCreated] = React.useState(false);
  const { username, authenticated } = useContext(UserContext);
  const [, setUser] = username;
  const [, setAuth] = authenticated;
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    return axios.post('/login', { user: newUser, password: password1 })
      .then(async (result) => {
        console.log('SUCCESFUL LOGIN: ', result);
        // console.log('HERE COOKIE: ', document.cookie);
        await setUser(newUser);
        await setAuth(true);
        navigate('/home');
      })
      .catch((err) => { console.log('LOGIN ERROR :', err); });
  };

  const handleNewUser = (e) => {
    setNewUser(e.target.value);
  };
  const handlePass1 = (e) => {
    let hash = 0;
    /* eslint-disable */
    for (let i = 0, len = e.target.value.length; i < len; i++) {
        let chr = e.target.value.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    /* eslint-enable */
    setPassword1(hash);
  };

  const handlePass2 = (e) => {
    let hash = 0;
    /* eslint-disable */
    for (let i = 0, len = e.target.value.length; i < len; i++) {
        let chr = e.target.value.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    /* eslint-enable */
    setPassword2(hash);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setDiffPw(true);
      return;
    }
    setDiffPw(false);

    if (newUser !== '') {
      // eslint-disable-next-line consistent-return
      return axios.post('/submitUser', { user: newUser, password: password1 })
        .then(async (result) => {
          console.log('SUBMITTED: ', result);
          setDupUser(false);
          setUserCreated(true);
          await setUser(newUser);
          // setTimeout(() => { navigate('/home'); }, 2000);
        })
        .then(() => handleLogin(e))
        .catch((err) => {
          console.log('NEW USER ERR: ', err);
          if (err.response.data.indexOf('duplicate key value violates unique constraint') !== -1) {
            setDupUser(true);
          }
        });
    }
  };

  return (
    <form className="signup" onSubmit={(e) => { handleSubmit(e); }}>
      <div> New User </div>
      <TextField label="Username" onChange={handleNewUser} />
      <TextField label="Password" type="password" onChange={handlePass1} />
      <TextField label="Confirm Password" type="password" onChange={handlePass2} />
      <Button type="submit" variant="contained">Sign Up!</Button>
      <div>{userCreated && 'Account created successfully!'}</div>
      <div>{dupUser && 'Username already exists'}</div>
      <div>{diffPw && 'Passwords must be the same'}</div>
    </form>
  );
}

export default Signup;
