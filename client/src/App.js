import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserName from "./components/UserName";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Password from "./components/Password";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";


/**auth middleware */
import {AuthorizeUser, ProtectRoute} from './middleware/auth'

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserName></UserName>
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/profile",
    element: <AuthorizeUser><Profile /></AuthorizeUser>,
  },
  {
    path: "/reset",
    element: <Reset></Reset>,
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>,
  },
  {
    path: "/password",
    element: <ProtectRoute><Password /></ProtectRoute>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  }
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
