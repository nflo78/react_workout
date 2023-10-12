import React, {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Splits from './components/Splits'
import Session from './components/Session'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import axios from 'axios'

export default function App () {
  const [user, setUser] = useState('')
  const [allSplits, setAllSplits] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const navigate = useNavigate();

  const handleRefresh = async () => {
    // if (document.cookie) {
    //   await setUser(document.cookie.substring('workoutv1='.length))
    //   navigate("/home")
    // }
  };
  const getInfo = () => axios.post('/getinfo', { user: user })
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
    .catch((err) => { console.log('GET Splits RESULT ERR: ', err); });

  useEffect(() => { getInfo(); }, [user]);
  useEffect(() => {handleRefresh()}, [])

  return (
    <>
      <Header user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Login user={user} setUser={setUser} />} />
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/home" element={<Home user={user} setUser={setUser} allSplits={allSplits} setAllSplits={setAllSplits} allExercises={allExercises} setAllExercises={setAllExercises} />} />
          <Route path="/splits" element={<Splits user={user} />} />
          <Route path="/session" element={<Session user={user} setUser={setUser} allSplits={allSplits} allExercises={allExercises} />} />
        </Route>
        {/* <Route path="/home" element={<Home user={user} setUser={setUser} allSplits={allSplits} setAllSplits={setAllSplits} allExercises={allExercises} setAllExercises={setAllExercises}/>}/> */}
        <Route path="/signup" element ={<Signup/>}/>
        {/* <Route path="/splits" element ={<Splits user={user}/>}/>
        <Route path="/session" element ={<Session user={user} setUser={setUser} allSplits={allSplits} allExercises={allExercises}/>}/> */}
        {/* <Route path="*" element={<Navigate to="/" replace/>}/> */}
      </Routes>
    </>
  )
}