import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import NotFound from './components/NotFound'
export default function App () {
  const [user, setUser] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      return navigate('/')
    }
  }, [user])

  return (
    <Routes>
      <Route path="/" element={<Login user={user} setUser={setUser}/>}/>
      <Route path="/home" element={<Home user={user} setUser={setUser}/>}/>
      <Route path="/signup" element ={<Signup/>}/>
      {/* <Route path="*" element={<Navigate to="/" replace/>}/> */}
    </Routes>
  )
}