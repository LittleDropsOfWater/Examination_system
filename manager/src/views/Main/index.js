import { useEffect, useState } from "react";
import { connect } from "dva";
import styles from "./style.scss";
import { Avatar, Layout, Spin } from "antd";
import { Route, Switch, Redirect } from "dva/router";
import LeftSide from "@/components/LeftSide";
import HeaderRight from "@/components/HeaderRight";
import Message from "@/components/Message";
import QuestionsAdd from "./Questions/Add";
import Type from "./Questions/Type";
import View from "./Questions/View";
import AddUser from "./ShowUser/AddUser";
import Show from "./ShowUser/Show";
import Detail from "./Questions/Detail";
import Edit from "./Questions/Edit";
import ExamAdd from "./Exam/Add";
import ExamList from "./Exam/List";
import ExamEdit from "./Exam/Edit";
import ExamDetail from "./Exam/Detail";
import Grade from "./Class/Grade";
import Room from "./Class/Room";
import Student from "./Class/Student";
import MarkClassList from "./Mark/ClassList";
import MarkClassMate from "./Mark/ClassMate";
import PaperDetail from "./Mark/PaperDetail";
import NotFound from "./NotFound";
import Forbidden from "./Forbidden";
import { getUserData } from "@/utils/user";
const { Header, Content, Sider } = Layout;
function HomePage(props) {
  const { img, loading, myView, forbiddenView } = props;
  console.log(props);
  const [nickname, updateName] = useState("猫猫");
  useEffect(() => {
    props.userInfo();
  }, []);
  useEffect(() => {
    updateName(getUserData().user_name);
  }, props);
  console.log("myView...", myView);
  console.log("forbiddenView...", forbiddenView);
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
              <Redirect exact from="/" to="/questions/add" />
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
              {/* 访问无权限的路由时跳往403路由 */}
              {props.forbiddenView.map(item => {
                return <Redirect key={item} from={item} to="/403" />;
              })}
              {/* 403路由 */}
              <Route path="/403" component={Forbidden} />
              {/* 404路由 */}
              <Route component={NotFound} />
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
    myView: state.user.myView,
    forbiddenView: state.user.forbiddenView
  };
};
const mapDispatch = dispatch => ({
  userInfo() {
    dispatch({ type: "user/userInfo" });
  }
});
export default connect(
  mapState,
  mapDispatch
)(HomePage);
