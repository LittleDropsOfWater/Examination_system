import React, { useEffect } from "react";
import { connect } from "dva";
import { Layout} from "antd";
import Title from "@/components/Title";
import styles from './index.scss';
import ReactMarkdown from "react-markdown";
const { Content } = Layout;
function ExamDetail(props){
	const {getTheExam,
		match:{params:{id}},
		theExam
	}=props;
	useEffect(()=>{
		getTheExam(id);
	},[]);
	return (
		<Layout>
			<Title>试卷详情</Title>
			<Content className={`content ${styles.exam}`} >
				<h3>{theExam.title}</h3>
				{theExam.questions&&theExam.questions.map((item,index)=>(
					<div className={styles.questionsItem} key={index}>
						<h4>{index+1}:  {item.title}</h4>
					<ReactMarkdown key={index}  source={item.questions_stem} className={styles.reactMarkdown} />
					</div>
				))}
			</Content>
		</Layout>
	)
}
const mapState = state => {	
	return {theExam:state.exam.theExam};
};
const mapDispatch = dispatch => ({
  getTheExam(payload) {
    dispatch({
      type: "exam/getTheExam",
      payload
    });
  }
});
export default connect(mapState,mapDispatch)(ExamDetail);