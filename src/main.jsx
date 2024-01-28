import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Home from './components/Home/Home.jsx';
import FoodMenu from './components/Foods Menu/FoodMenu.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import { HelmetProvider } from 'react-helmet-async';
import Desserts from './components/Foods Menu/Desserts/Desserts.jsx';
import SelectedItem from './components/shared/selectedItem.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import AuthProvider from './components/providers/AuthProviders.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import MyCart from './components/Dashboard/MyCart/MyCart.jsx';
import Profile from './components/Dashboard/Profile/Profile.jsx';
import AllUsers from './components/Dashboard/AllUsers/AllUsers.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "*",
        element: <NotFound></NotFound>
      },
      {
        path: "foodmenu",
        element: <FoodMenu></FoodMenu>
      },
      {
        path: "desserts",
        element: <Desserts></Desserts>
      },
      {
        path: "/allmenu/:catagoryId",
        element: <SelectedItem></SelectedItem>,
        loader: ({ params }) => fetch(`http://localhost:5000/allmenu/${params.catagoryId}`)
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      }
      // {
      //   path: "//:dessertId",
      //   element: <SelectedDessert></SelectedDessert>,
      //   loader: ({ params }) => fetch(`http://localhost:5000/desserts/${params.dessertId}`)
      // }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <Profile></Profile>
      },
      {
        path: "/dashboard/mycart",
        element: <MyCart></MyCart>
      },
      {
        path: "/dashboard/allusers",
        element: <AllUsers></AllUsers>
      }
    ]
  }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
