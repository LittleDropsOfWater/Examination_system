import { useEffect } from "react"
import { connect } from "dva"
import { Layout ,Tag} from 'antd';
import Title from "@/components/Title"
import styles from "./index.scss"
import ReactMarkdown from 'react-markdown'
const { Content } = Layout;
function Detail(props) {
    const {getDetailQuestion} =props
    useEffect(() => {
        getDetailQuestion({  
            questions_id: props.match.params.id
        })
    },[])
    return (
        <Layout>
            <Title>试题详情</Title>
            <Content style={{ display: "flex" }}>
                <Content className={styles.content}>
          <span>出题人：{props.user_name}</span>
          <h4>题目信息</h4>
          <h4>
            <Tag color="blue">{props.questions_type_text}</Tag>
            <Tag color="geekblue">{props.subject_text}</Tag>
            <Tag color="gold">{props.exam_name}</Tag>
          </h4>
          <h4>{props.title}</h4>
            <ReactMarkdown className={styles['react-markdown']} source={props.questions_stem} />
                </Content>
                <Content className={styles.content}>
                <ReactMarkdown className={styles['react-markdown']} source={props.questions_answer} />
                </Content>
            </Content>
        </Layout>)
}
const MapState = state => {
    return {
        ...state.question.EditQuestion[0]
    }
}
const MapDispatch = dispatch => ({
    getDetailQuestion(payload){
        dispatch({
            type:"question/EditQuestion",
            payload
        })
    }
})
export default connect(MapState, MapDispatch)(Detail)