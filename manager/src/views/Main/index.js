import { useEffect, useState } from "react";
import { connect } from "dva";
import styles from "./style.scss";
import { Avatar, Layout, Spin } from "antd";
import { Route, Switch, Redirect } from "dva/router";
import LeftSide from "@/components/LeftSide";
import HeaderRight from "@/components/HeaderRight";
import QuestionsAdd from "./Questions/Add";
import Type from "./Questions/Type";
import View from "./Questions/View";
import AddUser from "./ShowUser/AddUser";
import Show from "./ShowUser/Show";
import Detail from "./Questions/Detail";
import Edit from "./Questions/Edit";
import ExamAdd from "./Exam/Add";
import ExamList from "./Exam/List";
import { getUserData } from "@/utils/user";
import ExamEdit from "./Exam/Edit";
import ExamDetail from "./Exam/Detail";
import Grade from "./Class/Grade";
import Room from "./Class/Room";
import Student from "./Class/Student";
import MarkClassList from "./Mark/ClassList";
import MarkClassMate from "./Mark/ClassMate";
import PaperDetail from "./Mark/PaperDetail";
import Message from "@/components/Message";
const { Header, Content, Sider } = Layout;
function HomePage(props) {
  const { img, loading} = props;
  console.log(props)
  const [nickname, updateName] = useState("猫猫");
  useEffect(() => {
    props.userInfo();
  }, []);
  useEffect(() => {
    updateName(getUserData().user_name);
  }, props);
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
          <Content
            style={{
              padding: "0px 24px 24px",
              overflow: "scroll",
              height: "100%"
            }}
          >
            <Switch>
              <Route path="/exam/detail/:id" component={ExamDetail} />
              <Route path="/questions/add" component={QuestionsAdd} />
              <Route path="/questions/type" component={Type} />
              <Route path="/questions/view" component={View} />
              <Route path="/questions/detail/:id" component={Detail} />
              <Route path="/edit/questions/:id" component={Edit} />
              <Route path="/user/adduser" component={AddUser} />
              <Route path="/user/show" component={Show} />
              <Route path="/class/grade" component={Grade} />
              <Route path="/class/room" component={Room} />
              <Route path="/class/student" component={Student} />
              <Route path="/exam/add" component={ExamAdd} />
              <Route path="/exam/edit" component={ExamEdit} />
              <Route path="/exam/list" component={ExamList} />
              <Route path="/exam/detail/:id" component={ExamDetail} />
              <Route path="/mark/classlist" component={MarkClassList} />
              <Route path="/mark/classmate/:id" component={MarkClassMate} />
              <Route
                path="/mark/paper/detail/:exam_student_id"
                component={PaperDetail}
              />
              <Redirect exact from="/" to="/questions/add" />
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
