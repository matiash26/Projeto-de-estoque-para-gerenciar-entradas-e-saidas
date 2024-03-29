import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./Routes/Routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
