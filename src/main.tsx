import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/cart";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
