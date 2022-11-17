import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import { useLocation } from "react-router-dom";

const history = createBrowserHistory();

const location = useLocation;

let app = document.getElementById("root");
if (app) {
  // 1. Set up the browser history with the updated location
  // (minus the # sign)
  let path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
  if (path) {
    history.replace(path);
  }

  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
