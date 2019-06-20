import styles from "./style.scss";
import { Menu, Icon } from "antd";
import { Link } from "dva/router";
import { injectIntl } from "react-intl";
import { connect } from "dva";

const { SubMenu } = Menu;
function LeftSide(props) {
  const {
    myView,
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
        {myView &&
          myView.map(
            ({ id, title, icon, children, path, disable }) =>
              disable || (
                <SubMenu
                  key={id}
                  title={
                    <span>
                      <Icon type={icon || "mail"} />
                      <span>{formatMessage({ id: title })}</span>
                    </span>
                  }
                >
                  {children &&
                    children.map(
                      (sitem, index) =>
                        sitem.disable || (
                          <Menu.Item key={sitem.path}>
                            <Link to={sitem.path}>
                              {formatMessage({ id: sitem.title })}
                            </Link>
                          </Menu.Item>
                        )
                    )}
                </SubMenu>
              )
          )}
      </Menu>
    </div>
  );
}

const mapState = state => ({ myView: state.user.myView });
export default injectIntl(connect(mapState)(LeftSide));
