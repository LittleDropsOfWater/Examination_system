import {  useEffect } from "react";
import { connect } from 'dva';
import {Link} from 'dva/router'
import { Menu, Dropdown } from "antd";
import styles from "./style.css";

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
          href="http://www.alipay.com/"
        >
          个人中心
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          我的班级
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
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
    <Dropdown overlay={menu} className={styles.dropdown}>
      <div style={{ cursor: "pointer" }}>{children}</div>
    </Dropdown>
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
