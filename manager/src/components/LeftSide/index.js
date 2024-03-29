
import styles from "./style.scss";
import { Menu, Icon } from "antd";
import {  Link} from "dva/router";
const { SubMenu } = Menu;
function LeftSide(props) {
  const { data } = props;
  return (
    <div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        className={styles.menu}
      >
        {data.map(({ id, title, icon, list ,path}) => (
          <SubMenu
            key={id}
            title={
              <span>
                <Icon type={icon} />
                <span>{title}</span>
              </span>
            }
          >
            {list.map((sitem, index) => (
              <Menu.Item key={`${title}-${sitem.title}`}>
                <Link to={`/${path}/${sitem.path}`}>
                {sitem.title}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </div>
  );
}

LeftSide.defaultProps = {
  data: [
    {
      id: "sub1",
      title: "试题管理",
      icon: "mail",
      path:'questions',
      list: [
        {
          title: "添加试题",
          path:'add'
        },
        {
          title: "试题分类",
          path:'type'
        },
        {
          title: "查看试题",
          path:'view'
        }
      ]
    },
    {
      id: "sub2",
      title: "用户管理",
      icon: "user",
      path:"user",
      list: [
        {
          title: "添加用户",
          path:"addUser"
        },
        {
          title: "用户展示",
          path:"userShow"
        }
      ]
    },
    {
      id: "sub3",
      title: "考试管理",
      icon: "schedule",
      list: [
        {
          title: "添加考试"
        },
        {
          title: "试卷列表"
        }
      ]
    },
    {
      id: "sub4",
      title: "班级管理",
      icon: "project",
      list: [
        {
          title: "班级管理"
        },
        {
          title: "教室管理"
        },
        {
          title: "学生管理"
        }
      ]
    },
    {
      id: "sub5",
      title: "阅卷管理",
      icon: "project",
      list: [
        {
          title: "待批班级"
        }
      ]
    }
  ]
};
export default LeftSide;