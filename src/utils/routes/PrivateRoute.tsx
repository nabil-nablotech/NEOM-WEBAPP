/* eslint-disable react/jsx-props-no-spreading */
import React, {FC} from 'react';
import { Navigate } from 'react-router-dom';
import UserManagement from '../../pages/UserManagement/components/UserManagement';
import { getToken, removeSession } from '../storage/storage';
import LandingPage from './../../pages/LandingPage/components/LandingPage/index';
// import { UserManagement } from './../../pages/UserManagement/UserManagement';

type RouteProps = {component: FC, path: string }
// handle the private routes
function PrivateRoute({ component: Component, path, ...rest }: RouteProps) {
  // if (getToken()) {
  if (true) {
    if(path === '/user-management') {
      return <UserManagement />
    } else 
    return <LandingPage />;
  }
  removeSession();
  return <Navigate to="/login" />;
}

export default PrivateRoute;
