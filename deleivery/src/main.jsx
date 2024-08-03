import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import { AuthProvider } from "./AuthContext";
//'---------------------------------------------------------------------------
//' Link Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
//' Link Jequery
import "jquery/dist/jquery.min.js";
//' Link fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";
//' Link Css
import "./index.css";
//'---------------------------------------------------------------------------

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
