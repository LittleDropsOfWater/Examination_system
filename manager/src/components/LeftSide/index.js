import styles from "./style.scss";
import { Menu, Icon } from "antd";
import { Link } from "dva/router";
import { injectIntl } from "react-intl";

const { SubMenu } = Menu;
function LeftSide(props) {
  const {
    data,
    intl: { formatMessage }
  } = props;

  return (
    <div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        className={styles.menu}
      >
        {data.map(({ id, title, icon, list, path }) => (
          <SubMenu
            key={id}
            title={
              <span>
                <Icon type={icon} />
                <span>{formatMessage({ id: `router.${path}` })}</span>
              </span>
            }
          >
            {list.map((sitem, index) => (
              <Menu.Item key={`${path}-${sitem.path}`}>
                <Link to={`/${path}/${sitem.path}`}>
                  {formatMessage({ id: `router.${path}.${sitem.path}` })}
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
      path: "questions",
      list: [
        {
          title: "添加试题",
          path: "add"
        },
        {
          title: "试题分类",
          path: "type"
        },
        {
          title: "查看试题",
          path: "view"
        }
      ]
    },
    {
      id: "sub2",
      title: "用户管理",
      icon: "user",
      path: "user",
      list: [
        {
          title: "添加用户",
          path: "addUser"
        },
        {
          title: "用户展示",
          path: "show"
        }
      ]
    },
    {
      id: "sub3",
      title: "考试管理",
      icon: "schedule",
      path: "exam",
      list: [
        {
          title: "添加考试",
          path: "add"
        },
        {
          title: "试卷列表",
          path: "list"
        }
      ]
    },
    {
      id: "sub4",
      title: "班级管理",
      icon: "project",
      path: "class",
      list: [
        {
          title: "班级管理",
          path: "grade"
        },
        {
          title: "教室管理",
          path: "room"
        },
        {
          title: "学生管理",
          path: "student"
        }
      ]
    },
    {
      id: "sub5",
      title: "阅卷管理",
      icon: "project",
      path: "mark",
      list: [
        {
          title: "待批班级",
          path: "classlist"
        }
      ]
    }
  ]
};
export default injectIntl(LeftSide);
