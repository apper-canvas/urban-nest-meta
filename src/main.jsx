import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/store/index.js";
import App from "@/App";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <Provider store={store}>
      <ToastContainer hideProgressBar={false} closeOnClick pauseOnHover />
      <App />
    </Provider>
  </React.Fragment>
);