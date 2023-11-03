import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateNestedRoute({ user, currentSplit }) {
  return (
    (user && currentSplit) ? <Outlet /> : <Navigate to="/home" />
  );
}

export default PrivateNestedRoute;
