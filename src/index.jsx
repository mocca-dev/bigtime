import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import appServiceWorker from "./appServiceWorker";

ReactDOM.render(
  <App appServiceWorker={appServiceWorker} />,
  document.getElementById("root")
);
