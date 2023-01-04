import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./App.css";

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

//Set up Redux store
let store = createStore(combinedReducers);
store.subscribe(() => console.log("STORE subscription: ", store.getState()));

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
