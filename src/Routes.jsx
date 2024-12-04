import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import OrderForm from "./Pages/OrderForm/OderForm";
import Cart from "./Pages/Cart";

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
    ],
  },
]);

export default router;
