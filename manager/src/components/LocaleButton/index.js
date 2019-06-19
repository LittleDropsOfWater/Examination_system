import { useState } from "react";
import { connect } from "dva";
import { Select } from "antd";

const { Option } = Select;
function LocaleButton({ locale, changeLocale }) {
  let [SelectState, ChangeSelectState] = useState(false);
  return (
    <div onMouseLeave={() => ChangeSelectState(false)}>
      <Select
        defaultValue={locale}
        onChange={changeLocale}
        open={SelectState}
        onMouseEnter={() => ChangeSelectState(true)}
        onSelect={e => ChangeSelectState(false)}
      >
        <Option value="zh">中文</Option>
        <Option value="en">English</Option>
      </Select>
    </div>
  );
}

const mapStateToProps = state => ({ locale: state.global.locale });

const mapDisaptchToProps = dispatch => ({
  changeLocale(payload) {
    dispatch({
      type: "global/changeLocale",
      payload
    });
  }
});
export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(LocaleButton);
