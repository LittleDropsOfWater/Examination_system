import React from "react";
import { Router, Route, Switch } from "dva/router";
import HomePage from "./views/Main";
import LoginPage from "./views/Login";
//引入国际化
import Intl from "@/components/Intl";

function RouterConfig({ history }) {
  return (
    <Intl>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </Intl>
  );
}

export default RouterConfig;
