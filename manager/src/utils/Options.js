import {Select} from './node_modules/antd';
const { Option } = Select;

 export default function Options(data=[],value,text){
  if(!(Array.isArray(data))&&value&&text){return null;}
  return ( data.map(item => (
    <Option key={item[value]} value={item[value]}>{item[text]}</Option>
  )))
}