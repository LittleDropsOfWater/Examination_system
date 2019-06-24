import { connect } from "dva";
import styles from "./style.scss";
import { Avatar, Layout, Spin } from "antd";
import { Route, Switch, Redirect } from "dva/router";
import LeftSide from "@/components/LeftSide";
import HeaderRight from "@/components/HeaderRight";
import Message from "@/components/Message";
import NotFound from "./NotFound";
import Forbidden from "./Forbidden";
import PersonalCenter from "./PersonalCenter";
const { Header, Content, Sider } = Layout;
function HomePage(props) {
  const { avatar, user_name, loading, myView, forbiddenView } = props;
  console.log('========================');
  console.log(myView);
  console.log(forbiddenView)
  console.log('========================');
  return (
    <Layout className={styles.wrap}>
      <Header className={styles.header}>
        <div>
          <img src="logo.jpg" className={styles.logo} alt="logo" />
        </div>
        <HeaderRight>
          <>
            <Avatar src={avatar} style={{ marginRight: "10px" }} />
            {user_name}
          </>
        </HeaderRight>
      </Header>
      <Layout className={styles.main}>
        <Sider className={styles.leftside} width={230}>
          <LeftSide />
        </Sider>
        <Content className={styles.content} style={{ overflow: "hidden" }}>
          <Content className={styles.scroll}>
            <Switch>

              <Redirect exact from="/" to="/questions/add" />

              {/* 访问无权限的路由时跳往403路由 */}
              {forbiddenView.map(item => (
                <Redirect key={item} from={item} to="/403" />
              ))}

              {/* 渲染该用户拥有的路由 */}
              {myView.map(
                item =>
                  item.children &&
                  item.children.map(val => (
                    <Route
                      key={val.id}
                      path={val.path}
                      component={val.component}
                    />
                  ))
              )}
              {/* 个人中心 */}
              <Route path="/account" component={PersonalCenter} />

              {/* 403路由 */}
              <Route path="/403" component={Forbidden} />

              {/* 404路由 */}
              <Route path="" component={NotFound} />

            </Switch>
          </Content>
          {/* loading效果 */}
          {loading ? (
            <div className={styles.loading}>
              <Spin size="large" />
            </div>
          ) : null}
          {/*  全局提示*/}
          <Message />
        </Content>
      </Layout>
    </Layout>
  );
}
HomePage.defaultProps = {
  avatar:
    "https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png",
  user_name: "chenmanjie"
};
const mapState = state => {
  return {
    loading: state.loading.global,
    ...state.user,
    avatar: state.user.userInfo.avatar,
    user_name: state.user.userInfo.user_name
  };
};
const mapDispatch = dispatch => ({});
export default connect(
  mapState,
  mapDispatch
)(HomePage);
