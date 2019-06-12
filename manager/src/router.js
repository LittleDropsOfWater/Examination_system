import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './views/login';
import Main from "./views/main"


function RouterConfig({ history }){
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/"  component={Main} />
        
      </Switch>
    </Router>
  );
}

export default RouterConfig;
