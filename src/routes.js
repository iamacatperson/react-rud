import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import app from "./base";

import Users from "./modules/users/Users";
import Login from "./modules/login/Login";
import Register from "./modules/register/Register";
import NotFound from "./modules/notfound/NotFound";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact component={Users} path="/users" />
        <Route exact component={Login} path="/login" />
        <Route exact component={Register} path="/register" />
        <Route exact component={NotFound} path="*" />
      </Switch>
    );
  }
}

export default Routes;