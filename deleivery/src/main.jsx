// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";

import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   // <React.StrictMode>
//   <App />
//   // </React.StrictMode>
// );
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import { AuthProvider } from "./AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
