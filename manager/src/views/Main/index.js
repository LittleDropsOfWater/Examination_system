import { useEffect, useState } from "react";
import { connect } from "dva";
import styles from "./style.scss";
import { Avatar, Layout, Spin } from "antd";
import { Route, Switch, Redirect } from "dva/router";
import LeftSide from "@/components/LeftSide";
import HeaderRight from "@/components/HeaderRight";
import Message from "@/components/Message";
import NotFound from "./NotFound";
import Forbidden from "./Forbidden";
import UDFile from '@/components/UploadButton'
const { Header, Content, Sider } = Layout;
function HomePage(props) {
  const { img, loading, myView, forbiddenView } = props;
  console.log(props);
  const [nickname, updateName] = useState("猫猫");
  useEffect(() => {
    updateName(props.userInfo.user_name);
  }, [props.userInfo]);
  return (
    <Layout className={styles.wrap}>
      <Header className={styles.header}>
        <div>
          <img src="logo.jpg" className={styles.logo} alt="logo" />
        </div>
        <HeaderRight>
          <>
            <Avatar src={img} style={{ marginRight: "10px" }} />
            {nickname}
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
              <Route path='/upload' component={UDFile}/>
              <Redirect exact from="/" to="/questions/add" />
              {/* 访问无权限的路由时跳往403路由 */}
              {forbiddenView.map(item => {
                return <Redirect key={item} from={item} to="/403" />;
              })}
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
  img:
    "https://cdn.nlark.com/yuque/0/2019/png/anonymous/1547609339813-e4e49227-157c-452d-be7e-408ca8654ffe.png?x-oss-process=image/resize,m_fill,w_48,h_48/format,png",
  nickname: "chenmanjie"
};
const mapState = state => {
  return {
    loading: state.loading.global,
    ...state.user
  };
};
const mapDispatch = dispatch => ({

});
export default connect(
  mapState,
  mapDispatch
)(HomePage);
