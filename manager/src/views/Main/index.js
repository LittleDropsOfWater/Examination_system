import { useEffect } from "react";
import { connect } from "dva";
import styles from "./style.scss";
import { Avatar, Layout } from "antd";
import { Route, Switch,Redirect } from "dva/router";
import LeftSide from "@/components/LeftSide";
import HeaderRight from "@/components/HeaderRight";
import Add from "./Questions/Add";
import Type from "./Questions/Type";
import View from "./Questions/View";
const { Header, Content, Sider } = Layout;

function HomePage(props) {
  const { img, nickname } = props;
  useEffect(() => {
    props.userInfo();
  }, []);
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
      <Layout className={styles.main} >
        <Sider className={styles.leftside}>
          <LeftSide />
        </Sider>
        <Content className={styles.content} style={{padding:'0px 24px 24px'}}>
            <Switch>
              <Redirect exact from='/' to="/questions/add" />
              <Route path="/questions/add" component={Add} />
              <Route path="/questions/type" component={Type} />
              <Route path="/questions/view" component={View} />
            </Switch>
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
const mapState = state => state;
const mapDispatch = dispatch => ({
  userInfo() {
    dispatch({ type: "user/userInfo" });
  }
});
export default connect(
  mapState,
  mapDispatch
)(HomePage);
