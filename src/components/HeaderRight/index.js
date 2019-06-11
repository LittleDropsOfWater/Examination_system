import { useState, useEffect } from "react";
import { Menu, Dropdown } from "antd";
import styles from "./style.css";

function HeaderRight({ menu, children }) {
  return (
    <Dropdown overlay={menu} className={styles.dropdown}>
      <div style={{ cursor: "pointer" }}>{children}</div>
    </Dropdown>
  );
}
HeaderRight.defaultProps = {
  menu: (
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
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          退出登陆
        </a>
      </Menu.Item>
    </Menu>
  )
};

export default HeaderRight;
