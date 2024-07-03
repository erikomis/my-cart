import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { ProductDetail } from "./pages/productDetail/ProductDetail";
import NotFound from "./components/layout/NotFoud/NotFound";

export const router = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/produto-detail/:id",
    element: <ProductDetail />,
  },
]);
