import React from "react";
import Login from "./pages/LoginRegister/Login";
import Signup from "./pages/LoginRegister/Signup";
import Profile from "./pages/Users/Profile";
import FindBlerbers from "./pages/Users/FindBlerbers";
import Bio from "./pages/Bio/Bio";
import Following from "./pages/Users/Following";
import Feed from "./pages/Feed/Feed";
import {
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
  useLocation,
  Route,
} from "react-router-dom";

import PrivateRoute from "./pages/Nav/PrivateRoute";

export default function ComponentRoutes() {
  // return <h1>Hello ComponentRoutes</h1>;

  const match = useRouteMatch();
  const location = useLocation();
  console.log("MATCH: ", match);
  console.log("LOCATION: ", location);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/findBlerbers" component={FindBlerbers} />
      <PrivateRoute path="/bio" component={Bio} />
      <PrivateRoute path="/following" component={Following} />
      <PrivateRoute path="/" component={Feed} />
    </Switch>
  );
}
