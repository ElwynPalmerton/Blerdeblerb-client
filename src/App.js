import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./App.css";

// Pages
import Login from "./pages/LoginRegister/Login";
import Signup from "./pages/LoginRegister/Signup";
import Profile from "./pages/Users/Profile";
import FindBlerbers from "./pages/Users/FindBlerbers";
import Bio from "./pages/Bio/Bio";
import Following from "./pages/Users/Following";
import Feed from "./pages/Feed/Feed";

import PrivateRoute from "./pages/Nav/PrivateRoute";
import ComponentRoutes from "./ComponentRoutes.js";

// Styles
import CssBaseline from "@material-ui/core/CssBaseline";
import StylesContext from "./pages/StylesContext";

// State
import combinedReducers from "./reducers/combinedReducers";

// Authorization
import { AuthContext } from "./context/auth";
import setHeaders from "./utils/setHeaders";
import setTokens from "./utils/setTokens";
import { useContext } from "react";

console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("REACT_APP_ENV: " + process.env.REACT_APP_ENV);
//Set up Redux store
let store = createStore(combinedReducers);
store.subscribe(() => console.log("STORE subscription: ", store.getState()));

// console.log("STORE: ", store.getState());

function App(props) {
  setHeaders();
  return (
    <AuthContext.Provider
      value={{
        setTokens, //Helper function which puts the JWT in local storage.
      }}
    >
      <Provider store={store}>
        <StylesContext>
          <Router basename="/#!/index.html">
            <CssBaseline />
            <div>
              <ComponentRoutes />
            </div>
          </Router>
        </StylesContext>
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
