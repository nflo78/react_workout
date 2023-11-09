import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../AppContext';

function PrivateNestedRoute() {
  const { authenticated, single_split } = useContext(UserContext);
  const [auth] = authenticated;
  const [currentSplit] = single_split
  return (
    (auth && currentSplit) ? <Outlet /> : <Navigate to="/home" />
  );
}

export default PrivateNestedRoute;
