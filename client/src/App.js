import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserName from "./components/UserName";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Password from "./components/Password";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";

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
    element: <Profile></Profile>,
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
    element: <Password></Password>,
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
