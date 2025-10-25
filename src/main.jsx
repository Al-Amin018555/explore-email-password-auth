import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Layout/Root";
import { Children } from "react";
import Home from "./components/Home/Home";
import './App.css'
import Login from "./components/Home/Login/Login";
import Register from "./components/Register/Register";
import SignUp from "./components/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'SignUp',
        Component: SignUp,
      }
    ],
  },

]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
