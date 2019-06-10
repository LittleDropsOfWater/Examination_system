import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './views/IndexPage';
import HomePage from './views/HomePage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/home"  component={HomePage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
