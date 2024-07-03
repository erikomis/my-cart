import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { ProductDetail } from "./pages/productDetail/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/produto-detail/:id",
    element: <ProductDetail />,
  },
]);
