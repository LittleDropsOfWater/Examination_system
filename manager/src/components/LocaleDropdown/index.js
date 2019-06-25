import { connect } from "dva";
import { Menu, Dropdown, Icon,Button } from "antd";


let msg={
  zh:'中文',
  en:'English'
}
function LocaleDropdown({ locale, changeLocale }) {
  const menu= 
    <Menu>
      <Menu.Item onClick={()=>changeLocale('zh')}>
        中文
      </Menu.Item>
      <Menu.Item  onClick={()=>changeLocale('en')}>
         English
      </Menu.Item>
    </Menu>
  ;
  console.log('locale',locale)
  return (
    <Dropdown overlay={menu}>
      <Button>
     {msg[locale]}<Icon type="down" />
     </Button>
  </Dropdown>
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
)(LocaleDropdown);
