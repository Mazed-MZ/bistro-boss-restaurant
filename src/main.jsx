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
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import AuthProvider from './components/providers/AuthProviders.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import MyCart from './components/Dashboard/MyCart/MyCart.jsx';
import AllUsers from './components/Dashboard/AllUsers/AllUsers.jsx';
import AdminRoute from './components/PrivateRoute/AdminRoute.jsx';
import AddItem from './components/Dashboard/AddItems/AddItem.jsx';
import ManageItem from './components/Dashboard/ManageItems/ManageItem.jsx';
import UpdateItem from './components/Dashboard/UpdateItem/UpdateItem.jsx';
import Payment from './components/Dashboard/Payment/Payment.jsx';
import PaymentHistory from './components/Dashboard/PaymentHistory/PaymentHistory.jsx';
import UserHome from './components/Dashboard/UserHome/UserHome.jsx';
import AdminHome from './components/Dashboard/AdminHome/AdminHome.jsx';
import Shop from './components/Shop/Shop.jsx';
import Review from './components/Dashboard/AddReview/Review.jsx';
import SelectedItem from './components/shared/selectedItem.jsx';

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
        path: "shop",
        element: <Shop></Shop>
      },
      {
        path: "desserts",
        element: <Desserts></Desserts>
      },
      {
        path: "/allMenu/:catagoryId",
        element: <SelectedItem></SelectedItem>,
        loader: ({ params }) => fetch(`https://bistro-boss-restaurant-server.onrender.com/allMenu/${params.catagoryId}`)
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
      //   loader: ({ params }) => fetch(`https://bistro-boss-restaurant-server.onrender.com/desserts/${params.dessertId}`)
      // }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "/dashboard/user-profile",
        element: <UserHome></UserHome>
      },
      {
        path: "/dashboard/admin-home",
        element: <AdminHome></AdminHome>
      },
      {
        path: "/dashboard/mycart",
        element: <MyCart></MyCart>
      },
      {
        path: "/dashboard/addItem",
        element: <AdminRoute><AddItem></AddItem></AdminRoute>
      },
      {
        path: "/dashboard/allusers",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: "/dashboard/manageItem",
        element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
      },
      {
        path: "/dashboard/updateItem/:id",
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({params}) => fetch(`https://bistro-boss-restaurant-server.onrender.com/allMenu/${params.id}`)
      },
      {
        path: "/dashboard/payment",
        element: <Payment></Payment>
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "/dashboard/add-review",
        element: <Review></Review>
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
