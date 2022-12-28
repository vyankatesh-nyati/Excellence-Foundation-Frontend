import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { AdminContextProvider } from "./store/admin-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AdminContextProvider>
      <AuthContextProvider>
        <BrowserRouter basename="/training">
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </AdminContextProvider>
  </React.StrictMode>
);
