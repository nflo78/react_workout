import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../AppContext';

function PrivateRoute() {
  const { username } = useContext(UserContext);
  const [user] = username;
  return (
    user ? <Outlet /> : <Navigate to="/" />
  );
}

export default PrivateRoute;
