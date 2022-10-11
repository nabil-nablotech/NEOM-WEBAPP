import { Outlet, useRoutes } from "react-router-dom";
import PrivateRoute from "../utils/routes/PrivateRoute";
import PublicRoute from "../utils/routes/PublicRoute";
import AdminRoute from "../utils/routes/AdminRoute";
import { Login } from "../pages/Login";
import { Search } from "../pages/Search";
import { Details } from "../pages/Details";
import { PageNotFound } from "../components/PageNotFound";
import UserManagement from "../pages/UserManagement";
import LandingPage from "../pages/LandingPage";
import { SetPassword } from "../pages/SetPassword";
import useAuth from "../hooks/useAuth";
import SearchResults from "../pages/SearchResults";

export const Navigation = () => {
  const {} = useAuth();
  let routes = useRoutes([
    {
      path: "/",
      element: <PrivateRoute path={"/"} component={LandingPage} />,
      // element: <PublicRoute component={LandingPage} />
    },
    {
      path: "/user-management",
      element: (
        <AdminRoute path={"/user-management"} component={UserManagement} />
      ),
      // element: <PublicRoute component={UserManagement} />
    },
    {
      path: "/login",
      element: <PublicRoute component={Login} />,
    },
    {
      path: "/set-password/:new",
      element: <PublicRoute component={SetPassword} />,
    },
    {
      path: "/search-results",
      element: <AdminRoute path={"/search-results"} component={SearchResults} />,
      // element: <PublicRoute component={SearchResults} />,
    },
    {
      path: "/search-results/:tabName",
      element: <AdminRoute path={"/search-results/:tabName"} component={SearchResults} />,
      // element: <PublicRoute component={SearchResults} />,
    },
    {
      path: "/search",
      element: <Search />,
      children: [
        {
          path: "",
          element: <Search />,
        },
        {
          path: ":id",
          element: <Search />,
        },
      ],
    },
    {
      path: "/details",
      element: <Details />,
      children: [
        {
          path: "",
          element: <Details />,
        },
        {
          path: ":id",
          element: <Details />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return routes;
};
