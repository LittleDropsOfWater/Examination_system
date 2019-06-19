import { connect } from "dva";
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
function RouterView({ locale, children }){
	return (
    <IntlProvider locale={locale} messages={localMap[locale]}>
      {children}
    </IntlProvider>
  );
}
const mapState = state => ({ locale: state.global.locale });
export default connect(mapState)(RouterView);