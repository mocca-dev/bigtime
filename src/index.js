import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const sWPromise = serviceWorker.register();
ReactDOM.render(<App sWPromise={sWPromise} />, document.getElementById("root"));
