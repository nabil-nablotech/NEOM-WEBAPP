import React from "react";
import { Outlet, useRoutes } from 'react-router-dom';
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Search } from "../pages/Search";
import { Details } from "../pages/Details";


export const Navigation = () => {
    let routes = useRoutes([
      { 
        path: '/', 
        element: <Home /> 
      },
      { 
        path: '/login', 
        element: <Login />,
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
  ]);
    return routes;
}
