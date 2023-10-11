import React, {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Splits from './components/Splits'
import Session from './components/Session'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

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
  }
  useEffect(() => {handleRefresh()}, [])

  return (
    <>
      <Header user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Login user={user} setUser={setUser}/>}/>
        <Route element={<PrivateRoute user={user}/>}>
          <Route path="/home" element={<Home user={user} setUser={setUser} allSplits={allSplits} setAllSplits={setAllSplits} allExercises={allExercises} setAllExercises={setAllExercises}/>}/>
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