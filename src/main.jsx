import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import FoodMenu from './components/Foods Menu/FoodMenu.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import { HelmetProvider } from 'react-helmet-async';
import Desserts from './components/Foods Menu/Desserts/Desserts.jsx';
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
        path: "desserts",
        element: <Desserts></Desserts>
      },
      {
        path: "/allmenu/:catagoryId",
        element: <SelectedItem></SelectedItem>,
        loader: ({ params }) => fetch(`http://localhost:5000/allmenu/${params.catagoryId}`)
      },
      // {
      //   path: "//:dessertId",
      //   element: <SelectedDessert></SelectedDessert>,
      //   loader: ({ params }) => fetch(`http://localhost:5000/desserts/${params.dessertId}`)
      // }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </HelmetProvider>,
)
