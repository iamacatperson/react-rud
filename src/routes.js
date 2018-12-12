import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Users from './modules/users/Users';

class Routes extends Component {
  render() {
    return (
      <Switch>  
        <Route exact component={Users} path="/users" />
      </Switch>
    );
  }
}

export default Routes;