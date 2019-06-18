import React, { useEffect } from "react";
// import styles from "./index.scss";
import { connect } from "dva";
import { Link } from "dva/router";
import {
  Layout,
  Table,
} from "antd";
import Title from "@/components/Title";
const { Content } = Layout;

const columns = [
  {
		title:'班级名',
    dataIndex: 'grade_name',
	},
	{
		title:'课程名称',
	dataIndex:'subject_text',
	},{
		title:'教室名称', 
		dataIndex:'room_text',
	},
  {
		title:'操作',
    key: 'action',
    render: (text, record) => (
        <Link to={{ pathname: `/mark/classmate/${text.grade_id}` }}>批卷</Link>
    ),
  },
];
function ClassList(props) {
  const {
		grade,
		getGrade,
  } = props;
 
  useEffect(getGrade, []);
 
  
  
  return (
    <Layout>
      <Title>待批班级</Title>
			<Content className="content">
				<Table rowKey={"grade_id"}  columns={columns} dataSource={grade} />
			</Content>
    </Layout>
  );
}
const mapState = state => ({ ...state.exam,...state.question,grade:state.class.grade });
const mapDispatch = dispatch => ({
  getGrade() {
		dispatch({
			type:'class/grade'
		})
  }
});
export default connect(
  mapState,
  mapDispatch
)(ClassList);
