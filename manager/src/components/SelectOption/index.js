import React from 'react';
import { Select } from "antd";
const { Option } = Select;
// class SelectOption extends Component {

// 	render() {
// 		const {list}=this.props;
// 		console.log(this.props)
// 		return (
// 				<Select style={{ width: 200 }} {...this.props} >
// 			{list&&list.map(item => {
// 		const [id, text] = Object.values(item);
// 		return(
// 			<Option value={id} key={id}>
// 				{text}
// 			</Option>
// 			) 
// 	})}
// 		</Select>
// 		);
// 	}
// }
function SelectOption(props,ref){
	return (
		<Select style={{ width: 200 }} {...props}  ref={ref}>
		{props.list&&props.list.map(item => {
	const [id, text] = Object.values(item);
	return(
		<Option value={id} key={id}>
			{text}
		</Option>
		) 
})}
	</Select>
	)
}
export default React.forwardRef(SelectOption);

