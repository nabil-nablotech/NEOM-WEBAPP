import React, {lazy} from "react";
import { Outlet, useRoutes } from 'react-router-dom';
import PrivateRoute from '../utils/routes/PrivateRoute';
import PublicRoute from '../utils/routes/PublicRoute';
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Search } from "../pages/Search";
import { Details } from "../pages/Details";
import { UserManagement } from "../pages/UserManagement";

import {PageNotFound} from '../components/PageNotFound';


export const Navigation = () => {
    let routes = useRoutes([
      { 
        path: '/', 
        element: <PrivateRoute path={'/'} component={Home} /> 
      },
      { 
        path: '/user-management', 
        element: <PrivateRoute path={'/user-management'} component={UserManagement} /> 
      },
      { 
        path: '/login', 
        element: <PublicRoute component={Login} /> ,
      },
      { 
        path: '/search', 
        element: <Search />,
        children: [
          { 
            path: '', 
            element: <Search />
          },
          { 
            path: ':id', 
            element: <Search />
          }
        ]
      },
      { 
        path: '/details', 
        element: <Details />,
        children: [
          { 
            path: '', 
            element: <Details />
          },
          { 
            path: ':id', 
            element: <Details />
          }
        ]
      },
      { 
        path: '*', 
        element: <PageNotFound />,
      },
  ]);
    return routes;
}
