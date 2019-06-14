import { useEffect } from "react"
import { Layout, Breadcrumb, Radio } from 'antd';
import style from "./index.css"
const { Content } = Layout
function AddUser(props) {

    useEffect(() => {

    }, [])
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>添加用户</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className={style.content}
                style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 500,
                }}
            >
                <div className={style.wrap}>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">添加用户</Radio.Button>
                        <Radio.Button value="b">更新用户</Radio.Button>
                    </Radio.Group>
                </div>
                <div className={style.wrap}>
                    2
          </div>
                <div className={style.wrap}>
                    3
          </div>
                <div className={style.wrap}>
                    1
          </div>
                <div className={style.wrap}>
                    2
          </div>
                <div className={style.wrap}>
                    3
          </div>
            </Content>
        </Layout>
    )
}


export default AddUser