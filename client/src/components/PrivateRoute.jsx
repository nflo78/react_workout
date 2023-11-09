import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../AppContext';

function PrivateRoute() {
  const { authenticated } = useContext(UserContext);
  const [auth] = authenticated;
  return (
    auth ? <Outlet /> : <Navigate to="/" />
  );
}

export default PrivateRoute;
