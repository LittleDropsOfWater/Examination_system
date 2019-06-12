import React from "react"
import { Menu, Icon} from 'antd';
import { Link } from 'dva/router';
function MenuView(props){
    const { list} = props
    return <Menu
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['questions']}
    mode="inline"
    theme="dark"
    inlineCollapsed={props.collapsed}
>
    {
        list.map(item => ( 
            <Menu.SubMenu
                key={item.id}
                title={
                    <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </span>
                }
            >
                {
                    item.data.map((file) => (
                        <Menu.Item key={`${item.title}-${file.title}`}>
                            <Link to={`/${item.id}/${file.to}`}>{file.title}</Link>
                        </Menu.Item>
                    ))
                }
            </Menu.SubMenu>
        ))
    }
</Menu>
}
MenuView.defaultProps = {
    list: [
        {
            "title": "试题管理",
            "icon": "gitlab",
            "id": "questions",
            "data": [
                {
                    "title": "添加试题",
                    "to":"add"
                }, {
                    "title": "试题分类",
                    "to":"type"

                }, {
                    "title": "查看试题",
                    "to":"view"

                }
            ]
        }]
        // {
        //     "title": "用户管理",
        //     "icon": "user",
        //     "id": "users",
        //     "data": [
        //         {
        //             "title": "添加用户",
        //             "to":"addUser"

        //         }, {
        //             "title": "用户展示",
        //             "to":"show"

        //         }
        //     ]
        // }, {
        //     "title": "考试管理",
        //     "icon": "file-done",
        //     "id": "exam",
        //     "data": [
        //         {
        //             "title": "添加考试",
        //             "to":"addExam"

        //         }, {
        //             "title": "试卷列表",
        //             "to":"examList"

        //         }
        //     ]
        // }, {
        //     "title": "班级管理",
        //     "icon": "project",
        //     "id": "class",
        //     "data": [
        //         {
        //             "title": "班级管理",
        //             "to":"classManage"

        //         }, {
        //             "title": "教室管理",
        //             "to":"roomManage"

        //         }, {
        //             "title": "学生管理",
        //             "to":"studentManage"
        //         }
        //     ]
        // }, {
        //     "title": "阅卷管理",
        //     "icon": "project",
        //     "id": "papers",
        //     "data": [
        //         {
        //             "title": "特批管理",
        //             "to":"give"
        //         }
        //     ]
        // }
    
}
export default MenuView