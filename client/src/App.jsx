import React, {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import NotFound from './components/NotFound'
export default function App () {
  const [user, setUser] = useState('')
  const navigate = useNavigate();

  const handleRefresh = async () => {
    if (document.cookie) {
      await setUser(document.cookie.substring('workoutv1='.length))
      navigate("/home")
    }
  }
  useEffect(() => {handleRefresh()}, [])

  return (
    <Routes>
      <Route path="/" element={<Login user={user} setUser={setUser}/>}/>
      <Route path="/home" element={<Home user={user} setUser={setUser}/>}/>
      <Route path="/signup" element ={<Signup/>}/>
      {/* <Route path="*" element={<Navigate to="/" replace/>}/> */}
    </Routes>
  )
}