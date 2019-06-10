import React, { Component } from 'react';
import styles from "./style.css";
import { Avatar } from 'antd';
import LeftSide from '../../components/LeftSide';
import HeaderRight from '../../components/HeaderRight';
class index extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}
	static defaultProps={
		img:'https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png',
		nickname:'chenmanjie'
	}
	render() {
		const {img,nickname}=this.props;
		
		return (
			<div className={styles.wrap}>
				<header className={styles.header}>
					<div>
						<img src='logo.jpg' className={styles.logo} alt='logo'/>
					</div>
						<HeaderRight>
							<>
								<Avatar src={img} />
								{nickname}
							</>
						</HeaderRight>
				</header>
				<main className={styles.main}>
					<div className={styles.leftside}>
						<LeftSide  />
					</div>
					<div className={styles.content}></div>
				</main>
			</div>
		);
	}
}

export default index;