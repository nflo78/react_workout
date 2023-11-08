import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../AppContext';

function PrivateNestedRoute() {
  const { username, single_split } = useContext(UserContext);
  const [user] = username;
  const [currentSplit] = single_split
  return (
    (user && currentSplit) ? <Outlet /> : <Navigate to="/home" />
  );
}

export default PrivateNestedRoute;
