import { useEffect } from "react"
import { connect } from "dva"
import { Layout, Form, Input, Button, Modal, message } from "antd";
import Editor from "for-editor";
import Title from '@/components/Title';
import styles from "../Add/index.scss";
import SelectOption from "@/components/SelectOption";
const { Content } = Layout;
const { confirm } = Modal;
const { success, error } = message;
function Edit(props) {
    const {
        form,
        examType,
        questions_type,
        subjectType,
        getEditQuestion,
        updateQuestions,
        EditQuestion,
        editCode
    } = props;
    console.log(props)
    const { getFieldDecorator } = form;
    let edit_questions_id = props.location.search.split("=")[1];
    useEffect(() => {
        getEditQuestion({
            questions_id: edit_questions_id
        })
    }, [])
    useEffect(() => {
        if (editCode === -1) return
        if (editCode) {
            success("更新成功")
            props.history.replace("/questions/view")
        } else {
            error("更新失败")
        }
    }, [editCode])

    //确认框
    function showConfirm(e) {
        // e.preventDefault();
        confirm({
            title: "你要修改吗?",
            content: "您只能修改自己的试题",
            okText: "确定",
            cancelText: "取消",
            onOk() {
                console.log("OK", e);
                form.validateFields((err, values) => {
                    if (!err) {
                        //调添加试题接口
                        // console.log({ ...values, user_id: JSON.parse(getUserData()).user_id });
                        updateQuestions({ ...values, questions_id: edit_questions_id });
                    }
                })
            },
            onCancel() {

            }
        });
    }
    return (
        <Layout>
            <Title>编辑试题</Title>
            <Content key={props.questions_id} className={styles.content}>
                <h3>题目信息</h3>
                <Form layout="vertical">
                    <Form.Item label="题干">
                        {getFieldDecorator("title", { "initialValue": EditQuestion && EditQuestion.title })(
                            <Input
                                className={styles.titleInput}
                                size="large"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="题目主体">
                        {getFieldDecorator("questions_stem", {
                            "initialValue": EditQuestion && EditQuestion.questions_answer
                        })(
                            <Editor height="auto" />
                        )}
                    </Form.Item>
                    <Form.Item label="请选择考试类型:">
                        {
                            getFieldDecorator("exam_id", {
                                initialValue: EditQuestion && EditQuestion.exam_id
                            })(<SelectOption list={examType} />)
                        }
                    </Form.Item>
                    <Form.Item label="请选择课程类型:">
                        {getFieldDecorator("subject_id", {
                            initialValue: EditQuestion && EditQuestion.subject_id
                        })(<SelectOption list={subjectType} />)}
                    </Form.Item>
                    <Form.Item label="请选择题目类型:">
                        {getFieldDecorator("questions_type_id", {
                            initialValue: EditQuestion && EditQuestion.questions_type_id
                        })(<SelectOption list={questions_type} />)}
                    </Form.Item>

                    <Form.Item label="答案信息">
                        {getFieldDecorator("questions_answer", { "initialValue": EditQuestion && EditQuestion.questions_answer })(
                            <Editor height="auto" />
                        )}
                    </Form.Item>
                    <Button onClick={showConfirm} type="primary" size="large">
                        提交
                    </Button>
                </Form>
            </Content>
        </Layout>
    )
}
const MapState = state => {
    return {
        ...state.question,
        editCode: state.question.editCode,
        EditQuestion: state.question.EditQuestion[0]

    }
}
const MapDispatch = dispatch => ({
    getEditQuestion(payload) {
        dispatch({
            type: "question/EditQuestion",
            payload
        })
    },
    updateQuestions(payload) {
        dispatch({
            type: "question/updateQuestion",
            payload
        })
    }
})
export default connect(MapState, MapDispatch)(Form.create()(Edit))