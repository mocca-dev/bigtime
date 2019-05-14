import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "react-service-worker";

const appSW = registerServiceWorker();
ReactDOM.render(
  <App appServiceWorker={appSW} />,
  document.getElementById("root")
);
