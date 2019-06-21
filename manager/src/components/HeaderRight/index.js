import {  useEffect } from "react";
import { connect } from 'dva';
import {Link} from 'dva/router'
import { Menu, Dropdown } from "antd";
import styles from "./style.scss";
import LocaleButton from '@/components/LocaleButton'
function HeaderRight({  children,logOut }) {
  useEffect(
    ()=>{

    },[])
  const menu=(
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="javascript(0)"
        >
          个人中心
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="javascript(0)"
        >
          我的班级
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="javascript(0)"
        >
          设置
        </a>
      </Menu.Item>
      <Menu.Item>
        <Link
          rel="noopener noreferrer"
          onClick={logOut}
          to="/login"
        >
          退出登陆
        </Link>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className={styles.headerRight}>
    <Dropdown overlay={menu} className={styles.dropdown}>
      <div style={{ cursor: "pointer" }}>{children}
      </div>
    </Dropdown>
    <LocaleButton></LocaleButton>
    
    </div>
  );
}
HeaderRight.defaultProps = {
  
};

const mapStateToProps = state=>state

const mapDisaptchToProps = dispatch=>({
    logOut(){
      dispatch({
        type: 'user/logOut',
      })
    }
  
})
export default connect(mapStateToProps,mapDisaptchToProps)(HeaderRight);
