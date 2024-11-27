import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import Upload_form from "./admin/Upload_form";

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
          fetch(
            `http://localhost:5000/allProducts/${params.id}`
          ),
      },
      {
        path: "/upload",
        element: <Upload_form />,
      },
    ],
  },
]);

export default router;
