import React, { Component } from 'react';
import styles from "./style.scss";
import { Menu, Icon, Button } from 'antd';
const { SubMenu }  = Menu;
class LeftSide extends Component {
	constructor(props) {
		super(props);
		this.state = { 
		
		 };
	}

	static defaultProps={
		data:[
			{
				id:'sub1',
				title:'试题管理',
				icon:'mail',
				list:[
					{
						title:'添加试题',
					},{
						title:'试题分类',
					},{
						title:'查看试题'
					}
				]
			},
			{
				id:'sub2',
				title:'用户管理',
				icon:'user',
				list:[
					{
						title:'添加用户',
					},{
						title:'用户展示',
					}
				]
			},
			{
				id:'sub3',
				title:'考试管理',
				icon:'schedule',
				list:[
					{
						title:'添加考试',
					},{
						title:'试卷列表',
					}
				]
			},
			{
				id:'sub4',
				title:'班级管理',
				icon:'project',
				list:[
					{
						title:'班级管理',
					},{
						title:'教室管理',
					},{
						title:'学生管理',
					}
				]
			},
			{
				id:'sub5',
				title:'阅卷管理',
				icon:'project',
				list:[
					{
						title:'待批班级',
					}
				]
			}
		]
	}
	render() {
		const {data}=this.props;
		return (
		<div >
        
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
					theme="dark"
					className={styles.menu}
        >
					{
						data.map(({id,title,icon,list})=>(
							<SubMenu
							key={id}
							title={
								<span>
									<Icon type={icon} />
									<span>{title}</span>
								</span>
							}
						>
							{
								list.map((sitem,index)=>(
							<Menu.Item key={`${title}-${sitem.title}`}
							
							>{sitem.title}</Menu.Item>

								))
							}
						</SubMenu>
						))
					}
       
        </Menu>
      </div>
		);
	}
}

export default LeftSide;
const data=[
	{
			"view_authority_id": "r50r9t-1p1kbm",
			"view_authority_text": "登录",
			"view_id": "login"
	},
	{
			"view_authority_id": "8olznh-943zt",
			"view_authority_text": "主界面",
			"view_id": "main"
	},
	{
			"view_authority_id": "4pvvb3-h5kzg",
			"view_authority_text": "添加试题",
			"view_id": "main-addQuestions"
	},
	{
			"view_authority_id": "vnpojq-tisgu",
			"view_authority_text": "试题分类",
			"view_id": "main-questionsType"
	},
	{
			"view_authority_id": "xpz8cf-xoyd7n",
			"view_authority_text": "查看试题",
			"view_id": "main-watchQuestions"
	},
	{
			"view_authority_id": "qcrhh-k0tvh",
			"view_authority_text": "添加用户",
			"view_id": "main-addUser"
	},
	{
			"view_authority_id": "o4xsrn-5heg27",
			"view_authority_text": "用户展示",
			"view_id": "main-showUser"
	},
	{
			"view_authority_id": "1orauc-piu6gm",
			"view_authority_text": "添加考试",
			"view_id": "main-addExam"
	},
	{
			"view_authority_id": "43t70e-pk8ylk",
			"view_authority_text": "添加菜单",
			"view_id": "main-menu"
	},
	{
			"view_authority_id": "0a1llo-a1vt2",
			"view_authority_text": "编辑试题",
			"view_id": "main-editQuestions"
	},
	{
			"view_authority_id": "n083ob-u54cop",
			"view_authority_text": "试题详情",
			"view_id": "main-questionsDetail"
	},
	{
			"view_authority_id": "2iilq2-n3c8qi",
			"view_authority_text": "班级管理",
			"view_id": "main-grade"
	},
	{
			"view_authority_id": "xpnrf-levvc",
			"view_authority_text": "学生管理",
			"view_id": "main-student"
	},
	{
			"view_authority_id": "dow3c8-tb0lid",
			"view_authority_text": "教室管理",
			"view_id": "main-room"
	},
	{
			"view_authority_id": "04d1m-605j25",
			"view_authority_text": "试卷列表",
			"view_id": "main-examList"
	},
	{
			"view_authority_id": "fmdrhm-xfnmxk",
			"view_authority_text": "创建试卷",
			"view_id": "main-examEdit"
	},
	{
			"view_authority_id": "gjfnm-0gawb",
			"view_authority_text": "试卷详情",
			"view_id": "main-examDetail"
	},
	{
			"view_authority_id": "tkf3zb-nbgx8",
			"view_authority_text": "阅卷",
			"view_id": "main-examinationPapers"
	},
	{
			"view_authority_id": "sspzw-6pwguo",
			"view_authority_text": "批卷班级",
			"view_id": "main-examPaperClassList"
	},
	{
			"view_authority_id": "qlhzjb-gcr08d",
			"view_authority_text": "待批试卷",
			"view_id": "main-examPaperClassmate"
	}
];