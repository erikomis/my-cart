import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/cart";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </NotificationProvider>
  </React.StrictMode>
);
