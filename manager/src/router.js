import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './views/login';
import Home from "./views/home"


function RouterConfig({ history }){
  return (
    <Router history={history}>
      <Switch>
        <Route path="/home"  component={Home} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
