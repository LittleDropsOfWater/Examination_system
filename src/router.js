import React from 'react';
import { Router, Route, Switch ,Redirect} from 'dva/router';
import IndexPage from './views/IndexPage';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/index" exact component={IndexPage} />
        <Route path="/home"  component={HomePage} />
        <Route path="/login"  component={LoginPage} />
        <Redirect from='/'  to='/login' />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
