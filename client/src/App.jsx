import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Route, Routes, useNavigate, useLocation,
} from 'react-router-dom';
import { Box } from '@mui/material';
import axios from 'axios';
import { UserContext } from './AppContext';
import Loader from './components/Loader';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import EditInfo from './components/EditInfo';
import Session from './components/Session';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Exercise from './components/Exercise';
import PrivateNestedRoute from './components/PrivateNestedRoute';

// export const UserContext = createContext();

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    username, id, authenticated, workouts, splits, exercises,
  } = useContext(UserContext);
  const [user, setUser] = username;
  const [, setUserId] = id;
  const [auth, setAuth] = authenticated;
  const [, setWorkoutCount] = workouts;
  const [, setAllSplits] = splits;
  const [, setAllExercises] = exercises;
  const handleRefresh = () => {
    // if (document.cookie) {
    //   await setUser(document.cookie.substring('workoutv1='.length));
    //   navigate(location.pathname);
    // }
    if (document.cookie) {
      const authToken = document.cookie.substring('workoutv1='.length);
      console.log('COOKIE JWT: ', authToken);
      return axios.post('/authenticateuser', { authToken: authToken })
        .then(async (result) => {
          console.log('AUTHENTICATED', result);
          await setAuth(true);
          console.log('AUTH STATUS: ', auth);
          await setUser(result.data.name);
          navigate(location.pathname);
        })
        .catch((err) => { setAuth(false); console.log('REFRESH AUTH ERROR: ', err); });
    }
    return setAuth(false);
  };
  const getInfo = () => (
    axios.post('/fetchinfo', { user: user })
      .then((result) => {
        console.log('GET INFO RESULTS: ', result.data);
        if (result.data.splits) {
          const userSplits = result.data.splits.map((split) => split.name);
          // console.log('USER SPLITS: ', userSplits)
          setAllSplits(userSplits);
        }
        if (result.data.exercises) {
          const userExercises = result.data.exercises.map((exercise) => exercise.name);
          setAllExercises(userExercises);
        }
        if (result.data.workouts) {
          setWorkoutCount(result.data.workouts[result.data.workouts.length - 1].id);
        }
        setUserId(result.data.userId);
      })
      .catch((err) => { console.log('GET Splits RESULT ERR: ', err); navigate('/'); })
  );
  // useEffect(() => {console.log('USER: ', user); if (user) {console.log('TRUE')}}, [user])
  useEffect(() => { if (user) { getInfo(); } }, [user]);
  useEffect(() => {handleRefresh()}, [])
  // useEffect(() => { console.log('HANDLING REFRESH'); handleRefresh(); }, []);

  return (
    (auth === null) ? <Loader />
      : (
        <>
          <Header />
          <Box>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<PrivateRoute user={user} />}>
                <Route path="/edit" element={<EditInfo getInfo={getInfo} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/session" element={<Session />} />
                <Route element={<PrivateNestedRoute />}>
                  <Route path="/exercise" element={<Exercise />} />
                </Route>
              </Route>
            </Routes>
          </Box>
        </>
      )
  );
}

export default App;
