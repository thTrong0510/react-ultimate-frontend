import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import BookPage from './pages/book.jsx';
import './styles/global.css'

//react-router-dom
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ToDoApp from './components/todo/components/TodoApp.jsx';
import ErrorPage from './pages/error.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import PrivateRoute from './pages/private.route.jsx';
import '../node_modules/nprogress/nprogress.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ToDoApp />
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/books",
        element: <PrivateRoute><BookPage /></PrivateRoute>,
      },
    ]
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // {/* <App /> */ }
  <AuthWrapper>
    < RouterProvider router={router} />
  </AuthWrapper>

  // </React.StrictMode>,
)
