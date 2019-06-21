import React from "react";
import { Router, Route, Switch } from "dva/router";
import HomePage from "./views/Main";
import LoginPage from "./views/Login";
//引入国际化
import Intl from "@/components/Intl";
import {LocaleProvider}from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
function RouterConfig({ history }) {
  return (
    <Intl>
        <LocaleProvider locale={zh_CN} >

      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </LocaleProvider>
    </Intl>
  );
}

export default RouterConfig;
