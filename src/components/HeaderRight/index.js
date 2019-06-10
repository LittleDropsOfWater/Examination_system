import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import styles from "./style.css";

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
				个人中心
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        我的班级
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        设置
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        退出登陆
      </a>
    </Menu.Item>
  </Menu>
);

class HeaderRight extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}
	render() {
		return (
			<Dropdown overlay={menu} className={styles.dropdown}>
				 <div style={{cursor: 'pointer'}}>
      {this.props.children} 
				 </div>
			
		  </Dropdown>
		);
	}
}

export default HeaderRight;