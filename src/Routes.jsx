import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import OrderForm from "./Pages/OrderForm/OderForm";
import Cart from "./Pages/Cart";
import Dashboard from "./admin/Dashboard";
import OrderLogs from "./admin/OrderLogs";
import TrackOrders from "./admin/TrackOrders";
import AdminHome from "./admin/AdminHome";
import OrderDetails from "./admin/OrderDetails";
import Products from "./admin/Products";
import Login from "./admin/Login";
import PrivateRoute from "./Private/PrivateRoute";
import UploadProduct from "./admin/UploadProduct";
import EditProduct from "./admin/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <Details />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allProducts/${params.id}`),
      },
      {
        path: "/order",
        element: <OrderForm />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/lunastore_admin",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/adminHome",
        element: <AdminHome />,
      },
      {
        path: "/dashboard/trackOrders",
        element: <TrackOrders />,
      },
      {
        path: "/dashboard/trackOrders/details/:id",
        element: <OrderDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/order/${params.id}`),
      },
      {
        path: "/dashboard/orderLogs",
        element: <OrderLogs />,
      },
      {
        path: "/dashboard/products",
        element: <Products />,
      },
      {
        path: "/dashboard/UploadProduct",
        element: <UploadProduct />,
      },
      {
        path: "/dashboard/editProduct/:id",
        element: <EditProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allProducts/${params.id}`),
      },
    ],
  },
]);

export default router;
