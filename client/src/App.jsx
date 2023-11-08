import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Route, Routes, useNavigate, useLocation,
} from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './AppContext';
import Test from './components/Test';
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
  // const [user, setUser] = useState('');
  // const [allSplits, setAllSplits] = useState([]);
  // const [allExercises, setAllExercises] = useState([]);
  // const [currentExercise, setCurrentExercise] = useState('');
  // const [currentSplit, setCurrentSplit] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { username, splits, exercises } = useContext(UserContext);
  const [user, setUser] = username;
  const [, setAllSplits] = splits;
  const [, setAllExercises] = exercises;
  const handleRefresh = async () => {
    if (document.cookie) {
      await setUser(document.cookie.substring('workoutv1='.length));
      navigate(location.pathname);
    }
  };
  const getInfo = () => axios.post('/fetchinfo', { user: user })
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
    })
    .catch((err) => { console.log('GET Splits RESULT ERR: ', err); navigate('/'); });

  useEffect(() => { getInfo(); }, [user]);
  useEffect(() => { handleRefresh(); }, []);

  return (
    // <UserContext.Provider value={contextObj}>
    //   <Header user={user} setUser={setUser} />
    //   <Routes>
    //     <Route path="/" element={<Login user={user} setUser={setUser} />} />
    //     <Route element={<PrivateRoute user={user} />}>
    //       <Route path="/home" element={<Home user={user} setUser={setUser} allSplits={allSplits} setAllSplits={setAllSplits} allExercises={allExercises} setAllExercises={setAllExercises} />} />
    //       <Route path="/edit" element={<EditInfo user={user} getInfo={getInfo} />} />
    //       <Route path="/session" element={<Session user={user} setUser={setUser} allSplits={allSplits} allExercises={allExercises} setCurrentExercise={setCurrentExercise} currentSplit={currentSplit} setCurrentSplit={setCurrentSplit} />} />
          // <Route element={<PrivateNestedRoute user={user} currentSplit={currentSplit} />}>
          //   <Route path="/exercise" element={<Exercise user={user} currentExercise={currentExercise} currentSplit={currentSplit} />} />
          // </Route>
    //     </Route>
    //     <Route path="/signup" element={<Signup setUser={setUser} />} />
    //   </Routes>
    // </UserContext.Provider>

    <>
      <Header />
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
    </>
    // <AppContextProvider>
    //   <Routes>
    //       <Route path="/" element={<Test/>} />
    //   </Routes>
    // </AppContextProvider>
  );
}

export default App;
