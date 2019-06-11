import React from 'react';
import { connect } from 'dva';
import style from "./index.css"
import { Menu, Icon, Dropdown } from 'antd';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    "title": "试题管理",
                    "icon": "gitlab",
                    "id": 1,
                    "data": [
                        {
                            "title": "添加试题",
                        }, {
                            "title": "试题分类",
                            
                        }, {
                            "title": "查看试题",
                            
                        }
                    ]
                },
                {
                    "title": "用户管理",
                    "icon": "user",
                    "id": 2,
                    "data": [
                        {
                            "title": "添加用户",
                          
                        }, {
                            "title": "用户展示",
                           
                        }
                    ]
                }, {
                    "title": "考试管理",
                    "icon": "file-done",
                    "id": 3,
                    "data": [
                        {
                            "title": "添加考试",
                            
                        }, {
                            "title": "试卷列表",
                            
                        }
                    ]
                }, {
                    "title": "班级管理",
                    "icon": "project",
                    "id": 4,
                    "data": [
                        {
                            "title": "班级管理",
                            
                        }, {
                            "title": "教室管理",
                            
                        }, {
                            "title": "学生管理",
                           
                        }
                    ]
                }, {
                    "title": "阅卷管理",
                    "icon": "project",
                    "id": 5,
                    "data": [
                        {
                           
                            "title": "特批管理"
                        }
                    ]
                }
            ],
            titList: [
                {
                    tit: "个人中心",
                    id: 1
                }, {
                    tit: "我的班级",
                    id: 2
                }, {
                    tit: "设置",
                    id: 3
                }, {
                    tit: "退出登录",
                    id: 4
                },
            ]
        };

    }

    render() {
        const { list, titList } = this.state
        const menu = (
            <Menu>
                {
                    titList.map(item => (
                        <Menu.Item key={item.id}>
                            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                                {item.tit}
                            </a>
                        </Menu.Item>
                    ))
                }
            </Menu>)
        return (
            <div className={style.wrap}>
                <div className={style.nav}>
                    <h4>
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt="" />
                    </h4>
                    <div>
                    <Dropdown overlay={menu}>
                        <h5>
                            <span>
                                <img src="https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png" alt="" /> chenmanjie
                        </span>
                        </h5>
                        </Dropdown>
                    </div>  
                </div>
                <main className={style.main}>
                    <div className={style.left}>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.collapsed}
                        >
                            {
                                list.map((item,ind) => (
                                    <Menu.SubMenu
                                        key={ind}
                                        title={
                                            <span>
                                                <Icon type={item.icon} />
                                                <span>{item.title}</span>
                                            </span>
                                        }
                                    >
                                        {
                                            item.data.map((file,index) => (
                                                <Menu.Item key={index}>{file.title}</Menu.Item>
                                            ))
                                        }
                                    </Menu.SubMenu>
                                ))
                            }
                        </Menu>
                    </div>
                    <div className={style.right}>
                        <div className={style.content}>
                            {/* <h4></h4> */}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
export default connect()(Home);