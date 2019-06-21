import React from 'react';
import { Select } from "antd";
const { Option } = Select;
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

