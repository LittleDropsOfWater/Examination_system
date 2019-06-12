import { } from 'react';
import { connect } from 'dva';
import { Route, Switch } from 'dva/router';
import style from "./index.css"
import { Menu, Dropdown } from 'antd';
import MenuViews from "../../components/menuViews"
import Add from "./add"
import ClassIfy from "./type"
import Look from "./view"
function Home(props) {

    const { titList } = props
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
                    <MenuViews />
                </div>
                <div className={style.right}>
                    <div className={style.content}>
                        <Switch>
                            <Route path="/questions/add" component={Add} />
                            <Route path="/questions/type" component={ClassIfy} />
                            <Route path="/questions/view" component={Look} />
                        </Switch>
                    </div>
                </div>
            </main>
        </div>
    );
}

Home.defaultProps = {
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
}

export default connect()(Home);