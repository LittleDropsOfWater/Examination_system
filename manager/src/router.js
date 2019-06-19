import React from "react";
import { Router, Route, Switch } from "dva/router";
import HomePage from "./views/Main";
import LoginPage from "./views/Login";
import { connect } from "dva";
//引入国际化
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";
import zhCN from "@/lang/zh-CN.js";
import enUS from "@/lang/en-US.js";
const localMap = {
  en: enUS,
  zh: zhCN
};
addLocaleData([...en, ...zh]); //引入多环境的语言数据
const mapState = state => ({ locale: state.global.locale });
const RouterView = connect(mapState)(({ locale, children }) => {
  return (
    <IntlProvider locale={locale} messages={localMap[locale]}>
      {children}
    </IntlProvider>
  );
});

function RouterConfig({ history }) {
  return (
    <RouterView>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </RouterView>
  );
}

export default RouterConfig;
